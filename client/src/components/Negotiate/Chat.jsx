import styles from './chat.module.css';
import io from 'socket.io-client'
import { useState, useRef, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { object } from 'prop-types';


const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export default function Chat() {

  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [currentRoomID, setRoomID] = useState(null);
  const [prevRoomID, setPrevRoomID] = useState(null);
  const [userType, setUserType] = useState('buyers');
  const [contacts, setContacts] = useState(null);
  const [message,setmessage]=useState();
  const[messages, setMessages] = useState();
  const navigate = useNavigate();
  const [currperson,setperson]=useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!currentUser){
      return;
    }
    //establish new socket connection
    const newSocket = io.connect(`http://localhost:${SERVER_PORT}`);
    setSocket(newSocket);

    loadContacts(currentUser.uid, userType).then((result)=>{
      setContacts(result);
      setLoading(false);
    })

    console.log("current user id ", currentUser.uid);

    return () => {
      console.log("disconnected");
      newSocket.disconnect();
    };
  },[currentUser])

  useEffect(()=>{
    if(contacts!=null){
      // console.log("contacts ", contacts);
    }
  },[contacts])

  useEffect(()=>{

    //monitor events
    if(socket){
      socket.on("connect", () => {
        console.log("current socket ID:", socket.id); // Now it's guaranteed to be defined
      });
      socket.on("recieve-message", (received_message) => {
        console.log("recieved message ", received_message.message, " from room ,", received_message.room);
        setMessages((prevMessages) => [...prevMessages, received_message]);
      });
      socket.on("joined-room", (room)=>{
        console.log(`${socket.id} joined room ${room}`);
      })
      socket.on("left-room", (room)=>{
        console.log(`${socket.id} left room ${room}`);
      })
    }
    return ()=>{
      if(socket){
        socket.off("connect");
        socket.off("recieve-message");
        socket.off("joined-room");
        socket.off("left-room");
      }
    }
  }, [socket])

  useEffect(()=>{
    //switch rooms/contacts
      if(socket){
        switchRooms(socket, prevRoomID, currentRoomID);
        loadMessage(currentRoomID).then((result)=>{setMessages(result)});
      }
  }, [currentRoomID])

  useEffect(()=>{
    console.log(messages);

  }, [messages])


  const handleClick = async ()=>{
    //broadcast message 
    await socket.emit("send-message", {message : `message from ${socket.id}`, room:currentRoomID});

    //upload message to database
    uploadMessage(currentRoomID,message,currentUser.uid);
  }
  const handleChange = (event) => {
    setmessage(event.target.value);
  };

  if (loading) {
    return <div><h1>Loading contacts...</h1></div>; // Show a loading message or spinner
  }

  if (!contacts || Object.keys(contacts).length === 0) {
    return <div>No contacts available</div>; // Handle case where no contacts are available
  }

  return (
  <div className={styles.chitchat}>
    <div className={styles.chatui}>
      <div className={styles.cntlist}>
        <div className={styles.profileinfo}>
          <a onClick={()=>navigate()}><IoArrowBackOutline /></a>
          <h1>Chats</h1>
        </div>
        <div className={styles.list}>
          {/* <div className={styles.cnt1}>
            <LuUserCircle2 />
            <span>lavi</span>
          </div>
          <div className={styles.cnt1}>
          <LuUserCircle2 />
            <span>supreeth</span>
          </div>
          <div className={styles.cnt1}>
            <LuUserCircle2 />
            <span>dilip</span>
          </div>
          <div className={styles.cnt1}>
            <LuUserCircle2 />
            <span>isha</span>
          </div>
          <div className={styles.cnt1}>
            <LuUserCircle2 />
            <span>samyak</span>
          </div> */}
         {Object.keys(contacts).map((key) => {
            const contact = contacts[key];
            return (
              <button
                key={key}
                onClick={() => {
                  // loadMessage(contact.roomID)
                  setPrevRoomID(currentRoomID);
                  setRoomID(contact.roomID);
                  setperson(`${contact.farmer_name}`)}}
                style={{ marginBottom: '10px', cursor: 'pointer',textAlign:'center' }}
                className={styles.cnt1}
              >
                <LuUserCircle2 />
                <span>{contact.farmer_name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.chat}>
        <div className={styles.clientpfp}>
          <span style={{display:'flex',gap:'15px'}}>
            <span style={{position:'relative',top:'1vh'}}><LuUserCircle2 /></span>
            {currperson}
            </span>
          <div className={styles.icons}>
          <MdCall />
          <IoVideocam />
          <IoMdMore />
          </div>
        </div>
        <div className={styles.display}>
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
              <div>No messages yet.</div>
            )}
          </div>
        <div className={styles.send}>
          <textarea
            name="negotiate"
            id="chat"
            placeholder="Send a message"
            onChange={handleChange}
          />
          <button onClick={handleClick}>Send</button>
        </div>
      </div>
    </div>
  </div>
  );
}

const switchRooms = async (socket, prevRoomID, currentRoomID)=>{
  await socket.emit('leave-room', prevRoomID)
  await socket.emit('join-room', currentRoomID);
}

const uploadMessage = async (currentRoomID,mess,userId)=>{
  if(currentRoomID){
    try {
      await addDoc(collection(db, 'chats', `${currentRoomID}`, 'messages'), {
        message: `${mess}`,
        timeStamp: new Date(),
        // user: currentUser.uid,
        user:`${userId}`
      }).then(console.log("message sent"));
    } catch (error) {
      console.error("Error uploading message:", error);
    }    
  }else{
    console.log("select room");
  }
}

const loadContacts = async (currentUserID, userType)=>{
  try {
    const userDocRef = doc(db, userType, currentUserID);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.Contacts || {};
    } else {
      console.log("No such user!");
      return {};
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {};
  }
};

const loadMessage = async (currentRoomID)=>{
  console.log(`fetching messages from ${currentRoomID}`);
  try {
    const messagesCollectionRef = collection(db, "chats", `${currentRoomID}`, "messages");
    const q = query(messagesCollectionRef, orderBy('timeStamp', 'asc'));

    const querySnapshot = await getDocs(q);
    const fetchedMessages = querySnapshot.docs.map(doc=>{
      const data = doc.data();
      return{
        user:data.user,
        text:data.message
      }
    })
    // console.log(fetchedMessages);
    return fetchedMessages;
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }
  
}