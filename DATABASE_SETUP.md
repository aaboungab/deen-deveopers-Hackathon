# Database Setup Guide

## Prisma Configuration

This project uses Prisma with MySQL for the database. Follow these steps to set up the database:

### 1. Environment Variables

Create a `.env` file in the root directory with the following content:

```env
DATABASE_URL="mysql://username:password@localhost:3306/unseen"
```

Replace `username` and `password` with your actual MySQL credentials.

### 2. Database Setup

1. **Install MySQL** if you haven't already
2. **Create a database** named `unseen`
3. **Update the DATABASE_URL** in your `.env` file with your actual credentials

### 3. Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run db:seed

# Open Prisma Studio (optional)
npx prisma studio
```

### 4. Database Schema

The schema includes the following main tables:

- **LegalCase**: Stores all legal case information
- **Attachment**: Stores file attachments for cases
- **CaseHistory**: Tracks case status changes and actions
- **LegalProfessional**: Stores legal professional profiles

### 5. Sample Data

The seed script will create 5 sample legal cases covering different areas:
- Family Law (Divorce)
- Employment Law (Wrongful Termination)
- Property Law (Inheritance Dispute)
- Criminal Law (DUI)
- Contract Law (Business Dispute)

### 6. API Endpoints

- `GET /api/cases` - Get all posted cases
- `POST /api/cases` - Create a new case
- `GET /api/cases/[id]` - Get a specific case
- `PUT /api/cases/[id]` - Update a case
- `DELETE /api/cases/[id]` - Delete a case 