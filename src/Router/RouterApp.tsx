import {
    memo,
    useMemo,
    useState,
    useEffect,
    FormEvent,
    useContext,
} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import NewPosts from "./NewPosts";
import EditPosts from "./EditPosts";
import { Route, Routes } from "react-router-dom";
import "./router.css";
import DataProvider from "./context/DataContext";
export interface PostT {
    id: string;
    title: string;
    body: string;
}
export default function RouterApp() {
    return (
        <div className="App">
            <Header title="React TSX BLog" />
            <DataProvider>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post" element={<NewPosts />} />
                    <Route path="/edit/:id" element={<EditPosts />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Missing />} />
                </Routes>
            </DataProvider>
            <Footer />
        </div>
    );
}
