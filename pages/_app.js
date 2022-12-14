import "../styles/globals.css";
import { useState, useEffect } from "react";
import Header from "../components/container/Header";
import Footer from "../components/container/Footer";
import { getCurrentUserAPIMethod } from "../api/client";

export default function MyApp({ Component, pageProps }) {
	const [login, setLogin] = useState(false);
	const [currUser, setCurrUser] = useState({});

	useEffect(() => {
		getCurrentUserAPIMethod().then((user) => {
			console.log(`login user: ${user?.email}`);
			console.log(`user type: ${user?.type}`);
			console.log(user);
			if (user != null && Object.keys(user).length !== 0) {
				setLogin(true);
				setCurrUser(user);
			} else {
				setLogin(false);
				// console.log(login)
				setCurrUser({});
				// console.log(currUser)
			}
		})
	}, [login]);

	return (
		<div className="bg-white text-black">
			<Header login={login} setLogin={setLogin} currUser={currUser} />

			<main className="min-h-screen">
				<div className="w-full min-h-screen mx-auto">
					<Component {...pageProps} login={login} setLogin={setLogin} currUser={currUser} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
