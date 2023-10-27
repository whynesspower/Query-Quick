import React, { useState } from 'react'
import { Box } from "@chakra-ui/layout";
import Chat from '../../components/AgentChat/ChatBox';
import ChatList from '../../components/AgentChat/ChatList';
import { ChatState } from '../../context/chatContext';

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="space-between" w="100%" h="95vh" p="10px">
                {user && <ChatList fetchAgain={fetchAgain} />}
                {user && (
                    <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;