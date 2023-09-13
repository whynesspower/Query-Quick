import React, { useState } from 'react'
import SignInCustomer from '../../components/Registration/Signin'
import { ChatState } from '../../context/chatContext';
import { loginCustomer } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {


    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const { setUser } = ChatState();


    const handleLogin = async () => {
        const response = await loginCustomer(userId);
        console.log(response);
        if (response?.user) {
            setUser(response.user);
            localStorage.setItem("userInfo", JSON.stringify(response.user));
            navigate('/raisequery');
        }
        if (response.success == true && response?.message) {
            setError(response?.message);
        }
    }

    return (
        <SignInCustomer url="/customersignup" userId={userId} setUserId={setUserId} error={error} setError={setError} handleLogin={handleLogin} />
    )
}

export default SignIn