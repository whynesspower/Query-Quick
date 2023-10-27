import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/chatContext";
import { Box } from "@chakra-ui/layout";
import Chat from "../../components/CustomerChat/Chat";
import { raiseQuery } from "../../actions/chat";

const user = JSON.parse(localStorage.getItem("userInfo"));

const ChatBox = () => {
  const { selectedChat, setSelectedChat } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box w="100%" h="100vh" p="10px">
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="carbon-black"
        w={{ base: "100%", md: "100%" }}
        borderRadius="lg"
        borderWidth="1px"
        h={"100%"}
      >
        <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Box>
  );
};

export default ChatBox;
