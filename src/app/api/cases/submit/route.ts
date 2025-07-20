// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { 
//       clientName, 
//       clientEmail, 
//       clientPhone, 
//       legalIssue, 
//       caseDescription, 
//       location, 
//       urgency, 
//       estimatedDuration, 
//       compensationMin, 
//       compensationMax, 
//       compensationCurrency, 
//       tags 
//     } = body;

//     // Validate required fields
//     if (!legalIssue || !caseDescription) {
//       return NextResponse.json(
//         { error: 'Legal issue and case description are required' },
//         { status: 400 }
//       );
//     }

//     // Create the legal case in the database
//     const legalCase = await prisma.legalCase.create({
//       data: {
//         clientName: clientName || null,
//         clientEmail: clientEmail || null,
//         clientPhone: clientPhone || null,
//         legalIssue,
//         caseDescription,
//         location: location || null,
//         urgency: urgency || 'MEDIUM',
//         estimatedDuration: estimatedDuration || null,
//         compensationMin: compensationMin || null,
//         compensationMax: compensationMax || null,
//         compensationCurrency: compensationCurrency || 'USD',
//         tags: tags || null,
//         status: 'POSTED',
//         postedDate: new Date(),
//       },
//     });

//     // Create case history entry
//     await prisma.caseHistory.create({
//       data: {
//         legalCaseId: legalCase.id,
//         action: 'CREATED',
//         description: 'Case was submitted by client',
//       },
//     });

//     return NextResponse.json(
//       { 
//         message: 'Case submitted successfully', 
//         caseId: legalCase.id 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error submitting case:', error);
//     return NextResponse.json(
//       { error: 'Failed to submit case' },
//       { status: 500 }
//     );
//   }
// } 


// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const {
//       legalIssue,
//       caseDescription,
//       location,
//       urgency,
//       estimatedDuration,
//       compensationMin,
//       compensationMax,
//       compensationCurrency,
//       tags,
//       clientId
//     } = body;

//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.replace('Bearer ', '');

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     let userId = clientId as string;

//     if (!userId) {
//       return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     }

//     const client = await prisma.legalClient.findUnique({
//       where: { id: userId }, 
//     });

//     if (!client) {
//       return NextResponse.json({ error: 'Client not found' }, { status: 404 });
//     }

//     if (!legalIssue || !caseDescription) {
//       return NextResponse.json(
//         { error: 'Legal issue and case description are required' },
//         { status: 400 }
//       );
//     }

//     const legalCase = await prisma.legalCase.create({
//       data: {
//         clientId: client.id,
//         clientName: client.firstName + " " + client.lastName || null,
//         clientEmail: client.email || null,
//         clientPhone: client.phone || null,
//         legalIssue,
//         caseDescription,
//         location: location || null,
//         urgency: urgency || 'MEDIUM',
//         estimatedDuration: estimatedDuration || null,
//         compensationMin: compensationMin || null,
//         compensationMax: compensationMax || null,
//         compensationCurrency: compensationCurrency || 'USD',
//         tags: tags || null,
//         status: 'POSTED',
//         postedDate: new Date(),
//       },
//     });

//     await prisma.caseHistory.create({
//       data: {
//         legalCaseId: legalCase.id,
//         action: 'CREATED',
//         description: 'Case was submitted by client',
//       },
//     });

//     return NextResponse.json(
//       {
//         message: 'Case submitted successfully',
//         caseId: legalCase.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error submitting case:', error);
//     return NextResponse.json(
//       { error: 'Failed to submit case' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, CaseStatus, UrgencyLevel, Tag } from '@prisma/client';
import jwt from 'jsonwebtoken'; // optional: if decoding JWT
import { z } from 'zod';

const prisma = new PrismaClient();

// Validate incoming request body
const CaseSchema = z.object({
  legalIssue: z.string().min(1),
  caseDescription: z.string().min(1),
  location: z.string().optional(),
  urgency: z.nativeEnum(UrgencyLevel).default(UrgencyLevel.MEDIUM),
  estimatedDuration: z.string().optional(),
  compensationMin: z.number().optional(),
  compensationMax: z.number().optional(),
  compensationCurrency: z.string().default('USD'),
  tags: z.nativeEnum(Tag),
  clientId: z.string().cuid(), // provided explicitly or decoded from JWT
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Option A: Use clientId from body (your current approach)
    const body = await request.json();
    const parseResult = CaseSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const {
      clientId,
      legalIssue,
      caseDescription,
      location,
      urgency,
      estimatedDuration,
      compensationMin,
      compensationMax,
      compensationCurrency,
      tags,
    } = parseResult.data;

    const client = await prisma.legalClient.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const legalCase = await prisma.legalCase.create({
      data: {
        clientId: client.id,
        clientName: `${client.firstName} ${client.lastName}`,
        clientEmail: client.email,
        clientPhone: client.phone,
        legalIssue,
        caseDescription,
        location: location || null,
        urgency,
        estimatedDuration,
        compensationMin,
        compensationMax,
        compensationCurrency,
        tags,
        status: CaseStatus.POSTED,
        postedDate: new Date(),
      },
    });

    await prisma.caseHistory.create({
      data: {
        legalCaseId: legalCase.id,
        action: 'CREATED',
        description: 'Case was submitted by client',
        performedBy: client.id,
      },
    });

    return NextResponse.json(
      { message: 'Case submitted successfully', caseId: legalCase.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/cases/submit] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
