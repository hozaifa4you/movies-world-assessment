# Movies World

**Live URL**

- [Live](https://movies-world-assessment.vercel.app)
- [Github](https://github.com/hozaifa4you/movies-world-assessment)

**Demo Credentials**
Admin

```json
{
  "email": "admin@movieswrold.com",
  "password": "11223344"
}
```

**Features**

- Fully dynamic homepage
- Admin can create actors
- Admin can create movies
- User can show movies
- User can rate movies
- Fully dynamic movies page with search, short, filter
- Role based access control
- Backend with nestjs
- File (poster) saved on GCP Storage
- Server Action for Form submit
- JWT based authentication
- Highly form validation
- 8+ pages
- 4+ NestJs modules
- Server Components & Client Components
- Drizzle-ORM for database query
- Password jwt for backend authentication and authorization
- Fully TypeScript with proper type-safety, 0 JavaScript

## Setup

**Backend**

- Fill the .env file with necessary data. E.g. on `.env.example`
- Need to have a GCP Service account JSON config file name must be `gcp-storage.config.json`
- Install dependency `pnpm install`
- Build `pnpm build`
- Start Server `pnpm start:prod`

**Frontend**

- Fill the .env. example on .env.example
- Install Necessity dependency `pnpm install`
- Build `pnpm build`
- Start App `pnpm start`

\*_Successfully_ Will run the application

**Routes**

Public

- `/` Home (public)
- `/signup`
- `/signin`
- `/movies`

Admin

- `/control-panel/actors`
- `/control-panel/actors/new`
- `/control-panel/movies`
- `/control-panel/movies/new`

[Example](https://tinyurl.com/28b4q87n)
