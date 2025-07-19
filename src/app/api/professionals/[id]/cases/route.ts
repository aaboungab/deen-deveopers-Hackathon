import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  // _req: NextRequest,
  // { params }: { params: { id: string } }
) {
  // const professionalId = params.id;

  // try {
  //   const assignedCases = await prisma.legalCase.findMany({
  //     where: { assignedTo: professionalId },
  //     orderBy: { assignedAt: 'desc' },
  //   });

  //   return NextResponse.json(assignedCases);
  // } catch (error) {
  //   console.error(`[GET /api/professional/${professionalId}/cases]`, error);
  //   return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  // }
}
