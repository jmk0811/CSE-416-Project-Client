import {useEffect, useState} from "react";
import SignUp from "../../components/SignUp";

export default function Index(props) {
    return (
        <div className="">
            <SignUp login={props.login} setLogin={props.setLogin} />
        </div>
    );
}
