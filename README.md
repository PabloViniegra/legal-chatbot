# LexIA - Legal AI Assistant for Spanish Legislation

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=for-the-badge&logo=prisma)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)

**An intelligent chatbot specialized in Spanish legal consultations, powered by GPT-4 and built with modern web technologies.**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#documentation) • [License](#license)

</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

**LexIA** is a sophisticated legal AI assistant designed to provide accurate information and guidance on Spanish legislation. Built with Next.js 15 and powered by OpenAI's GPT-4, it offers an intuitive chat interface where users can ask legal questions and receive comprehensive, context-aware responses.

The application features real-time streaming responses, conversation history management, user authentication, and a beautiful dark/light mode UI with smooth animations.

---

## ✨ Features

### Core Functionality

- 🤖 **AI-Powered Chat**: GPT-4-based conversational interface specialized in Spanish legal matters
- 💬 **Real-time Streaming**: Smooth, token-by-token response streaming for better UX
- 📝 **Conversation Management**: Save, organize, and retrieve past legal consultations
- 🔐 **Authentication**: Secure user authentication via Clerk
- 🎯 **Onboarding Tour**: Interactive guided tour for first-time users using Driver.js

### UI/UX

- 🎨 **Modern Design**: Clean, professional interface built with Radix UI and Tailwind CSS
- 🌓 **Theme Support**: Full dark/light mode with seamless transitions
- ✨ **Smooth Animations**: GSAP-powered animations for enhanced user experience
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- 🎭 **Markdown Support**: Rich text rendering with syntax highlighting

### Technical Excellence

- ⚡ **Performance**: Optimized with Next.js 15 Turbopack for blazing-fast builds
- 🗄️ **Type-Safe Database**: Prisma ORM with PostgreSQL
- 🏗️ **Clean Architecture**: SOLID principles with Repository and Service patterns
- 🧪 **Testing**: Unit tests with Vitest and React Testing Library
- 📊 **Analytics**: Query logging for insights and improvements

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router, React Server Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Motion](https://motion.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown) with [remark-gfm](https://github.com/remarkjs/remark-gfm)

### Backend

- **Runtime**: Node.js with Edge Runtime support
- **Database ORM**: [Prisma 6.16](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Neon)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI/ML**: [OpenAI GPT-4](https://openai.com/)
- **Validation**: [Zod](https://zod.dev/)

### DevOps & Tooling

- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: [ESLint 9](https://eslint.org/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **Build Tool**: Next.js Turbopack

---

## 🏛️ Architecture

LexIA follows a clean, layered architecture based on SOLID principles:

```
┌─────────────────────────────────────────────────┐
│           Presentation Layer (UI)               │
│  Components • Pages • Hooks • Animations        │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│         Business Logic Layer                    │
│  Services • Repositories • Stores               │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│            Data Access Layer                    │
│  Prisma ORM • Database Models                   │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│            PostgreSQL Database                  │
└─────────────────────────────────────────────────┘
```

### Key Design Patterns

- **Repository Pattern**: Centralizes data access and abstracts database queries
- **Service Layer Pattern**: Encapsulates business logic and orchestrates operations
- **Factory Pattern**: Creates AI provider instances flexibly
- **Singleton Pattern**: Ensures single Prisma Client instance
- **Observer Pattern**: Event system for real-time updates

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.17.0
- **pnpm** >= 8.0.0 (recommended) or npm/yarn
- **PostgreSQL** database (or Neon account)
- **OpenAI API Key**
- **Clerk Account** for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/legal-chatbot.git
   cd legal-chatbot
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxx"
CLERK_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxx"

# OpenAI
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxx"

# Optional: Node Environment
NODE_ENV="development"
```

> **Note**: Never commit your `.env` file. It's already included in `.gitignore`.

### Database Setup

1. **Generate Prisma Client**

   ```bash
   pnpx prisma generate
   ```

2. **Run database migrations**

   ```bash
   pnpx prisma migrate dev
   ```

3. **Optional: Seed the database**

   ```bash
   pnpx prisma db seed
   ```

4. **Optional: Open Prisma Studio to view your data**

   ```bash
   pnpx prisma studio
   ```

### Running the Application

#### Development Mode

Start the development server with Turbopack:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Build

```bash
pnpm build
pnpm start
```

#### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

#### Linting

```bash
pnpm lint
```

---

## 📂 Project Structure

```
legal-chatbot/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Prisma schema definition
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/          # React components
│   │   ├── chat/           # Chat-related components
│   │   ├── onboarding/     # Onboarding tour components
│   │   ├── sidebar/        # Sidebar components
│   │   └── ui/             # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and configurations
│   ├── services/            # Business logic services
│   ├── repositories/        # Data access layer (if implemented)
│   ├── stores/              # Zustand state stores
│   ├── animations/          # GSAP animation utilities
│   ├── types/               # TypeScript type definitions
│   └── generated/           # Generated Prisma Client
├── public/                  # Static assets
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

---

## 🎯 Design Patterns

### Repository Pattern

Centralizes database access:

```typescript
// repositories/conversation.repository.ts
export class ConversationRepository {
  async findById(id: string, userId: string): Promise<Conversation | null> {
    return prisma.conversation.findUnique({
      where: { id, userId },
      include: { messages: true },
    });
  }
}
```

### Service Layer Pattern

Encapsulates business logic:

```typescript
// services/conversation.service.ts
export class ConversationService {
  async getUserConversations(userId: string) {
    const conversations = await conversationRepository.findByUserId(userId);
    return conversations.map((conv) => ({
      ...conv,
      preview: conv.messages[0]?.content.substring(0, 100) || "",
    }));
  }
}
```

---

## 🧪 Testing

The project uses Vitest and React Testing Library for testing:

```typescript
// Example test
import { render, screen } from "@testing-library/react";
import { ChatInterface } from "@/components/chat/chat-interface";

describe("ChatInterface", () => {
  it("renders chat input", () => {
    render(<ChatInterface />);
    expect(
      screen.getByPlaceholderText(/escribe tu consulta/i)
    ).toBeInTheDocument();
  });
});
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow SOLID principles
- Use TypeScript strict mode

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Pablo Viniegra Picazo** - _Initial work_ - [GitHub](https://github.com/PabloViniegra)

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for Next.js framework
- Clerk for authentication solution
- Prisma team for the excellent ORM
- The open-source community

---

## 📞 Support

If you have any questions or need help, please:

- Open an [Issue](https://github.com/PabloViniegra/legal-chatbot/issues)
- Contact: your.email@example.com

---

<div align="center">

**Made with ❤️ and ☕ by [Your Name]**

⭐ Star this repository if you find it helpful!

</div>
