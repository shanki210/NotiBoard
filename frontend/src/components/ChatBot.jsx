import React, { useState } from 'react';
import axios from 'axios';
import { Card } from './ui/card';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  const handleMessageChange = (e) => setMessage(e.target.value);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Send message to OpenAI API
    try {
        console.log(message)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...chatHistory.map((entry) => ({
              role: entry.sender === 'user' ? 'user' : 'assistant',
              content: entry.text,
            })),
            { role: 'user', content: message }
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message.content;

      // Add bot response to chat history
      setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: reply }]);
      setMessage('');
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
    }
  };

  return (
    <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
      <div>
        {chatHistory.map((entry, index) => (
          <div key={index} className={`message ${entry.sender}`}>
            <div className="message-text">{entry.text}</div>
          </div>
        ))}
      </div>
      <div className="input-container flex">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </Card>
  );
};

export default ChatBot;
