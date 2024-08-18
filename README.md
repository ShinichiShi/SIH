## Getting Started

1. Install all dependencies
```bash
npm install
```

2. Create a `.env.local` file in the root directory and add in the firebase config data to connect to firebase : 
```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx
```

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
