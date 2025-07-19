import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cases/[id] - Get a specific case
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const caseId = params.id;

//     const legalCase = await prisma.legalCase.findUnique({
//       where: { id: caseId },
//       include: {
//         attachments: true,
//         caseHistory: {
//           orderBy: {
//             createdAt: 'desc',
//           },
//         },
//       },
//     });

//     if (!legalCase) {
//       return NextResponse.json(
//         { error: 'Case not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(legalCase);
//   } catch (error) {
//     console.error('Error fetching case:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch case' },
//       { status: 500 }
//     );
//   }
// }


export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseItem = await prisma.legalCase.findUnique({
      where: { id: params.id },
      include: {
        attachments: true,
        caseHistory: true,
        client: true,
        assignedProfessional: true,
      },
    });

    if (!caseItem) {
      return NextResponse.json({ message: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json(caseItem);
  } catch (error) {
    console.error('[GET /api/cases/:id]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


// PUT /api/cases/[id] - Update a case (e.g., assign to professional)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseId = params.id;
    const body = await request.json();

    const {
      status,
      assignedTo,
      urgency,
      estimatedDuration,
      compensationMin,
      compensationMax,
    } = body;

    const updateData: any = {};
    
    if (status) updateData.status = status;
    if (assignedTo) {
      updateData.assignedTo = assignedTo;
      updateData.assignedAt = new Date();
    }
    if (urgency) updateData.urgency = urgency;
    if (estimatedDuration) updateData.estimatedDuration = estimatedDuration;
    if (compensationMin !== undefined) updateData.compensationMin = compensationMin;
    if (compensationMax !== undefined) updateData.compensationMax = compensationMax;

    const updatedCase = await prisma.legalCase.update({
      where: { id: caseId },
      data: {
        ...updateData,
        caseHistory: {
          create: {
            action: 'UPDATED',
            description: `Case was updated: ${Object.keys(updateData).join(', ')}`,
          },
        },
      },
      include: {
        attachments: true,
        caseHistory: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
    });

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error('Error updating case:', error);
    return NextResponse.json(
      { error: 'Failed to update case' },
      { status: 500 }
    );
  }
}

// DELETE /api/cases/[id] - Delete a case
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseId = params.id;

    await prisma.legalCase.delete({
      where: { id: caseId },
    });

    return NextResponse.json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Error deleting case:', error);
    return NextResponse.json(
      { error: 'Failed to delete case' },
      { status: 500 }
    );
  }
} 