import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Nav() {
    let { search, setSearch }=useContext(DataContext);
    return (
        <nav className="Nav">
            <form
                action=""
                className="searchForm"
                onSubmit={(e) => e.preventDefault()}
            >
                <label htmlFor="search">Search Posts</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e: { target: HTMLInputElement }) =>
                        setSearch(e.target.value)
                    }
                />
            </form>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}
