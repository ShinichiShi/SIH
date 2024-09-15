import styles from './chat.module.css';
import io from 'socket.io-client';
import { useState, useRef, useEffect, useContext } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';
import { LuUserCircle2 } from 'react-icons/lu';
import { IoArrowBackOutline } from 'react-icons/io5';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { MdCall } from 'react-icons/md';
import { IoVideocam } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { object } from 'prop-types';
import Recorder from './Recorder';
import { useLocation } from 'react-router-dom';

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export default function Chat() {
  const location = useLocation();
  const { uid, userType } = location.state;
  // console.log(uid, userType);
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [currentRoomID, setRoomID] = useState(null);
  const [prevRoomID, setPrevRoomID] = useState(null);
  // const [userType, setUserType] = useState('buyers');
  const [contacts, setContacts] = useState(null);
  const [message, setmessage] = useState();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [currperson, setperson] = useState();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('kannada');

  const chatDisplayRef = useRef(null); // Ref to chat display container
  const bottomRef = useRef(null); // Ref to the last message to scroll into view
  // console.log(userType);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    //establish new socket connection
    const newSocket = io.connect(`http://localhost:${SERVER_PORT}`);
    setSocket(newSocket);

    loadContacts(currentUser.uid, userType).then((result) => {
      setContacts(result);
      setLoading(false);
    });

    // console.log("current user id ", currentUser.uid);

    return () => {
      // console.log("disconnected");
      newSocket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (contacts != null) {
      // console.log("contacts ", contacts);
    }
  }, [contacts]);

  useEffect(() => {
    //monitor events
    if (socket) {
      socket.on('connect', () => {
        // console.log("current socket ID:", socket.id); // Now it's guaranteed to be defined
      });
      socket.on("recieve-message", (data)=>{
        // console.log(data);
        const recieved_message = { user: data.user, text: data.text, room : data.room, lang : data.lang };
        console.log(recieved_message.lang);
        // if(recieved_message.lang!=lang){
        // }
        translate(recieved_message, lang, setMessages)
        // setMessages((prevMessages) => [...prevMessages, recieved_message]);
      });
      socket.on('joined-room', (room) => {
        // console.log(`${socket.id} joined room ${room}`);
      });
      socket.on('left-room', (room) => {
        // console.log(`${socket.id} left room ${room}`);
      });
    }
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('recieve-message');
        socket.off('joined-room');
        socket.off('left-room');
      }
    };
  }, [socket, messages]);

  useEffect(() => {
    //switch rooms/contacts
    if (socket) {
      switchRooms(socket, prevRoomID, currentRoomID);
      loadMessage(currentRoomID).then((result) => {
        setMessages(result);
      });
    }
  }, [currentRoomID]);

  useEffect(() => {
    // console.log("messages array updated");
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleClick = async (event) => {
    if (message.trim()) {
      if (currentRoomID) {
        // Optimistically add the message to the messages state
        const newMessage = { user: currentUser.uid, text: message, room : currentRoomID, lang : lang };
    
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Clear input

        setmessage('');
        // Emit the message to the server
        await socket.emit('send-message', newMessage);
        // console.log("Sent message:", message);

        // Upload message to Firebase
        uploadMessage(currentRoomID, message, currentUser.uid);
      } else {
        console.log('select room');
      }
    }
  };

  const handleChange = (event) => {
    setmessage(event.target.value);
  };

  if (loading) {
    return (
      <div>
        <h1>Loading contacts...</h1>
      </div>
    ); // Show a loading message or spinner
  }

  if (!contacts || Object.keys(contacts).length === 0) {
    return <div>No contacts available</div>; // Handle case where no contacts are available
  }

  return (
    <div className={styles.chitchat}>
      <div className={styles.chatui}>
        <div className={styles.cntlist}>
          <div className={styles.profileinfo}>
            <a
              onClick={() => {
                if (userType == 'farmer') {
                  navigate('/farmerdashboard');
                } else {
                  navigate('/buyer');
                }
              }}
            >
              <IoArrowBackOutline />
            </a>
            <h1>Chats</h1>
          </div>
          <div className={styles.list}>
            {Object.keys(contacts).map((key) => {
              const contact = contacts[key];
              return (
                <button
                  key={key}
                  onClick={() => {
                    // loadMessage(contact.roomID)
                    setPrevRoomID(currentRoomID);
                    setRoomID(contact.roomID);
                    setperson(`${contact.name}`);
                  }}
                  style={{
                    marginBottom: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  className={styles.cnt1}
                >
                  <LuUserCircle2 />
                  <span>{contact.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.clientpfp}>
            <span style={{ display: 'flex', gap: '15px' }}>
              <span style={{ position: 'relative', top: '1vh' }}>
                <LuUserCircle2 />
              </span>
              {currperson}
            </span>
            <div className={styles.icons}>
              {/* <MdCall />
              <IoVideocam />
              <IoMdMore /> */}
              <button
                className={styles.mkc}
                onClick={() => {
                  if (userType == 'farmer') {
                    navigate('/farmerdashboard');
                  } else {
                    navigate('/buyer');
                  }
                }}
                style={{ display: !currperson ? 'none' : 'flex' }}
              >
                Make Contract
              </button>
            </div>
          </div>
          <div className={styles.display} ref={chatDisplayRef}>
            {messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.mess} ${msg.user === currentUser.uid ? styles.sent : styles.received}`}
                >
                  <span>{msg.text}</span>
                </div>
              ))
            ) : (
              <div>.....Select Contact.....</div>
            )}
            <div ref={bottomRef} /> {/* Scroll target */}
          </div>
          <div
            className={styles.send}
            style={{
              display: !currperson ? 'none' : 'flex',
              backgroundColor: !currperson
                ? 'rgb(228, 226, 226)'
                : 'whitesmoke',
            }}
          >
            <textarea
              name="negotiate"
              id="chat"
              placeholder="Send a message"
              value={message}
              onChange={handleChange}
            />
            {/* audioRecorder component */}
            <div>
              <AudioRecorder
                onRecordingComplete={(blob)=>handleAudioUpload(blob, lang, setmessage)} //sending POST request
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                  // autoGainControl,
                  // channelCount,
                  // deviceId,
                  // groupId,
                  // sampleRate,
                  // sampleSize,
                }}
                onNotAllowedOrFound={(err) => console.table(err)}
                downloadOnSavePress={false}
                downloadFileExtension="webm"
                mediaRecorderOptions={{
                  audioBitsPerSecond: 128000,
                }}
                showVisualizer={true}
              />
            </div>
            <button onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const switchRooms = async (socket, prevRoomID, currentRoomID) => {
  await socket.emit('leave-room', prevRoomID);
  await socket.emit('join-room', currentRoomID);
};

const uploadMessage = async (currentRoomID, mess, userId) => {
  if (currentRoomID) {
    try {
      await addDoc(collection(db, 'chats', `${currentRoomID}`, 'messages'), {
        message: `${mess}`,
        timeStamp: new Date(),
        user: `${userId}`,
      });
      // .then(console.log("message sent"));
    } catch (error) {
      console.error('Error uploading message:', error);
    }
  } else {
    console.log('select room');
  }
};

const loadContacts = async (currentUserID, userType) => {
  const u_type = (userType=='buyers')?('buyers'):('farmers');
  try {
    const userDocRef = doc(db, u_type, currentUserID);
    console.log("ref : ", userDocRef);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.Contacts || {};
    } else {
      console.log('No such user!');
      return {};
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return {};
  }
};

const loadMessage = async (currentRoomID) => {
  // console.log(`fetching messages from ${currentRoomID}`);
  try {
    const messagesCollectionRef = collection(
      db,
      'chats',
      `${currentRoomID}`,
      'messages'
    );
    const q = query(messagesCollectionRef, orderBy('timeStamp', 'asc'));

    const querySnapshot = await getDocs(q);
    const fetchedMessages = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        user: data.user,
        text: data.message,
      };
    });
    // console.log(fetchedMessages);
    return fetchedMessages;
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }

}

const handleAudioUpload = async (blob, lang, setmessage) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = async () => {
    const base64data = reader.result.split(',')[1]; // Extract Base64 part

    const response = await fetch(`http://localhost:${SERVER_PORT}/chat/audioUpload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Send JSON data
      },
      body: JSON.stringify({
        audio: base64data,
        mimeType: blob.type,
        lang: lang,
      }),
    });
    response.json().then((result)=>{
      setmessage(result.transcription);
    })
    
  }
}

const translate = async (recieved_message, preffered_lang, setMessages) => {
  console.log("translating message");
  const response = await fetch(`http://localhost:${SERVER_PORT}/chat/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Ensure correct content type
    },
    body: JSON.stringify({
      text: recieved_message.text,
      // preffered_lang: preffered_lang,
      preffered_lang: 'hindi', //testing purposes
      text_lang: recieved_message.text_lang,
    }),
  });
  response.json().then((result) => {
    recieved_message.text = result.message;
    console.log(recieved_message);
    setMessages((prevMessages) => [...prevMessages, recieved_message]);
  })
}