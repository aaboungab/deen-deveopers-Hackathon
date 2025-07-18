# unseen - Legal Service Platform

A modern legal service platform built with Next.js, Prisma, and MySQL that connects clients with legal professionals. The platform features a Palestinian flag-inspired color scheme and provides a seamless experience for case submission and management.

## 🚀 Features

- **User Authentication**: Secure signup and login system for legal professionals
- **Case Management**: Submit and review legal cases with comprehensive details
- **Professional Dashboard**: Legal professionals can review and manage cases
- **Modern UI**: Clean, responsive design with Palestinian flag color scheme
- **Real-time Updates**: Automatic case refresh and status updates
- **Database Integration**: Robust data persistence with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT tokens with bcryptjs
- **Styling**: Tailwind CSS with custom color palette

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (recommended)
- **MySQL** database server
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd deen-deveopers-Hackathon
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using pnpm (recommended)
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/unseen_legal_db"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 4. Database Setup

#### Create MySQL Database

```sql
CREATE DATABASE unseen_legal_db;
CREATE USER 'unseen_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON unseen_legal_db.* TO 'unseen_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 5. Start the Development Server

```bash
# Using npm
npm run dev

# Or using pnpm
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
deen-deveopers-Hackathon/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts               # Database seeding
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   └── cases/        # Case management endpoints
│   │   ├── auth/             # Authentication pages
│   │   ├── cases/            # Case review page
│   │   ├── submit-case/      # Case submission page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   └── ui/               # Reusable UI components
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── styles/
│       └── globals.css       # Global styles
├── public/                   # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Color Scheme

The application uses a Palestinian flag-inspired color palette:

- **Green** (`green-600`, `green-700`): Primary actions, success states
- **Black** (`black`, `gray-800`): Text, borders, secondary actions
- **Red** (`red-600`, `red-700`): Danger/delete actions, urgent states
- **White** (`white`): Backgrounds, contrast text

## 🔐 Authentication

The platform uses JWT-based authentication:

- **Signup**: Legal professionals can create accounts
- **Login**: Secure authentication with password hashing
- **Session Management**: JWT tokens stored in localStorage and cookies
- **Route Protection**: Client-side authentication checks

## 📊 Database Schema

### Key Models

- **LegalProfessional**: Legal service providers
- **LegalCase**: Submitted legal cases
- **Attachment**: File attachments for cases
- **CaseHistory**: Case status and action history

### Case Status Flow

1. **DRAFT** → Initial case creation
2. **POSTED** → Case submitted and available for review
3. **ASSIGNED** → Case assigned to a legal professional
4. **IN_PROGRESS** → Case being worked on
5. **COMPLETED** → Case resolved
6. **CANCELLED** → Case cancelled

## 🚀 Usage

### For Clients

1. **Submit a Case**: Navigate to `/submit-case`
2. **Fill Case Details**: Provide comprehensive case information
3. **Submit**: Case is posted for legal professional review

### For Legal Professionals

1. **Sign Up/Login**: Create account or sign in
2. **Review Cases**: Browse available cases at `/cases`
3. **Accept Cases**: Review and accept cases of interest
4. **Manage Cases**: Track case progress and updates

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run migrations
npx prisma generate  # Generate Prisma client

# Linting
npm run lint         # Run ESLint
```

### API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/cases` - Fetch all cases
- `POST /api/cases/submit` - Submit new case

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check DATABASE_URL in `.env.local`
   - Ensure database and user exist

2. **Prisma Migration Issues**
   ```bash
   npx prisma migrate reset
   npx prisma migrate dev
   ```

3. **Port Already in Use**
   - Change port in `package.json` scripts
   - Or kill process using port 3000

4. **JWT Token Issues**
   - Regenerate JWT_SECRET in `.env.local`
   - Clear browser localStorage

### Environment Variables

Ensure all required environment variables are set:

```bash
# Required
DATABASE_URL=
JWT_SECRET=

# Optional
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Prisma
- Palestinian flag-inspired design
- Modern web development best practices

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Made with ❤️ for the legal community**
