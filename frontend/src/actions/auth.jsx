const api = 'http://localhost:8080/api'


export const signupUser = async (userId,isAgent) => {
    try {
        const response = await fetch(`${api}/user/registeruser`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId, isAgent : isAgent })
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export const loginCustomer = async (userId) => {
    try {
        const response = await fetch(`${api}/user/logincustomer`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: userId })
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err)
    }
}
export const loginAgent = async (userId) => {
    try {
        const response = await fetch(`${api}/user/loginagent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ agentId: userId })
        })
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err)
    }
}