import {
    PrismaClient,
    UserType,
    CaseStatus,
    UrgencyLevel,
    Tag,
    AddedFrom,
  } from '@prisma/client';
  import bcrypt from 'bcryptjs';
  
  const prisma = new PrismaClient();
  
  const NUM_CASES = 15;
  const MESSAGES_PER_THREAD = 30;
  
  async function main() {
    const clientPassword = await bcrypt.hash('Password1#', 12);
    const proPassword = await bcrypt.hash('Password1#', 12);
  
    const client = await prisma.legalClient.upsert({
      where: { email: 'jesuswrites200431@gmail.com' },
      update: {},
      create: {
        firstName: 'Jesus',
        lastName: 'Writes',
        email: 'jesuswrites200431@gmail.com',
        phone: '+2348012345678',
        location: 'Lagos, Nigeria',
        password: clientPassword,
        notes: 'VIP client with sensitive legal matters.',
      },
    });
  
    const professional = await prisma.legalProfessional.upsert({
      where: { email: 'jesuswrites200432@gmail.com' },
      update: {},
      create: {
        firstName: 'Jesus',
        lastName: 'WritesPro',
        email: 'jesuswrites200432@gmail.com',
        phone: '+2348098765432',
        password: proPassword,
        specialization: Tag.CRIMINAL_LAW, // enum type now
        yearsOfExperience: 7,
        location: 'Abuja, Nigeria',
        isAvailable: true,
        isVerified: true,
        verifiedAt: new Date(),
      },
    });
  
    for (let i = 1; i <= NUM_CASES; i++) {
      const legalCase = await prisma.legalCase.create({
        data: {
          clientId: client.id,
          clientName: `${client.firstName} ${client.lastName}`,
          clientEmail: client.email,
          clientPhone: client.phone,
          legalIssue: `Issue ${i}`,
          caseDescription: `Case description ${i}`,
          location: `Courtroom ${i}, Lagos`,
          status: CaseStatus.POSTED, // 🟢 now visible to professionals
          urgency: UrgencyLevel.URGENT,
          assignedTo: null,
          estimatedDuration: `${4 + i} weeks`,
          compensationMin: 5000 + i * 100,
          compensationMax: 15000 + i * 200,
          compensationCurrency: 'USD',
          tags: Tag.CRIMINAL_LAW,
        },
      });
  
      await prisma.caseHistory.createMany({
        data: [
          {
            action: 'CASE_CREATED',
            description: `Case ${i} created by client.`,
            performedBy: client.id,
            legalCaseId: legalCase.id,
          },
          {
            action: 'CASE_POSTED',
            description: `Case ${i} posted and visible to professionals.`,
            performedBy: 'SYSTEM',
            legalCaseId: legalCase.id,
          },
        ],
      });
  
      const thread = await prisma.messageThread.create({
        data: {
          legalCaseId: legalCase.id,
          clientId: client.id,
          professionalId: professional.id,
        },
      });
  
      for (let j = 1; j <= MESSAGES_PER_THREAD; j++) {
        const senderType = j % 2 === 0 ? UserType.PROFESSIONAL : UserType.CLIENT;
        const senderId = senderType === UserType.CLIENT ? client.id : professional.id;
  
        const message = await prisma.message.create({
          data: {
            threadId: thread.id,
            senderId,
            senderType,
            content: `Message ${j} in thread for case ${i}`,
          },
        });
  
        if (j % 2 === 0) {
          await prisma.attachment.create({
            data: {
              link: `https://example.com/docs/case${i}_message${j}.pdf`,
              addedFrom: AddedFrom.MESSAGE,
              messageId: message.id,
            },
          });
        }
      }
  
      await prisma.attachment.create({
        data: {
          link: `https://example.com/docs/case${i}_attachment.pdf`,
          addedFrom: AddedFrom.LEGAL_CASE,
          legalCaseId: legalCase.id,
        },
      });
    }
  
    console.log(`✨ Seeded ${NUM_CASES} POSTED cases with threads and attachments.`);
  }
  
  main()
    .catch((e) => {
      console.error('❌ Seeder error:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
  