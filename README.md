# Library Management System

A full-stack Library Management System with a Node.js/Express backend and Next.js frontend. This application allows users to manage a collection of books through CRUD operations (Create, Read, Update, Delete).

## Features

- View all books in the library
- View detailed information about each book
- Add new books to the collection
- Update existing book information
- Remove books from the library
- Responsive design for mobile and desktop

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- RESTful API

### Frontend
- Next.js 14
- TypeScript
- Axios for API calls
- Tailwind CSS for styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- Git

### Installation

1. Clone the repository
   ```
   git clone https://github.com/abdur-rakib-rony/Building-a-library-books-management-system
   cd library-management-system
   ```

2. Set up the backend
   ```
   cd backend
   npm install
   ```

3. Configure environment variables
   - Create a `.env` file in the backend directory
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Set up the frontend
   ```
   cd ../frontend
   npm install
   ```

5. Configure frontend environment variables
   - Create a `.env.local` file in the frontend directory
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

| Method | Endpoint           | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/v1/books     | Get all books              |
| GET    | /api/v1/books/:id | Get a specific book        |
| POST   | /api/v1/books     | Create a new book          |
| PATCH  | /api/v1/books/:id | Update a book              |
| DELETE | /api/v1/books/:id | Delete a book              |

## Data Model

### Book Schema
```javascript
{
  title: String,       // required
  author: String,      // required
  isbn: String,        // required
  publisher: String,   // required
  inStock: Boolean,    // default: true
  createdAt: Date      // default: Date.now
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contact

Contact - [rakib.devatmern@gmail.com](mailto:rakib.devatmern@gmail.com)

Project Link: [https://github.com/abdur-rakib-rony/Building-a-library-books-management-system](https://github.com/abdur-rakib-rony/Building-a-library-books-management-system)