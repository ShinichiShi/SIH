import './chat.css';
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  // State for the input text and messages
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  // Refs for the container and the last message
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle the click event to add a new message
  const handleClick = () => {
    if (text.trim()) {
      setMessages([...messages, text]);
      setText('');
    }
  };

  // Handle the change event for the textarea
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='chatui' id="chatmain">
      <nav>
        <header>
          <h1>Person chatting with</h1>
        </header>
      </nav>
      <main className='chats-display'>
        {messages.map((msg, index) => (
          <div key={index} className="container">
            <span>{msg}</span>
          </div>
        ))}
        {/* Empty div to scroll to */}
        <div ref={messagesEndRef} />
      </main>
      <footer className='chatbar'>
        <textarea
          name="negotiate"
          id="chat"
          placeholder='Enter text'
          value={text}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Send</button>
      </footer>
    </div>
  );
}
