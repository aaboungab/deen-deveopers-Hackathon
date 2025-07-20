import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseId, professionalId } = body;

    if (!caseId || !professionalId) {
      return NextResponse.json({ error: 'Missing caseId or professionalId' }, { status: 400 });
    }

    const [legalCase, professional] = await Promise.all([
      prisma.legalCase.findUnique({ where: { id: caseId } }),
      prisma.legalProfessional.findUnique({ where: { id: professionalId } }),
    ]);

    if (!legalCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (legalCase.assignedTo) {
      return NextResponse.json({ error: 'Case already assigned' }, { status: 400 });
    }

    if (!professional || !professional.isAvailable || !professional.isVerified) {
      return NextResponse.json({ error: 'Invalid or unavailable professional' }, { status: 400 });
    }

    // Assign the case
    const updatedCase = await prisma.legalCase.update({
      where: { id: caseId },
      data: {
        assignedTo: professionalId,
        assignedAt: new Date(),
        status: 'ASSIGNED',
      },
      include: {
        assignedProfessional: true,
      },
    });

    // Log history
    await prisma.caseHistory.create({
      data: {
        legalCaseId: caseId,
        action: 'CASE_ASSIGNED',
        description: `Case assigned to ${professional.firstName} ${professional.lastName}`,
        performedBy: professionalId,
      },
    });

    return NextResponse.json(updatedCase, { status: 200 });
  } catch (error) {
    console.error('Assignment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
