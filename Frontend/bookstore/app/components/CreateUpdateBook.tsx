import Modal from "antd/es/modal/Modal";
import { BookRequest } from "../services/books";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";

interface Props {
    mode: Mode;
    value: Book,
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, requst: BookRequest) => void;
}

export enum Mode {
    Create,
    Edit
}

export const CreateUpdateBook = ({
    mode,
    value,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setTitle(value.title);
        setDescription(value.description);
        setPrice(value.price);
    }, [value]);

    const handleOk = async () => {
        const bookRequest = { title, description, price };
    
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        mode === Mode.Create 
            ? handleCreate(bookRequest) 
            : handleUpdate(value.id, bookRequest);
    }

    return (
        <Modal
            title={mode === Mode.Create ? "Add book" : "Edit book"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={"Отмена"}
        >
            <div className="book__modal">
                <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название"
                />
                <Input 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                />
                <Input 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                />
            </div>
        </Modal>
    )
}