import Feed from "./Feed";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";

export default function Home() {
    let { searchResult,fetchError,isLoading }=useContext(DataContext);
    return (
        <main className="Home">
            {isLoading&& <p className="statusMessage"> Loading posts...</p>}
            {fetchError&&<p className="statusMessage" style={{color:'red'}}>{fetchError.cause?.message}</p>}
            {!isLoading&&!fetchError&&(searchResult.length? <Feed posts={searchResult}/>:<p className="statusMessage">No posts to display</p>)}
        </main>
    );
}
