import React from "react";

type Props = {};

export default function Footer({}: Props) {
    let today=new Date();
    return <footer className="Footer">
        <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
}
