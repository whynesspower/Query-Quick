import React from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/chatContext";
import ChatBox from "../CustomerChat/Chat";

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w="64%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chat;
