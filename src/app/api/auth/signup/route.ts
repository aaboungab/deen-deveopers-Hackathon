import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      specialization,
      yearsOfExperience,
      location,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !yearsOfExperience || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.legalProfessional.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }



    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new legal professional
    const newProfessional = await prisma.legalProfessional.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        specialization: specialization ? JSON.stringify(specialization) : null,
        yearsOfExperience,
        location,
        isAvailable: true,
        isVerified: true, // Auto-verified for now
      },
    });

    // Remove password from response
    const { password: _unused, ...userWithoutPassword } = newProfessional;

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 