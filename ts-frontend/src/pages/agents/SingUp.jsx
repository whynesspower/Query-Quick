import React, { useState } from 'react'
import SignUp from '../../components/Registration/Signup'
import { signupUser } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const SignupAgent = () => {

    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await signupUser(userId, true)
            if (response.success) {
                navigate('/loginagent')
            }
            else {
                setError(response.message)
            }
        }
        catch {

        }
    }

    return (
        <SignUp user={userId} setUserId={setUserId} error={error} handleSubmit={handleSubmit} />
    )
}

export default SignupAgent