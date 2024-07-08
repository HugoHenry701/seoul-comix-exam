This is a [Seoul Comix](https://nextjs.org/) exam project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Setup

First, install packages:

```bash
yarn
```

Second, copy env file

```bash
cp -rf .env.development.sample .env
```

Third, install infrastructure (database Postgres)

```bash
docker-compose up -d database
```

Fourth, migrate the database

```bash
yarn prisma:migrate-dev
```

Finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

My answer for the exam is starting at [http://localhost:3000/restaurant](http://localhost:3000/restaurant) , please check it. The homepage is just for demo.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy application

Run the docker compose for all deployment:

```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The deployment is running with .env.production.sample, you can modify it for specific environment.

**------ Thank you -------**
