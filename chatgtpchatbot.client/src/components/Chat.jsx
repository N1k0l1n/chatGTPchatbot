import { useEffect, useState } from 'react';
import '../styles/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        populateChatData();
    }, []);

    const sendMessage = async () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                text: inputValue,
                sender: 'user',
            };




            const response = await fetch('Chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ SearchText: inputValue }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const botMessage = {
                    text: responseData,
                    sender: 'bot',
                };


                setMessages([...messages, newMessage, botMessage]);
            } else {
                console.error('Failed to send message');
            }

            setInputValue('');
        }
    };

    const populateChatData = async () => {
        const response = await fetch('Chat');
        const data = await response.json();

        setMessages(data);
    };

    return (
        <div className="chat-container">
            {/* Display messages */}
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

            {/* Input for sending messages */}
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
