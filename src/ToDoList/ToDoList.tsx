import React, { useState, useEffect } from "react";
import "../index.css";
import InsertPanel from "./InsertPanel";
import SearchPanel from "./SearchPanel";
import apiRequest from "../ApiRequest";
type Props = {};
import './ToDoList.css'
export interface Task {
    id: string;
    text: string;
    isComplete: boolean;
}
export default function ToDoList({}: Props) {
    let API_URL = "http://localhost:3500/items";
    let [listItems, setListItems] = useState<Task[]>([]);
    useEffect(() => {
        let fetchItems = async () => {
            try {
                let response = await fetch(API_URL);
                if (!response.ok) throw new Error("fail to fetch data");
                let newListItems = await response.json();
                setListItems(newListItems);
            } catch (err) {
                console.log((err as Error).message);
            }
        };
        (async () => await fetchItems())();
    }, []);
    async function handleClick(id: string) {
        let obj:Task[]=listItems.filter(el=>el.id==id);
        setListItems(
            listItems.map((el) => {
                if (el.id == id) {
                    el.isComplete = !el.isComplete;
                }
                return el;
            })
        );
        let updateOptins = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isComplete:obj[0].isComplete}),
        };
        let reqUrl = `${API_URL}/${id}`;
        await apiRequest(reqUrl, updateOptins);
    }
    async function handleDelete(id: string) {
        setListItems(listItems.filter((el) => el.id != id));
        let deleteOptions = {
            method: "DELETE",
        };
        let reqUrl = `${API_URL}/${id}`;
        await apiRequest(reqUrl, deleteOptions);
    }
    return (
        <div>
            <InsertPanel list={listItems} setList={setListItems} />
            <SearchPanel list={listItems} />
            <ul>
                {listItems.map((el) => (
                    <li
                        key={el.id}
                        style={{
                            textDecoration: el.isComplete
                                ? "line-through"
                                : "none",
                        }}
                    >
                        <span onClick={() => handleClick(el.id)}>
                            {el.text}
                        </span>
                        <button onClick={() => handleDelete(el.id)}>D</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
