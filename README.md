# Beavr Backend Test

## Instructions
Follow these steps to set up and run the Beavr backend project:

### 1. Clone the Repository
Clone the project repository to your local machine:

```bash
git clone https://github.com/cordlesstuba/beavr-backend
```

### 2. Navigate to the Project Root
Move into the project directory:

```bash
cd beavr-backend
```

### 3. Install Dependencies
Install all project dependencies:

```bash
pnpm install
```


### 4. Start the PostgreSQL Database
Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

### 5. Apply Database Migrations
Run Prisma to apply the database migrations:

```bash
npx prisma migrate dev
```

### 6. Generate Prisma Client
Generate the Prisma client:

```bash
npx prisma generate
```

### 7. Seed the Database
Seed the database with initial data:

```bash
npx prisma db seed
```

### 8. Start the Development Server
Start the backend development server:

```bash
pnpm run dev
```

### 9. Access the Application
The application will be available at:
[http://localhost:3000](http://localhost:3000)

### 10. Access the Hosted Version
If you prefer not to run the project locally, a hosted version is available at:  
[https://beavr-backend.vercel.app/](https://beavr-backend.vercel.app/)


---

## Demo Video
For a quick walkthrough, watch the demo video below:

[![Beavr Backend Demo](https://img.youtube.com/vi/1_5CshdZ4Jo/0.jpg)](https://youtu.be/1_5CshdZ4Jo)
Click on the thumbnail or [here](https://youtu.be/1_5CshdZ4Jo) to view the video.

---

You are now ready to work on the Beavr backend test project. 🚀