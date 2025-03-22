"use client";
import { createBook } from "@/lib/api";
import Link from "next/link";
import { BookFormData } from "@/types";
import BookForm from "@/app/components/BookForm";

export default function AddBook() {
  const handleSubmit = async (formData: BookFormData) => {
    return await createBook(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Book</h1>

      <BookForm onSubmit={handleSubmit} />

      <div className="mt-4">
        <Link href="/books" className="text-blue-600">
          Back
        </Link>
      </div>
    </div>
  );
}
