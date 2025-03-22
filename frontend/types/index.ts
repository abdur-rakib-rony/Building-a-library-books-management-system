export interface Book {
    _id: string;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    inStock: boolean;
    createdAt: string;
  }
  
  export type BookFormData = Omit<Book, '_id' | 'createdAt'>;