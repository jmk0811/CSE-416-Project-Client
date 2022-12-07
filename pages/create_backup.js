import { useState, useEffect } from "react";
export default function index(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return (
        <div className="min-h-screen bg-bg1">
            <div className={"max-w-[1000px] flex flex-col p-[30px] mx-auto"}>
                <div className={"font-bold text-26"}>Create an event</div>
                <div></div>
            </div>
        </div>
    );
}
