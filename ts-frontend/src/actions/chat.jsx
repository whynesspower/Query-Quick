const api = 'http://localhost:8080/api'

export const raiseQuery = async (chatId, userId) => {
    try {
        const response = await fetch(`${api}/chat/raisequery`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatId: chatId, userId: userId })
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

export const getMessages = async (chatId) => {
    try {
        const response = await fetch(`${api}/message/getmessages/${chatId}`, {
            method: 'GET',
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

export const sendMessages = async (content, chatId, userId) => {
    try {
            const response = await fetch(`${api}/message/sendmessage`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chatId: chatId, userId: userId ,content : content })
            })
            const result = await response.json();
            return result;
        }
        catch (err) {
            console.log(err);
        }

}

export const getChatList = async () => {
    try {
        const response = await fetch(`${api}/chat/chatlist`, {
            method: 'GET',
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}


export const addAgentToList = async (chatId,userId) =>{
    try {
        const response = await fetch(`${api}/chat/addagent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatId: chatId, userId: userId })
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}