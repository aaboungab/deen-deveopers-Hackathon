// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import socket from '@/lib/socket';

// export function MessagingThread({ threadId, currentUserId, senderType }: {
//   threadId: string;
//   currentUserId: string;
//   senderType: 'CLIENT' | 'PROFESSIONAL';
// }) {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState('');
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetch(`/api/messages?threadId=${threadId}`)
//       .then((res) => res.json())
//       .then(setMessages);

//     socket.emit('join', threadId);
//     socket.on('message:new', (msg) => {
//       if (msg.threadId === threadId) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => {
//       socket.emit('leave', threadId);
//       socket.off('message:new');
//     };
//   }, [threadId]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const message = {
//       threadId,
//       senderId: currentUserId,
//       senderType,
//       content: input.trim(),
//     };
//     socket.emit('message:send', message);
//     setMessages((prev) => [...prev, { ...message, createdAt: new Date().toISOString() }]);
//     setInput('');
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full border rounded shadow p-4 bg-white">
//       <div className="flex-1 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-sm px-3 py-2 rounded ${
//               msg.senderId === currentUserId
//                 ? 'bg-blue-600 text-white self-end'
//                 : 'bg-gray-200 text-black self-start'
//             }`}
//           >
//             {msg.content}
//             <div className="text-xs opacity-60 mt-1 text-right">
//               {new Date(msg.createdAt).toLocaleTimeString()}
//             </div>
//           </div>
//         ))}
//         <div ref={bottomRef} />
//       </div>

//       <div className="flex gap-2 pt-4 border-t mt-4">
//         <input
//           type="text"
//           className="flex-1 border rounded px-3 py-2"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



'use client';
import { useEffect, useRef, useState } from 'react';
import socket from '@/lib/socket';

export function MessagingThread({ threadId, currentUserId, senderType }: {
  threadId: string;
  currentUserId: string;
  senderType: 'CLIENT' | 'PROFESSIONAL';
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/messages?threadId=${threadId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend messages response:', data);
        if (Array.isArray(data)) setMessages(data);
        else setMessages([]);
      })
      .catch((err) => {
        console.error('Error fetching messages:', err);
        setMessages([]);
      });
  
    socket.emit('join', threadId);
    socket.on('message:new', (msg) => {
      if (msg.threadId === threadId) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  
    return () => {
      socket.emit('leave', threadId);
      socket.off('message:new');
    };
  }, [threadId]);
  

  const sendMessage = async () => {
    if (!input.trim()) return;
    const message = {
      threadId,
      senderId: currentUserId,
      senderType,
      content: input.trim(),
    };
    socket.emit('message:send', message);
    setMessages((prev) => [...prev, { ...message, createdAt: new Date().toISOString() }]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full border rounded shadow p-4 bg-white">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4 select-none">
            No messages yet — start the conversation!
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-sm px-3 py-2 rounded ${
                msg.senderId === currentUserId
                  ? 'bg-blue-600 text-white self-end'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              {msg.content}
              <div className="text-xs opacity-60 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 pt-4 border-t mt-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
