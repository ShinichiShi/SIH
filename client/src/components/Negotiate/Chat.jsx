import './chat.css';
import io from 'socket.io-client'
import { useState, useRef, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../context/Authcontext';


const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export default function Chat() {

  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [currentRoomID, setRoomID] = useState(1);
  const [prevRoomID, setPrevRoomID] = useState(null);
  const [userType, setUserType] = useState('buyers');
  const [contacts, setContacts] = useState(null);

  useEffect(()=>{
    if(!currentUser){
      return;
    }
    //establish new socket connection
    const newSocket = io.connect(`http://localhost:${SERVER_PORT}`);
    setSocket(newSocket);

    loadContacts(currentUser.uid, userType).then((result)=>{
      setContacts(result);
    })

    console.log("current user id ", currentUser.uid);

    return () => {
      console.log("disconnected");
      newSocket.disconnect();
    };
  },[currentUser])

  useEffect(()=>{
    if(contacts!=null){
      console.log("contacts ", contacts);
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
      loadMessage(currentRoomID);
    }
  }, [currentRoomID])


  const handleClick = async ()=>{
    //broadcast message 
    await socket.emit("send-message", {message : `message from ${socket.id}`, room:currentRoomID});

    //upload message to database
    uploadMessage(currentRoomID);
  }
  return (
  <>
    <button onClick={handleClick}>Send message</button>
    <button onClick={()=>{
      if(currentRoomID<3){
        setPrevRoomID(currentRoomID);
        setRoomID(currentRoomID+1);
      }
      else{
        setPrevRoomID(currentRoomID);
        setRoomID(1);
      }
    }}>Switch Room</button>
  </>
  );
}

const switchRooms = async (socket, prevRoomID, currentRoomID)=>{
  await socket.emit('leave-room', prevRoomID)
  await socket.emit('join-room', currentRoomID);
}

const uploadMessage = async (currentRoomID)=>{
  try {
    await addDoc(collection(db, 'chats', `${currentRoomID}`, 'messages'), {
      message: 'test text',
      timeStamp: new Date(),
      // user: currentUser.uid,
      user: 'asdjka'
    }).then(console.log("message sent"));
  } catch (error) {
    console.error("Error uploading message:", error);
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
}

const loadMessage = async (currentRoomID)=>{
  //TODO
  console.log(`fetching messages from ${currentRoomID}`);
}