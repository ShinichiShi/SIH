import './chat.css';
import io from 'socket.io-client';
import { useState, useRef, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../context/auth_context';

export default function Chat() {
  //current user context
  const { currentUser } = useContext(AuthContext);
  const [userType, setUserType] = useState('buyers'); //change depending upon the type of user(buyer or farmer)
  const [contacts, setContacts] = useState({});
  // console.log(currentUser);
  console.log(contacts);
  //testing values, to be removed later
  const roomID = 'room1';
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //establish new socket connection
    const newSocket = io.connect(`http://localhost:${SERVER_PORT}`);
    setSocket(newSocket);

    //monitor messages
    newSocket.on('recieve-message', (recieved_message) => {
      setMessages((prevMessages) => [...prevMessages, recieved_message]);
    });

    // get all contacts when u load the page
    getContacts(currentUser.uid, userType).then((result) => {
      setContacts(result);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

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
  const handleClick = async () => {
    //send message to server through websocket
    if (text.trim()) {
      
      if (socket) {
        socket.emit('send-message', { message: text });
      }

      //add message to database
      try {
        await addDoc(collection(db, 'chats', roomID, 'messages'), {
          message: text,
          timeStamp: new Date(),
          user: currentUser.uid,
        });
      } catch (error) {
        console.error('Error uploading message:', error);
      }

      setMessages([...messages, text]);
      setText('');
    }
  };

  // Handle the change event for the textarea
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="mainsec">
      <div className="sidebar">
        hi
      </div>
      <div className="chatui" id="chatmain">
        <nav>
          <header>
            <h1>Person chatting with</h1>
          </header>
        </nav>
        <main className="chats-display">
          {messages.map((msg, index) => (
            <div key={index} className="container">
              <span>{msg}</span>
            </div>
          ))}
          {/* Empty div to scroll to */}
          <div ref={messagesEndRef} />
        </main>
        <footer className="chatbar">
          <textarea
            name="negotiate"
            id="chat"
            placeholder="Enter text"
            value={text}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Send</button>
        </footer>
      </div>
    </div>
  );
}

const getContacts = async (userID, userType) => {
  try {
    const userDocRef = doc(db, userType, userID);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.Contacts;
      // const contacts = userData.contacts || [];

      // console.log("Contacts:", contacts);
      // return contacts;
    } else {
      console.log('No such user!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};
