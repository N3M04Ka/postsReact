export default async function apiRequest(url:string="",optionObj:RequestInit|undefined=undefined,errMsg:string|null=null){
    try{
        let response =await fetch(url,optionObj);
        if(!response.ok)
            throw new Error("Fetch error came up");
    }
    catch(err){
        errMsg=(err as Error).message;
    }
    finally{
        return errMsg;
    }
}
