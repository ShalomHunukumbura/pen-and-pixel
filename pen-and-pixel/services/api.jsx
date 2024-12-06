import axios from 'axios' //axios is a library used for making HTTTP requests to communicate with a backend api

{/*creating an axios instance */}
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ||  "http://localhost:3000/api",
})

{/*function to handle user signup */}
export const signup = async (userData) => {
    try {
        //we send a post request to the "users/signup" endpoint with user data like username,email, and pass
        const response = await api.post("/users/signup",userData)
        console.log(response.data);
        
        return response.data
    } catch (error){
        console.log(`This is the errpr: ${error}`);
        
        throw error.response.data
    }
}

{/*function to handle user signin */}
export const signin = async (userData) => {
    try{
        const response = await api.post("/users/signin",userData)
        return response.data
    } catch(error){
        throw error.response.data
    }
}

export default api