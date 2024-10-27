import React, { FormEvent, useState } from "react";
import { Task } from "./ToDoList";
type Props = {
    list: Task[];
};

export default function SearchPanel({ list }: Props) {
    let [searchVal, setSearchVal] = useState("");
    function handleChange(el: { target: HTMLInputElement }) {
        setSearchVal((p) => el.target.value);
    }
    function hasCommonPrefix(a: string, b: string): boolean {
        if (a.length < b.length || b.trim() === "") return false;
        a = a.toLowerCase();
        b = b.toLowerCase();
        for (let i: number = 0; i < b.length; i++)
            if (a.charAt(i) != b.charAt(i)) return false;
        return true;
    }
    return (
        <>
            <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                }}
            >
                <input
                    type="text"
                    placeholder="Search prefix"
                    value={searchVal}
                    onChange={handleChange}
                />
            </form>
            <ul>
                {list
                    .filter((el) => hasCommonPrefix(el.text, searchVal))
                    .map((el) => (
                        <li key={el.id} style={{ color: "white" }}>
                            {el.text}
                        </li>
                    ))}
            </ul>
        </>
    );
}
