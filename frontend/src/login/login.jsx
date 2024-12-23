import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "./Navbar";


const Login= ()=> {
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate();
    const baseUrl='http://localhost:3000';
    const handleCreateAccount = ()=>{
        navigate('/');
    }
    const validateLogin = () => {
      if (!email || !password) {
          alert("Email and Password are required.");
          return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
      return true;
  };
    const handleLogin=async(e)=>{
      e.preventDefault();
      if(!validateLogin()) return ;
      const url=`${baseUrl}/login`;
      const options={
        method:"POST",
        body:JSON.stringify({emailOrUserName:email, password}),
        headers:{
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      };
      setIsLoading(true);
      try{
        // console.log('Login attempt with:', { email, password });
        const response=await fetch(url,options);
        const contentType=response.headers.get('content-type');

        if(contentType&&contentType.includes('application/json')){
          const result= await response.json();
          if(response.ok){
            localStorage.setItem('token',result.token);
            navigate('/home');
          }else{
            setErrorMessage(result.message || "Login failed. Please try again.");
          }
        }else {
          throw new Error("Unexpected response format.");
      }
      }catch (error) {
        console.error('Error during login:', error);
        setErrorMessage("An error occurred. Please try again.");
    }finally{
      setIsLoading(false);
    }
    };
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <LoginNavbar />
      <div className="flex items-center justify-center w-full flex-grow py-8">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
      );
      
}

export default Login;