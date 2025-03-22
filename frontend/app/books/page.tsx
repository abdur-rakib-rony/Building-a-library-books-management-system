"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks, deleteBook } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Book } from "@/types";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        router.refresh();
        const updatedBooks = await getBooks();
        setBooks(updatedBooks);
      } catch (err) {
        console.error(err);
        alert("Failed to delete book");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books</h1>
        <Link
          href="/books/add"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-center py-4">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">ISBN</th>
                <th className="py-2 px-4 text-left">Publisher</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    <Link
                      href={`/books/${book._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.isbn}</td>
                  <td className="py-2 px-4">{book.publisher}</td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        book.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link
                        href={`/books/edit/${book._id}`}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
