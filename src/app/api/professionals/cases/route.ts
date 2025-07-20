
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, CaseStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log('Incoming request to /api/professionals/cases');

    const body = await req.json();
    console.log('Request body:', body);

    const professionalId = body.professionalId;
    console.log('Extracted professionalId:', professionalId);

    if (!professionalId) {
      console.warn('Missing professionalId in request body');
      return NextResponse.json({ error: 'Missing professionalId' }, { status: 400 });
    }

    const professional = await prisma.legalProfessional.findUnique({
      where: { id: professionalId },
    });
    console.log('Found professional:', professional);

    if (!professional) {
      console.warn('No legal professional found for ID:', professionalId);
      return NextResponse.json({ error: 'Professional not found' }, { status: 404 });
    }

    const whereClause: any = {
      status: CaseStatus.POSTED,
      assignedTo: null,
    };

    if (professional.specialization) {
      console.log('Professional specialization:', professional.specialization);
      whereClause.tags = professional.specialization;
    }

    console.log('Final whereClause for legalCase query:', whereClause);

    const matchingCases = await prisma.legalCase.findMany({
      where: whereClause,
      orderBy: { postedDate: 'desc' }, // comment this out if error persists
      include: {
        client: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        // attachments: true,
      },
    });

    console.log('Matching cases found:', matchingCases.length);
    return NextResponse.json(matchingCases);
  } catch (error: any) {
    console.error('Error fetching matching cases:', error);
    return NextResponse.json(
      { error: error?.message || String(error) || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
