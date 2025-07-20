// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { prisma } from '@/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       specialization,
//       yearsOfExperience,
//       location,
//     } = body;

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password || !yearsOfExperience || !location) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Check if email already exists
//     const existingUser = await prisma.legalProfessional.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'Email already registered' },
//         { status: 400 }
//       );
//     }



//     // Hash password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create new legal professional
//     const newProfessional = await prisma.legalProfessional.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         phone,
//         password: hashedPassword,
//         specialization: specialization ? JSON.stringify(specialization) : null,
//         yearsOfExperience,
//         location,
//         isAvailable: true,
//         isVerified: true, // Auto-verified for now
//       },
//     });

//     // Remove password from response
//     const { password: _, ...userWithoutPassword } = newProfessional;

//     return NextResponse.json(
//       { 
//         message: 'Account created successfully',
//         user: userWithoutPassword 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating account:', error);
//     return NextResponse.json(
//       { error: 'Failed to create account' },
//       { status: 500 }
//     );
//   }
// } 



import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { Tag } from '@prisma/client';

// Helper function to convert frontend specialization to Tag enum
function convertToTagEnum(specialization: string): Tag | null {
  const mapping: { [key: string]: Tag } = {
    'Family Law': Tag.FAMILY_LAW,
    'Criminal Law': Tag.CRIMINAL_LAW,
    'Civil Law': Tag.CIVIL_LAW,
    'Employment Law': Tag.EMPLOYMENT_LAW,
    'Property Law': Tag.PROPERTY_LAW,
    'Real Estate Law': Tag.PROPERTY_LAW, // Map to Property Law
    'Contract Law': Tag.CONTRACT_LAW,
    'Immigration Law': Tag.IMMIGRATION_LAW,
    'Corporate Law': Tag.CONTRACT_LAW, // Map to Contract Law
    'Tax Law': Tag.CONTRACT_LAW, // Map to Contract Law
    'Intellectual Property': Tag.CONTRACT_LAW, // Map to Contract Law
    'Environmental Law': Tag.CIVIL_LAW, // Map to Civil Law
    'Bankruptcy Law': Tag.CIVIL_LAW, // Map to Civil Law
    'Personal Injury': Tag.CIVIL_LAW, // Map to Civil Law
    'Other': Tag.OTHER,
    // Also handle the enum values directly
    'FAMILY_LAW': Tag.FAMILY_LAW,
    'CRIMINAL_LAW': Tag.CRIMINAL_LAW,
    'CIVIL_LAW': Tag.CIVIL_LAW,
    'EMPLOYMENT_LAW': Tag.EMPLOYMENT_LAW,
    'PROPERTY_LAW': Tag.PROPERTY_LAW,
    'CONTRACT_LAW': Tag.CONTRACT_LAW,
    'IMMIGRATION_LAW': Tag.IMMIGRATION_LAW,
    'OTHER': Tag.OTHER,
  };
  
  return mapping[specialization] || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userType, // 'professional' or 'client'
      firstName,
      lastName,
      email,
      phone,
      password,
      specialization,
      yearsOfExperience,
      location,
    } = body;

    if (!userType || !['professional', 'client'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    if (!firstName || !lastName || !email || !password || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email exists in either model
    const existingProfessional = await prisma.legalProfessional.findUnique({ where: { email } });
    const existingClient = await prisma.legalClient.findUnique({ where: { email } });

    if (existingProfessional || existingClient) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (userType === 'professional') {
      if (!yearsOfExperience || !specialization) {
        return NextResponse.json({ error: 'Missing professional fields' }, { status: 400 });
      }

      // Convert specialization to proper Tag enum value
      let tagValue;
      if (Array.isArray(specialization)) {
        // If it's an array, take the first value
        const firstSpecialization = specialization[0];
        tagValue = convertToTagEnum(firstSpecialization);
      } else {
        tagValue = convertToTagEnum(specialization);
      }

      if (!tagValue) {
        return NextResponse.json({ error: 'Invalid specialization' }, { status: 400 });
      }

      const professional = await prisma.legalProfessional.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          location,
          specialization: tagValue,
          yearsOfExperience,
          isAvailable: true,
          isVerified: true,
        },
      });

      const { password: _, ...userWithoutPassword } = professional;
      return NextResponse.json(
        { message: 'Professional account created', user: userWithoutPassword },
        { status: 201 }
      );
    } else {
      const client = await prisma.legalClient.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          location,
        },
      });

      const { password: _, ...userWithoutPassword } = client;
      return NextResponse.json(
        { message: 'Client account created', user: userWithoutPassword },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
