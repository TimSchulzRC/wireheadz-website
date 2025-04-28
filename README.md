This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [Prismic](https://prismic.io) as its content management system.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can learn more about integrating Prismic with Next.js in the [Prismic and Next.js integration guide](https://prismic.io/docs/technologies/nextjs).

For an deep understanding of how to work with Prismic and Next.js, I recommend watching [this video course](https://youtu.be/Cc37uTnbEos?si=vwGxBIMTCOaWgx4N) on YouTube.

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Using the Vercel CLI

For a more streamlined workflow, you can use the [Vercel CLI](https://vercel.com/docs/cli) to deploy directly from your terminal.

First, install the Vercel CLI globally:

```bash
npm install -g vercel
# or
yarn global add vercel
# or
pnpm add -g vercel
# or
bun install -g vercel
```

Then, log in to your Vercel account:

```bash
vercel login
```

You'll be prompted to enter your email address, and you'll receive a verification link to complete the authentication process.

For more details on CLI authentication, check the [Vercel CLI login documentation](https://vercel.com/docs/cli/login).

To deploy your project to production, navigate to your project directory and run:

```bash
vercel --prod
```

This command builds and deploys your application to the Vercel platform, making it available globally through Vercel's edge network.
