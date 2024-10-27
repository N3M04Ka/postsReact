import useWindowSize from "./hooks/useWindowSize";
type Props = {
    title: string;
};

export default function Header({ title }: Props) {
    let {width}=useWindowSize();
    return (
        <header className="Header">
            <h1>{title}</h1>
            {width<768?<h3>Mobilewidth</h3>:width<992? <h3>TableApp</h3>:<h3>PcApp</h3> }
            <h3>{width}px</h3>
        </header>
    );
}
