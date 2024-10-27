import React, { MutableRefObject, useRef, useState } from "react";

type Props = {};

export default function TextToColorApp({}: Props) {
    let [color, setColor] = useState("");
    let countRef=useRef<ReturnType<typeof setTimeout>|null>(0);
    function handleInputChange(e: {target:HTMLInputElement}) {
        if(countRef.current!=null)
            clearTimeout(countRef.current);
        countRef.current=setTimeout(() => {
            setColor(e.target.value);
        }, 1000);
    }
    return (
        <>
            <div style={{backgroundColor:color,width:"400px",height:"400px",display:"flex",alignItems:"center",justifyContent:"space-around",borderRadius:"8%"}}>
                <span style={{fontSize:"3rem"}}>{color==""? "Empty Value":color}</span>
            </div>

            <input
                type="text"
                placeholder="Input Color"
                onChange={handleInputChange}
                style={{display:"block",margin:" 10px auto"}}
            ></input>
        </>
    );
}
