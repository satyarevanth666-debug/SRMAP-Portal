SRM Portal - Server + Client (scaffold)

This workspace extends your existing static portal with a minimal Express backend (Prisma + PostgreSQL) and a React client skeleton.

Quick start (server):

1. cd server
2. npm install
3. Set DATABASE_URL in server/.env to your Postgres connection
4. npx prisma generate
5. npx prisma db push
6. npm run seed
7. npm run dev

Quick start (client):

1. cd client
2. npm install
3. npm start

Notes:
- I added API routes under `/server/routes` and Prisma schema under `/server/prisma/schema.prisma`.
- Client React pages are in `/client/src/pages` and call APIs under `http://localhost:4000/api`.
- I intentionally did not modify your existing `index.html`, `style.css`, or login/dashboard UI.

Next steps I can do for you on request:
- Implement remaining controllers and routes for all modules
- Add full frontend pages for all modules and connect file uploads
- Add authentication middleware and session handling
