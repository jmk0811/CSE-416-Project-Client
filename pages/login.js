import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { loginUserAPIMethod } from "../api/client";

export default function Login(props) {
	// const [email, setEmail] = useState();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const router = useRouter();

	const handleClose = () => {
		props.close();
	};

	const login = (e) => {
		e.preventDefault();
		const userInfo = { email, password };
		console.log(userInfo);
		loginUserAPIMethod(userInfo).then((status) => {
			console.log(status);
			if (status) {
				setError("");
				props.setLogin(true);
				//router.push("/");
				handleClose();
			} else {
				setError("login failed");
				props.setLogin(false);
				alert("Invalid email address or password");
			}
		});
	};

	function handleId(e) {
		setEmail(e.target.value);
	}
	function handlePassword(e) {
		setPassword(e.target.value);
	}
	function IsPasswordMatched(e) {
		e.preventDefault();
		console.log("props", props);
		console.log("id", email, "password", password);
	}

	return (
		// <div className="">
		// 	<div>
		// 		<label>ID</label>
		// 		<input className="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
		// 	</div>
		// 	<div>
		// 		<label>Password</label>
		// 		<input className="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
		// 	</div>
		// 	<button onClick={login}>Login</button>
		// </div>

		<div>
			<Dialog open={props.status} onClose={handleClose}>
				<div className="flex">
					<div className="text-[30px]">
						<div className="row-justify-content-center">
							<div className="col-lg-8 min-w-[500px]">
								<div className="p-5 shadow rounded content">
									<h2 className="font-bold font-sans">Sign in</h2>
									<form method="POST" action="#">
										<div>
											<div className="form-group col-md-6">
												<label for="userId" className="text-[15px]">
													ID
												</label>
												<br />
												<input
													type="text"
													name="userId"
													placeholder="Please enter your ID"
													onChange={handleId}
													className="bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"
													required
												/>
											</div>
											<div className="form-group col-md-6">
												<label for="userPassword" className="text-[15px]">
													Password
												</label>
												<br />
												<input
													type="password"
													name="userPassword"
													placeholder="enter your password"
													onChange={handlePassword}
													className="text-left bg-transparent w-full h-[40px] px-10 text-base border-[#4EA1D3] "
													required
												/>
											</div>
										</div>
										<div className="flex flex-col items-center w-full justify-center p-[30px]">
											<div className="bg-[#4EA1D3] w-full rounded">
												<button
													type="submit"
													// onClick={IsPasswordMatched}
													onClick={login}
												>
													<div className="w-[400px] font-sans text-[25px] text-white text-center text-center decoration-8">Login</div>
												</button>
											</div>
											<div onClick={handleClose}>
												<Link href="/signup">
													<a className="text-[14px] ">Don't have account?</a>
												</Link>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
}
