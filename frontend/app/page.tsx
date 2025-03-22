import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Books management system</h1>
      <Link
        href="/books"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        View All Books
      </Link>
    </div>
  );
}
