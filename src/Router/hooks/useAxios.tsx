import {useEffect,useState} from 'react';
import axios, { AxiosError } from 'axios'
export default function useAxiosFetch(dataUrl:string){
    let [data,setData]=useState([]);
    let [fetchError,setFeatchError]=useState<AxiosError|null>(null)
    let [isLoading,setIsloading]=useState(false);
    useEffect(()=>{
        let isMounted=true;
        let source=axios.CancelToken.source();
        async function fetchData(url:string){
            setIsloading(true);
            try{
                let response =await axios.get(url,{
                    cancelToken:source.token
                });
                if(isMounted){  
                    setData(response.data);
                    setFeatchError(null);
                }
            }
            catch(err:any){
                if(isMounted){
                    setFeatchError(err);
                    setData([]);
                }
            }
            finally{
                isMounted&&setTimeout(() => {
                    setIsloading(false);
                }, 2000);
            }
            return ()=>{{
                isMounted=false;
                source.cancel();
            }};
        }
        fetchData(dataUrl);
    },[dataUrl])
    return {data,fetchError,isLoading}
}
