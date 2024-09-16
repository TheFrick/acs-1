import React from 'react'
import { ClipLoader } from "react-spinners";
import '../css/Loading.css';


const Loading = () => {
    return (
        <div className="spinner-container">
            <ClipLoader color="#2a328f" loading={true} size={75} />
        </div>
    )
}

export default Loading
