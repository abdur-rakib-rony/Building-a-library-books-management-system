import axios from "axios";
import { Book, BookFormData } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/books";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBook = async (id: string): Promise<Book | undefined> => {
  try {
    const response = await axios.get<Book>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createBook = async (
  bookData: BookFormData
): Promise<Book | undefined> => {
  try {
    const response = await axios.post<Book>(`${API_URL}`, bookData);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const updateBook = async (
  id: string,
  bookData: Partial<BookFormData>
): Promise<Book | undefined> => {
  try {
    const response = await axios.patch<Book>(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const deleteBook = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
