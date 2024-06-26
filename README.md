# PERN Todo App

This is a simple Todo application built with the PERN stack (PostgreSQL, Express, React, Node.js).

## Features

- Create new tasks
- Delete tasks
- Edit tasks
- Mark tasks as completed

## Installation

### Prerequisites

Make sure you have Node.js and PostgreSQL installed on your machine.

### PostgreSQL Setup

1. Install PostgreSQL on your machine.
   - For Linux: [PostgreSQL Installation Guide](https://www.postgresql.org/download/linux/)
   - For macOS: [PostgreSQL Installation Guide](https://www.postgresql.org/download/macosx/)
   - For Windows: [PostgreSQL Installation Guide](https://www.postgresql.org/download/windows/)

2. Create a new PostgreSQL database for the Todo app.

3. Set up a `.env` file in the root directory with your PostgreSQL credentials:

DB_USER=your_postgres_username,
DB_PASSWORD=your_postgres_password,
DB_HOST=your_postgres_host,
DB_PORT=your_postgres_port,
DB_DATABASE=your_postgres_database_name,


### Backend Setup

1. Clone this repository.

2. Navigate to the backend folder:
    cd backend
3. Install Dependencies:
    npm install
4. Start the backend server:
    npm run dev


The backend server should now be running on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend folder:
    cd frontend
2. Install Dependencies:
    npm install
3. Start the backend server:
    npm run dev
    
The React app should now be running on http://localhost:3000.

## Usage

- Open the app in your browser.
- Add new tasks using the create button on navbar.
- Click on check mark to mark them as completed.
- Delete tasks using the delete button.
- Edit tasks by clicking on them and modifying the text.

## Styling

This application uses Tailwind CSS for styling to ensure a responsive and modern user interface.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
