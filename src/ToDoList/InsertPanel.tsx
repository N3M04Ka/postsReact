import React, { FormEvent, FormEventHandler, useState } from "react";
import { Task } from "./ToDoList";
import apiRequest from "../ApiRequest";
type Props = {
    list: Task[];
    setList: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function InsertPanel({ list, setList }: Props) {
    let API_URL = "http://localhost:3500/items"
    let [val, setVal] = useState("");
    function handleChangeInput(e: { target: HTMLInputElement }) {
        setVal(e.target.value);
    }
    async function handleSubmitInput(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let newItem: Task = {
            id: (list.length + 1).toString(),
            text: val,
            isComplete: false,
        };
        if (val.trim() !== "") {
            setList((list: Task[]) => [...list, newItem]);
            setVal("");
        }
        let postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        };
        let result= await apiRequest(API_URL,postOptions);
    }
    return (
        <>
            <form onSubmit={handleSubmitInput}>
                <input
                    type="text"
                    placeholder="InputText"
                    value={val}
                    onChange={handleChangeInput}
                />
            </form>
            <h1>{val}</h1>
        </>
    );
}
