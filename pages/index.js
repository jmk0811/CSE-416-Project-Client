import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/container/header";
import Footer from "../components/container/footer";

export default function Home() {
	const [login, setLogin] = useState(false);

	return (
		<div className="">
			<Header login={login} setLogin={setLogin} />

			<main className={styles.main}>
				<div className={"w-full mx-auto max-w-[1400px]"} />
			</main>

			<Footer />
		</div>
	);
}
