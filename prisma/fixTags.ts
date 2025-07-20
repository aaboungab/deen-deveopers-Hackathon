import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.legalProfessional.updateMany({
        data: {
          specialization: "CONTRACT_LAW", // or any valid Tag enum value
        },
      });
      
  console.log('✅ NULL tags updated to empty string');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
