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
			if (user != null && Object.keys(user).length !== 0) {
				setLogin(true);
				setCurrUser(user);
			} else {
				setLogin(false);

				setCurrUser({});
			}
		});
	}, [login]);

	return (
		<div className="bg-white text-black">
			<Header login={login} setLogin={setLogin} currUser={currUser} />

			<main className="min-h-screen">
				<div className="w-full min-h-screen mx-auto">
					<Component {...pageProps} login={login} setLogin={setLogin} setCurrUser={setCurrUser} currUser={currUser} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
