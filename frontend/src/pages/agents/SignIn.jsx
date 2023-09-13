import React, { useState } from 'react'
import SignInAgent from '../../components/Registration/Signin'
import { ChatState } from '../../context/chatContext';
import { loginAgent } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {


    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const { setUser} = ChatState();


    const handleLogin = async () => {
        const response = await loginAgent(userId);
        console.log(response);
        if (response?.user) {
            setUser(response.user);
            localStorage.setItem("agentInfo", JSON.stringify(response.user));
            navigate('/agentchatbox');
        }
        if (response.success == true && response?.message) {
            setError(response?.message);
        }
    }

    return (
        <SignInAgent url={"/agentsignup"} userId={userId} setUserId={setUserId} error={error} setError={setError} handleLogin={handleLogin} />
    )
}

export default SignIn