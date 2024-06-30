# Medicare

This project is a clone of the Vezeeta platform, implemented using NestJS for the backend and React TypeScript for the frontend. Vezeeta is a healthcare platform that allows users to book appointments with doctors, and access a wide range of healthcare services.

## Features

- User authentication and authorization
- Booking and managing doctor appointments
- Doctor profiles and reviews
- User profile management

## Technologies Used

- Backend: NestJS
- Frontend: React with TypeScript
- Database: MongoDB
- Styling: Tailwind & CSS

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation


### Backend (NestJS)
1. Clone the repository:
   ```bash
   npm install
   git clone https://github.com/Ahmed10257/Medical-Care-System
   cd Medical-Care-System/Back-End
   ```

2. Install the dependencies:
   ```bash
   npm install
   git clone https://github.com/Ahmed10257/Medical-Care-System
   cd Medical-Care-System/Back-End
   ```

<!-- 3. Create a `.env` file in the `Back-End` directory and add the following environment variables:
   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/vezeeta-clone
   JWT_SECRET=your_jwt_secret_key
   ``` -->

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend server should now be running at `http://localhost:3000`.

### Frontend (React TypeScript)

1. Navigate to the Front-End directory:
   ```bash
   cd ../Front-End
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

<!-- 3. Create a `.env` file in the `frontend` directory and add the following environment variables:
   ```plaintext
   REACT_APP_API_URL=http://localhost:3000/
   ``` -->

4. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend application should now be running at `http://localhost:3000`.

## Running the Application

1. Make sure MongoDB is running on your local machine or in a Docker container.

2. Start the backend server:
   ```bash
   cd Back-End
   npm run start:dev
   ```

3. Start the frontend server:
   ```bash
   cd Front-End
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```plaintext
Medical-Care-System/
├── backend/
|   ├── dist/
│   ├── src/
│   │   ├── modules/
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── test/
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    |   ├── assets/
    │   ├── components/
        ├── assets/
    |   ├── config/
    |   ├── contexts/
    |   ├── data/
    |   ├── errors/
    |   ├── hooks/
    |   ├── interfaces/
    │   ├── pages/
    |   ├── router/
    |   ├── types/
    |   ├── utils/
    |   ├── validations/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── index.tsx
    │   └── main.tsx
    ├── public/
    ├── .env
    ├── package.json
    └── tsconfig.json
    └── tailwind.config.js
    └── tsconfig.node.json
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
