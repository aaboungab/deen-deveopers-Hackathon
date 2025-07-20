// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Adjust this import to match your actual setup

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const threadId = searchParams.get('threadId');

//     if (!threadId) {
//       return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
//     }

//     const allmessages = await prisma.message.count();

//     console.log('mesages rom backend', allmessages)


//     const messages = await prisma.message.findMany({
//       where: { threadId },
//       orderBy: { createdAt: 'asc' },
//     });

//     if (!messages) return NextResponse.json([]);

//     console.log('mesages rom backend', messages)

//     return NextResponse.json(messages);
//   } catch (err) {
//     console.error('💥 /api/messages failed:', err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const threadId = searchParams.get('threadId');

//     console.log('➡️ Received threadId:', threadId);

//     if (!threadId) {
//       console.warn('❌ Missing threadId');
//       return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
//     }

//     // const allmessages = await prisma.message.count();
//     // console.log('✅ Total message count in DB:', allmessages);

//     const messages = await prisma.message.findMany({
//     //   where: { threadId },
//     //   orderBy: { createdAt: 'asc' },
//     });

//     console.log('📦 Messages found for threadId:', messages.length);
//     console.dir(messages, { depth: null });

//     return NextResponse.json(messages);
//   } catch (err: any) {
//     console.error('💥 /api/messages failed:', err.message || err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }











// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const threadId = searchParams.get('threadId');

//     console.log('➡️ Received threadId:', threadId);

//     if (!threadId || typeof threadId !== 'string') {
//       console.warn('❌ Missing or invalid threadId');
//       return NextResponse.json({ error: 'Missing or invalid threadId' }, { status: 400 });
//     }

//     const messages = await prisma.message.findMany({
//       where: {
//         threadId: threadId,
//       },
//       orderBy: {
//         createdAt: 'asc',
//       },
//       include: {
//         attachments: true, // if needed
//       },
//     });

//     console.log(`📦 Found ${messages.length} messages for threadId: ${threadId}`);
//     return NextResponse.json(messages);
//   } catch (err: any) {
//     console.error('💥 /api/messages failed:', err.message || err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    console.log('🛠️ API route /api/messages loaded');
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get('threadId');

    console.log('➡️ Received threadId:', threadId);

    if (!threadId) {
      console.warn('❌ Missing threadId');
      return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
    }

    // const thread = await prisma.messageThread.findUnique({
    //   where: { id: threadId },
    // });

    const thread = await prisma.messageThread.findFirst({
        // include: {
        //   messages: {
        //     orderBy: { createdAt: 'asc' },
        //   },
        // },
      });

    // if (!thread) {
    //   console.warn('⚠️ Thread not found:', threadId);
    //   return NextResponse.json([], { status: 200 });
    // }

    // const messages = await prisma.message.findMany({
    //   where: { threadId },
    //   orderBy: { createdAt: 'asc' },
    // });

    // console.log(`📦 Found ${messages.length} messages for threadId ${threadId}`);
    return NextResponse.json(thread);
  } catch (err: any) {
    console.error('💥 /api/messages failed:', err.message || err);
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
