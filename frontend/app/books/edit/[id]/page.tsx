"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBook, updateBook } from "@/lib/api";
import { Book, BookFormData } from "@/types";
import BookForm from "@/app/components/BookForm";

export default function EditBook() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const id = params.id as string;
        const data = await getBook(id);
        setBook(data ?? null);
      } catch (err) {
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadBook();
    }
  }, [params.id]);

  const handleSubmit = async (formData: BookFormData) => {
    const id = params.id as string;
    return await updateBook(id, formData);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !book) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error || "Book not found"}
        </div>
        <Link href="/books" className="text-blue-600">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Edited book title: {book.title}
      </h1>

      <BookForm book={book} onSubmit={handleSubmit} />

      <div className="mt-4">
        <Link href="/books" className="text-blue-600">
          Back
        </Link>
      </div>
    </div>
  );
}
