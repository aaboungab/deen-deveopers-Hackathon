// import { Server } from 'socket.io';
// import { NextApiRequest } from 'next';

// let io: Server;

// export default async function handler(req: NextApiRequest, res: any) {
//   if (!res.socket.server.io) {
//     io = new Server(res.socket.server, {
//       path: '/api/socket',
//       addTrailingSlash: false,
//       cors: {
//         origin: '*',
//       },
//     });

//     io.on('connection', (socket) => {
//       console.log('New socket connected', socket.id);

//       socket.on('join', (threadId: string) => {
//         socket.join(threadId);
//       });

//       socket.on('message:send', async (msg) => {
//         // You’d usually save with Prisma here
//         io.to(msg.threadId).emit('message:new', msg); // broadcast to thread
//       });

//       socket.on('disconnect', () => {
//         console.log('Socket disconnected', socket.id);
//       });
//     });

//     res.socket.server.io = io;
//   }

//   res.end();
// }




import { Server } from 'socket.io';
import { NextApiRequest } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust this path to where your Prisma client is

let io: Server;

export default async function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('New socket connected', socket.id);

      socket.on('join', (threadId: string) => {
        socket.join(threadId);
        console.log(`Socket ${socket.id} joined thread ${threadId}`);
      });

      socket.on('message:send', async (msg) => {
        try {
            const { content, threadId, senderId, senderType } = msg;
            const newMessage = await prisma.message.create({
                data: {
                  content,
                  threadId,
                  senderId,
                  senderType, // 👈 make sure this exists and is passed
                },
              });

              io.to(threadId).emit('message:new', newMessage);
        } catch (err) {
          console.error('Error saving message:', err);
          socket.emit('message:error', 'Failed to save message.');
        }
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
