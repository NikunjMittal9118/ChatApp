import io from 'socket.io-client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [Sentmessages, setSentMessages] = useState([]);
  const [Receivedmessages, setReceivedMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const now = new Date();
  // const socket = io('http://localhost:3000');
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.on('message', (data) => {
      console.log(data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // socket.on('message', (data) => {
    //   console.log(data.sender,socket.id)
    //   if (data.sender !== socket.id) {
    //     setReceivedMessages((prevMessages) => [...prevMessages, data.message]);
    //   }
    // });

    socket.on('disconnect', () => {
      console.log('Disconnected from server!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function Send(){
    const socket = io('http://localhost:3000');
    socket.emit('message', messageInput);
    setSentMessages([...Sentmessages,messageInput]);
    setMessageInput('');
  };
  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <label htmlFor="userName">Username: </label>
        <input id="userName" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="message">Message: </label>
        <input id="message" type="text" value={messageInput} onChange={(e)=> setMessageInput(e.target.value)} />
        <button onClick={Send}>Send</button>
      </div>
      <div>
        <h2>Received Messages:</h2>
        {Receivedmessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>
        <h2>Sent Messages:</h2>
        {Sentmessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}












 
//   return (
//     <div>
//       <h1>Chat App</h1>
//       <input type="text" value={userName} placeholder='Enter a username' onChange={(e) => setUserName(e.target.value)} />
//       <div>
//         <h2>Sent Messages :</h2>
//         <ul>
//           {Sentmessages.map((message, index) => (
//             <li key={index}>{message}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Received Messages :</h2>
//         <ul>
//           {Receivedmessages.map((message, index) => (
//             <li key={index}>{message}</li>
//           ))}
//         </ul>
//       </div>
//       <input type="text" value={messageInput} placeholder='Enter your message' onChange={(e) => setMessageInput(e.target.value)} />
//       <button onClick={Send}>Send</button>
//     </div>
//   );

// [{now.toLocaleTimeString()}] {userName}: 
// [{now.toLocaleTimeString()}] {userName}: 
// // }