import "./Chatbot.css";

import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [otp, setOtp] = useState("");

  const sendMessage = async () => {
    if (!authenticated) {
      alert("Please authenticate with OTP first.");
      return;
    }

    try {
      const { data } = await axios.post("https://api.example.com/chatbot", {
        message,
      });
      setResponse(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const authenticate = async () => {
    try {
      const { data } = await axios.post(
        "https://api.example.com/authenticate",
        {
          phone: "+1234567890", // or email: "user@example.com"
        }
      );
      setOtp(data.otp);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post("https://api.example.com/verify-otp", {
        otp,
      });
      setAuthenticated(true);
      alert("Authentication successful!");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="chat-question">
      <h1 className="heading">Chatbot</h1>
      <div className="ask-form-container">
        <label htmlFor="message">Message:</label>
        <input
          id="message"
          type="text"
          value={message}
          className="chat_input"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="chat-btn">
          Send
        </button>

        {!authenticated && (
          <div>
          <div className="btn">
            <button onClick={authenticate} className="chat-btn">
              Authenticate with OTP
            </button></div>
            <br />
            <div className="otp">
            <label htmlFor="otp" className="chat_input2">Enter OTP:</label>
            <input
              id="otp"
              type="text"
              value={otp}
              className="chat_input"
              onChange={(e) => setOtp(e.target.value)}
            /></div>
            <div className="btn">
            <button onClick={verifyOtp} className="chat-btn2">
              Verify OTP
            </button></div>
          </div>
        )}

        {response && <p>Response: {response}</p>}
      </div>
    </div>
  );
}

export default Chatbot;
