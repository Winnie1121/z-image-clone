# Z-Image Clone

A modern, minimal AI image generator inspired by Z-Image. Built with Next.js 15, Supabase, and OpenRouter.

## ✨ Features

- 🎨 **Text-to-Image Generation** - Create images from text prompts using DALL-E 3
- 📐 **Multiple Aspect Ratios** - Support for 1:1, 16:9, and 4:3
- 📚 **Generation History** - View all your previously generated images
- 🔐 **Google Authentication** - Secure login with Google OAuth (coming soon)
- 💾 **Cloud Storage** - Images stored in Supabase Storage
- 📱 **Responsive Design** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account
- OpenRouter API key
- Google OAuth credentials (for authentication)

### Installation

1. **Clone and install dependencies**

```bash
cd z-image-clone
pnpm install
```

2. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenRouter AI
OPENROUTER_API_KEY=your-openrouter-api-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

3. **Set up Supabase database**

Run the SQL commands in `supabase-schema.sql` in your Supabase SQL Editor:

- Creates `generations` table
- Sets up Row Level Security (RLS)
- Creates Storage bucket for images

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
z-image-clone/
├── app/
│   ├── page.tsx              # Home page (main workspace)
│   ├── history/              # Generation history page
│   ├── auth/signin/          # Sign in page
│   └── api/
│       ├── generate/         # Image generation API
│       └── history/          # Fetch user history API
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── header.tsx           # Navigation header
│   ├── generator-workspace.tsx  # Main generation interface
│   └── history-grid.tsx     # History grid display
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── openrouter.ts        # OpenRouter API integration
│   └── utils.ts             # Utility functions
└── supabase-schema.sql      # Database schema
```

## 🎯 How It Works

### Image Generation Flow

1. User enters a text prompt
2. Selects aspect ratio (1:1, 16:9, or 4:3)
3. Clicks "Generate Image"
4. Frontend calls `/api/generate`
5. Backend calls OpenRouter API (DALL-E 3)
6. Image URL is returned and displayed
7. (If authenticated) Generation is saved to Supabase

### Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: NextAuth.js + Google OAuth
- **AI Provider**: OpenRouter (DALL-E 3)
- **Deployment**: Vercel

## 🔑 Getting API Keys

### Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy `URL` and `anon public` key

### OpenRouter

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up and create an API key
3. Add credits to your account

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

**Important**: Make sure to add all environment variables in Vercel dashboard.

## 📝 TODO

- [ ] Implement NextAuth.js Google OAuth
- [ ] Save generations to database when user is authenticated
- [ ] Add image download functionality
- [ ] Implement delete generation
- [ ] Add pagination for history
- [ ] Add image upscaling
- [ ] Add prompt enhancement
- [ ] Add dark mode

## 🤝 Contributing

This is a course project. Feel free to fork and modify for your own learning!

## 📄 License

MIT

---

Built with ❤️ for learning purposes
