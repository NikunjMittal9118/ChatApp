import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io();

function Home() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    socket.on('message', ({ timestamp, username, message }) => {
      const newMessage = `[${timestamp.toLocaleTimeString()}] ${username}: ${message}`;
      setReceivedMessages([...receivedMessages, newMessage]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = ()=>{
    socket.emit('message', { timestamp: new Date(), username, message });
    const newMessage = `[${new Date().toLocaleTimeString()}] ${username}: ${message}`;
    setSentMessages([...sentMessages, newMessage]);
    setMessage('');
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="message">Message: </label>
        <input id="message" type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h2>Received Messages:</h2>
        {receivedMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>
        <h2>Sent Messages:</h2>
        {sentMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default Home;




































// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import mdns from 'mdns';

// const socket = io();

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   const handleSendMessage = () => {
//     socket.emit('message', messageInput);
//     setMessageInput('');
//   };

//   useEffect(() => {
//     const browser = mdns.createBrowser(mdns.tcp('http'));
//     browser.on('serviceUp', (service) => {
//       console.log('Found service:', service.host, service.port);
//       // connect to the service and exchange messages
//     });
//     browser.start();

//     socket.on('message', (message) => {
//       setMessages([...messages, message]);
//     });
//   }, []);

//   return (
//     <div>
//       <ul>
//         {messages.map((message) => (
//           <li>{message}</li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;


























// import React, { useState, useEffect } from 'react';
// import { createPeerConnection } from './peer-connection';

// export default function Home() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [sentMessages, setSentMessages] = useState([]);
//   const [peerConnections, setPeerConnections] = useState([]);

//   useEffect(() => {
//     // Create a new peer connection for this client
//     const peerConnection = createPeerConnection();

//     // Listen for incoming messages from the other client
//     peerConnection.ondatachannel = event => {
//       const dataChannel = event.channel;

//       dataChannel.onmessage = messageEvent => {
//         const newMessage = messageEvent.data;
//         setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
//       };
//     };

//     // Add the new peer connection to the list of connections
//     setPeerConnections(prevConnections => [...prevConnections, peerConnection]);

//     // Clean up on unmount
//     return () => {
//       peerConnection.close();
//       setPeerConnections(prevConnections => prevConnections.filter(c => c !== peerConnection));
//     };
//   }, []);

//   const handleSendMessage = () => {
//     // Send the message to all connected peers
//     const newMessage = `[${new Date()}] ${username}: ${message}`;
//     peerConnections.forEach(peerConnection => {
//       const dataChannel = peerConnection.createDataChannel('messages');
//       dataChannel.onopen = () => {
//         dataChannel.send(newMessage);
//       };
//     });
  
//     // Add the message to the sent messages history
//     setSentMessages(prevMessages => [...prevMessages, newMessage]);
  
//     // Clear the input field
//     setMessage('');
//   };
  

//   return (
//     <div>
//       <div>
//         <label htmlFor="username">Username: </label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="message">Message: </label>
//         <input
//           id="message"
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Received Messages:</h2>
//         {receivedMessages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <div>
//         <h2>Sent Messages:</h2>
//         {sentMessages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { createPeerConnection } from './peer-connection';

// export default function Home() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [sentMessages, setSentMessages] = useState([]);
//   const [peerConnections, setPeerConnections] = useState([]);

//   useEffect(() => {
//     // Create a new peer connection for this client
//     const peerConnection = createPeerConnection();

//     // Listen for incoming messages from the other client
//     peerConnection.ondatachannel = event => {
//       const dataChannel = event.channel;

//       dataChannel.onmessage = messageEvent => {
//         const newMessage = messageEvent.data;
//         setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
//       };
//     };

//     // Add the new peer connection to the list of connections
//     setPeerConnections(prevConnections => [...prevConnections, peerConnection]);

//     // Clean up on unmount
//     return () => {
//       peerConnection.close();
//       setPeerConnections(prevConnections => prevConnections.filter(c => c !== peerConnection));
//     };
//   }, []);

//   const handleSendMessage = () => {
//     const newMessage = `[${new Date()}] ${username}: ${message}`;
//     peerConnections.forEach(peerConnection => {
//       const dataChannel = peerConnection.createDataChannel('messages');
//       dataChannel.onopen = () => {
//         dataChannel.send(newMessage);
//       };
//     });
//     setSentMessages(prevMessages => [...prevMessages, newMessage]);
//     setMessage('');
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="username">Username: </label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="message">Message: </label>
//         <input
//           id="message"
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Received Messages:</h2>
//         {receivedMessages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <div>
//         <h2>Sent Messages:</h2>
//         {sentMessages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//     </div>
//   );
// }






