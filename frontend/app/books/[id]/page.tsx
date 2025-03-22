'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBook } from '@/lib/api';
import { useParams } from 'next/navigation';
import { Book } from '@/types';

export default function BookDetail() {
  const params = useParams();
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
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadBook();
    }
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !book) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Link href="/books" className="text-blue-600">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-700 mb-4">by {book.author}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">ISBN</p>
            <p className="font-medium">{book.isbn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Publisher</p>
            <p className="font-medium">{book.publisher}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${book.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created</p>
            <p className="font-medium">{new Date(book.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link 
          href="/books" 
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Back
        </Link>
        <Link 
          href={`/books/edit/${book._id}`} 
          className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
        >
          Edit book
        </Link>
      </div>
    </div>
  );
}