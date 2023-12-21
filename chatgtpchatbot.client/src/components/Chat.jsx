import React, { useState } from 'react';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]); // State to hold messages
    const [inputValue, setInputValue] = useState(''); // State to hold input value

    // Function to handle sending a message
    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                text: inputValue,
                sender: 'user', // You can set the sender here (e.g., 'user' or 'bot')
            };
            setMessages([...messages, newMessage]);
            setInputValue(''); // Clear input after sending message
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
