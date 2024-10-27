import React,{useState,useRef,useEffect} from 'react'
export default function StopWatch(){
    let [isRunning,setIsRunning]=useState<boolean>(false)
    let [elapsedTime,setElapsedTime]=useState<number>(0);
    let intervalIdRef=useRef<any>(null);
    let startTimeRef=useRef(0);
    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current=setInterval(() => {
                setElapsedTime(Date.now()-startTimeRef.current);
            }, 10);
        }
        return ()=>{
            clearInterval(intervalIdRef.current);
        }
    },[isRunning])
    function startWatch(){
        setIsRunning(true);
        startTimeRef.current=Date.now()-elapsedTime;
    }
    function stopWatch(){
        setIsRunning(false);
    }
    function resetWatch(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime():string{
        let minutes=Math.floor(elapsedTime/(1000*60)%60).toString();
        let seconds=Math.floor(elapsedTime/(1000)%60).toString();
        let miliseconds=Math.floor((elapsedTime%1000)/10).toString();
        if(minutes.length<2)
            minutes="0"+minutes;
        if(seconds.length<2)
            seconds="0"+seconds;
        if(miliseconds.length<2)
            miliseconds="0"+miliseconds;
        return `${minutes}:${seconds}:${miliseconds}`;
    }
    return (
        <div className='stopWatch'>
            <div className="display">
                {formatTime()}
            </div>
            <div className="controls">
                <button className="startButton" onClick={startWatch}>Start</button>
                <button className="stopButton" onClick={stopWatch}>Stop</button>
                <button className="resetButton" onClick={resetWatch}>Reset</button>
            </div>
        </div>
    )
}
