import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../utils/Logic";
import ScrollChat from "./ScrollChat";
import { ChatState } from "../../context/chatContext";
import { getMessages, sendMessages, getChatList } from "../../actions/chat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080";
var socket, selectedChatCompare;

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    setChats,
    setNotification,
    notification,
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const fetchMessages = async () => {
    try {
      if (!selectedChat) return;
      setLoading(true);
      const response = await getMessages(selectedChat?._id);
      setMessages(response);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      setFetchAgain(!fetchAgain);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived?.chat?._id)) {
          setNotification([newMessageReceived?.chat?._id, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const response = await sendMessages(
          newMessage,
          selectedChat?._id,
          user?._id
        );
        socket.emit("new message", response);
        setMessages([...messages, response]);
        const res = await getChatList();
        setChats(res);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        d="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        {selectedChat?.chatId?.toUpperCase()}
      </Text>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="scroll"
      >
        {loading ? (
          <Spinner size="lg" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <div className="">
            {messages.length > 0 ? (
              <ScrollChat messages={messages} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                Tap on chatlist to answer queries!
              </Box>
            )}
          </div>
        )}

        {
          <FormControl
            onKeyDown={sendMessage}
            id="first-name"
            isRequired
            mt={3}
          >
            <Input
              variant="filled"
              bg="carbon-black"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={typingHandler}
            />
          </FormControl>
        }
      </Box>
    </>
  );
};

export default Chat;
