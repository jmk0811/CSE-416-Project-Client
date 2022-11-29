import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginUserAPIMethod } from "../api/client";

export default function Login(props) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const router = useRouter();

	const login = (e) => {
		e.preventDefault();
		const userInfo = { email, password };
		loginUserAPIMethod(userInfo).then((status) => {
			console.log(status);
			if (status) {
				setError("");
				props.setLogin(true);
				router.push("/");
			} else {
				setError("login failed");
				props.setLogin(false);
			}
		});
	};

	return (
		<div className="">
			<div>
				<label>ID</label>
				<input className="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div>
				<label>Password</label>
				<input className="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<button onClick={login}>Login</button>
		</div>
	);
}
