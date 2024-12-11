"use client";

import Button from "antd/es/button/button";
import { Books } from "../components/Books";
import { useEffect, useState } from "react";
import { BookRequest, createBook, deleteBook, getAllBooks, updateBook } from "../services/books";
import Title from "antd/es/typography/Title";
import { CreateUpdateBook, Mode } from "../components/CreateUpdateBook";

export default function BooksPage() {
    const defaultBook = {
        title: "",
        description: "",
        price: 0,
    } as Book;

    const [value, setValue] = useState<Book>(defaultBook);

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getBooks = async () => {
            const books = await getAllBooks();
            setLoading(false);
            setBooks(books);
        };

        getBooks();
    }, []);

    const handleCreateBook = async (request: BookRequest) => {
        await createBook(request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    const handleUpdateBook = async (id: string, request: BookRequest) => {
        await updateBook(id, request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }


    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setValue(defaultBook);
        setIsModalOpen(false);
    }


    const openEditModal = (book: Book) => {
        setMode(Mode.Edit);
        setValue(book);
        setIsModalOpen(true);
    }

    return (
        <div>
            <Button
                type="primary"
                style={{ marginTop: "30px" }}
                size="large"
                onClick={openModal}
            > 
            Create book 
            </Button>

            <CreateUpdateBook
                mode={mode}
                value={value}
                isModalOpen={isModalOpen}
                handleCreate={handleCreateBook}
                handleUpdate={handleUpdateBook}
                handleCancel={closeModal}
            />

            {loading ? (
                <Title>Loading books...</Title>) 
                : 
                <Books 
                    books={books} 
                    handleOpen={openEditModal}
                    handleDelete={handleDeleteBook}
                />}
        </div>
    )
}