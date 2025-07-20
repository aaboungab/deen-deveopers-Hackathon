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



// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { prisma } from '@/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const {
//       userType, // 'professional' or 'client'
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       specialization,
//       yearsOfExperience,
//       location,
//     } = body;

//     if (!userType || !['professional', 'client'].includes(userType)) {
//       return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
//     }

//     if (!firstName || !lastName || !email || !password || !location) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Check if email exists in either model
//     const existingProfessional = await prisma.legalProfessional.findUnique({ where: { email } });
//     const existingClient = await prisma.legalClient.findUnique({ where: { email } });

//     if (existingProfessional || existingClient) {
//       return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     if (userType === 'professional') {
//       if (!yearsOfExperience || !specialization) {
//         return NextResponse.json({ error: 'Missing professional fields' }, { status: 400 });
//       }

//       const professional = await prisma.legalProfessional.create({
//         data: {
//           firstName,
//           lastName,
//           email,
//           phone,
//           password: hashedPassword,
//           location,
//           specialization: specialization,
//           yearsOfExperience,
//           isAvailable: true,
//           isVerified: true,
//         },
//       });

//       const { password: _, ...userWithoutPassword } = professional;
//       return NextResponse.json(
//         { message: 'Professional account created', user: userWithoutPassword },
//         { status: 201 }
//       );
//     } else {
//       const client = await prisma.legalClient.create({
//         data: {
//           firstName,
//           lastName,
//           email,
//           phone,
//           password: hashedPassword,
//           location,
//         },
//       });

//       const { password: _, ...userWithoutPassword } = client;
//       return NextResponse.json(
//         { message: 'Client account created', user: userWithoutPassword },
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error('Signup error:', error);
//     return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.error('Received body:', body);

    const {
      userType,
      firstName,
      lastName,
      email,
      phone,
      password,
      specialization,
      yearsOfExperience,
      location,
    } = body;

    // Basic validations
    if (!userType || !['professional', 'client'].includes(userType)) {
      console.error('Invalid userType:', userType);
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    if (!firstName || !lastName || !email || !password || !location) {
      console.error('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existingProfessional = await prisma.legalProfessional.findUnique({ where: { email } });
    const existingClient = await prisma.legalClient.findUnique({ where: { email } });

    if (existingProfessional || existingClient) {
      console.error('Email already exists:', email);
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.error('Password is hashed');

    if (userType === 'professional') {
      if (!yearsOfExperience || !specialization) {
        console.error('Missing professional-specific fields');
        return NextResponse.json({ error: 'Missing professional fields' }, { status: 400 });
      }

      const professional = await prisma.legalProfessional.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          location,
          specialization,
          yearsOfExperience,
          isAvailable: true,
          isVerified: true,
        },
      });

      console.error('Professional created:', professional.id);
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

      console.error('Client created:', client.id);
      const { password: _, ...userWithoutPassword } = client;
      return NextResponse.json(
        { message: 'Client account created', user: userWithoutPassword },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error('Signup error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
