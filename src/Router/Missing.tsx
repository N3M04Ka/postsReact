import React from 'react'
import { Link } from "react-router-dom";
type Props = {

}

export default function Missing({}: Props) {
  return (
    <main className="Missing">
        <h2>Page Not Found</h2>
        <p>Well,that disappointing</p>
        <p>
            <Link to="/">Wisit Our HomePage</Link>
        </p>
    </main>
  )
}
