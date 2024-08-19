## Getting Started

1. Install all dependencies
```bash
npm install
```

2. Create a `.env.local` file in the server directory and add in the firebase config data to connect to firebase : 
```
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx
FIREBASE_MESSAGING_SENDER_ID=xxx
FIREBASE_APP_ID=xxx

```
- Client-Side (if needed): If any of these variables are also needed on the client side, you'll need to duplicate them with the VITE_ prefix and place them in the .env file:
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```
This way, your server-side environment variables remain secure, while the client-side variables are correctly exposed using Vite's import.meta.env method if needed.
In Server-side make use of `dotenv` package and make sure to import config.js and use `process.env.FIREBASE_*` when needed.

Contact any of the maintainers for the contents of the `.env.local` file

Then, run in the client folder terminal:

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

You can start contributing by creating your own branch and raising a PR ;)
