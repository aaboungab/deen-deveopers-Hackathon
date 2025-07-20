import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {

    const cases = await prisma.legalCase.findMany({
      where: {
        status: 'POSTED',
        assignedTo: null, 
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

    const transformedCases = cases.map((caseItem: any) => ({
      id: caseItem.id,
      name: caseItem.clientName || 'Anonymous',
      legalIssue: caseItem.legalIssue,
      caseDescription: caseItem.caseDescription,
      location: caseItem.location || 'Location not specified',
      postedDate: caseItem.postedDate.toISOString().split('T')[0],
      urgency: caseItem.urgency.toLowerCase(),
      estimatedDuration: caseItem.estimatedDuration || 'Not specified',
      compensation: caseItem.compensationMin && caseItem.compensationMax 
        ? `${caseItem.compensationCurrency} ${caseItem.compensationMin} - ${caseItem.compensationMax}`
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