import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all posted cases that haven't been assigned yet
    const cases = await prisma.legalCase.findMany({
      where: {
        status: 'POSTED',
        assignedTo: null, // Only unassigned cases
      },
      orderBy: {
        postedDate: 'desc',
      },
      select: {
        id: true,
        clientName: true,
        clientEmail: true,
        clientPhone: true,
        legalIssue: true,
        caseDescription: true,
        location: true,
        postedDate: true,
        urgency: true,
        estimatedDuration: true,
        compensationMin: true,
        compensationMax: true,
        compensationCurrency: true,
        tags: true,
      },
    });

    // Transform the data to match the expected format
    const transformedCases = cases.map((caseItem) => ({
      id: caseItem.id as string,
      name: (caseItem.clientName as string) || 'Anonymous',
      legalIssue: caseItem.legalIssue as string,
      caseDescription: caseItem.caseDescription as string,
      location: (caseItem.location as string) || 'Location not specified',
      postedDate: (caseItem.postedDate as Date).toISOString().split('T')[0],
      urgency: (caseItem.urgency as string).toLowerCase(),
      estimatedDuration: (caseItem.estimatedDuration as string) || 'Not specified',
      compensation: caseItem.compensationMin && caseItem.compensationMax 
        ? `${caseItem.compensationCurrency as string} ${caseItem.compensationMin} - ${caseItem.compensationMax}`
        : 'Not specified',
    }));

    return NextResponse.json(transformedCases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      clientEmail,
      clientPhone,
      legalIssue,
      caseDescription,
      location,
      urgency = 'MEDIUM',
      estimatedDuration,
      compensationMin,
      compensationMax,
      compensationCurrency = 'USD',
      tags = [],
    } = body;

    // Validate required fields
    if (!legalIssue || !caseDescription) {
      return NextResponse.json(
        { error: 'Legal issue and case description are required' },
        { status: 400 }
      );
    }

    const newCase = await prisma.legalCase.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        legalIssue,
        caseDescription,
        location,
        urgency,
        estimatedDuration,
        compensationMin,
        compensationMax,
        compensationCurrency,
        tags,
        status: 'POSTED',
        caseHistory: {
          create: {
            action: 'CREATED',
            description: 'Case was created and posted',
          },
        },
      },
      include: {
        attachments: true,
        caseHistory: true,
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    );
  }
} 