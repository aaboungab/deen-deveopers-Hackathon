import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test legal professional
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const testProfessional = await prisma.legalProfessional.upsert({
    where: { email: 'test@lawyer.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@lawyer.com',
      phone: '+1-555-0123',
      password: hashedPassword,
      specialization: JSON.stringify(['Family Law', 'Criminal Law']),
      yearsOfExperience: 8,
      location: 'Los Angeles, CA',
      isAvailable: true,
      isVerified: true, // Set to true for testing
    },
  });

  console.log('✅ Test professional created:', testProfessional.email);

  // Create sample legal cases
  const cases = [
    {
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.johnson@email.com',
      legalIssue: 'Family Law',
      caseDescription: 'I need help with a divorce case. My spouse and I have been separated for 2 years and we need to finalize the divorce. We have two children and need to establish custody arrangements. There are also some property disputes that need to be resolved.',
      location: 'New York, NY',
      urgency: 'MEDIUM',
      estimatedDuration: '3-6 months',
      compensationMin: 2000,
      compensationMax: 5000,
      tags: JSON.stringify(['divorce', 'custody', 'property']),
      status: 'POSTED',
    },
    {
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      legalIssue: 'Employment Law',
      caseDescription: 'I was wrongfully terminated from my job after 8 years of employment. The company claims it was due to performance issues, but I have documentation showing I was meeting all targets. I believe it was retaliation for reporting safety violations.',
      location: 'Los Angeles, CA',
      urgency: 'HIGH',
      estimatedDuration: '6-12 months',
      compensationMin: 5000,
      compensationMax: 15000,
      tags: JSON.stringify(['wrongful-termination', 'retaliation', 'employment']),
      status: 'POSTED',
    },
    {
      clientName: 'Emily Rodriguez',
      clientEmail: 'emily.rodriguez@email.com',
      legalIssue: 'Property Law',
      caseDescription: 'I inherited a property from my grandmother, but there\'s a dispute with my uncle who claims he has rights to the property. The will is clear, but he\'s been living in the property for the past year and refuses to leave.',
      location: 'Miami, FL',
      urgency: 'MEDIUM',
      estimatedDuration: '2-4 months',
      compensationMin: 3000,
      compensationMax: 8000,
      tags: JSON.stringify(['inheritance', 'property-dispute', 'will']),
      status: 'POSTED',
    },
    {
      clientName: 'David Thompson',
      clientEmail: 'david.thompson@email.com',
      legalIssue: 'Criminal Law',
      caseDescription: 'I was arrested for DUI last month. This is my first offense and I\'m very concerned about the impact on my career. I need someone who can help minimize the consequences and potentially get the charges reduced.',
      location: 'Chicago, IL',
      urgency: 'HIGH',
      estimatedDuration: '1-3 months',
      compensationMin: 1500,
      compensationMax: 3000,
      tags: JSON.stringify(['dui', 'first-offense', 'criminal']),
      status: 'POSTED',
    },
    {
      clientName: 'Lisa Wang',
      clientEmail: 'lisa.wang@email.com',
      legalIssue: 'Contract Law',
      caseDescription: 'I signed a contract with a vendor for my small business, but they\'ve failed to deliver on their promises. The contract has specific performance clauses that they\'ve violated. I need help enforcing the contract or getting compensation.',
      location: 'Seattle, WA',
      urgency: 'LOW',
      estimatedDuration: '2-5 months',
      compensationMin: 2500,
      compensationMax: 7000,
      tags: JSON.stringify(['contract-enforcement', 'business', 'vendor-dispute']),
      status: 'POSTED',
    },
  ];

  for (const caseData of cases) {
    await prisma.legalCase.create({
      data: {
        ...caseData,
        caseHistory: {
          create: {
            action: 'CREATED',
            description: 'Case was created and posted',
          },
        },
      },
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 