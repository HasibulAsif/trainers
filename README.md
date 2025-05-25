# Trainer Marketplace

A Next.js application for connecting trainers with clients.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Netlify

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Add the following environment variables in Netlify's site settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Set the build command to `npm run build`
5. Set the publish directory to `.next`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
