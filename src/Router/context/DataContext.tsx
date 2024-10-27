import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/post";
import useAxiosFetch from "../hooks/useAxios";
import { PostT } from "../RouterApp";

type Props = {
    children: ReactNode;
};
export const DataContext = createContext<any>(null);
export default function DataProvider({ children }: Props) {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState<PostT[]>([]);
    const [searchResult, setSearchResult] = useState<PostT[]>([]);
    const navigate = useNavigate();
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts");
    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(filteredResults.reverse());
    }, [posts, search]);
    useEffect(() => {
        setPosts(data);
    }, [data]);
    return (
        <DataContext.Provider
            value={{
                api,
                search,
                setSearch,
                searchResult,
                data,
                fetchError,
                isLoading,
                posts,
                setPosts,
                navigate,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
