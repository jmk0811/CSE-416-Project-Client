import "../styles/globals.css";
import { useState, useEffect } from "react";
import Header from "../components/container/Header";
import Footer from "../components/container/Footer";
import { getCurrentUserAPIMethod } from "../api/client";

export default function MyApp({ Component, pageProps }) {
	const [login, setLogin] = useState(false);
	const [currUser, setCurrUser] = useState({});
	const [user, setUser] = useState({
		profileImg: "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png",
		name: "abc",
		points: 2,
		type: "user",
		phoneNumber: "0",
		dayOfBirth: "2022-12-01",
		gender: "female",
		interest: ["education"],
		myParticipant: [
			{
				Userid: "1",
				Workid: {
					title: "animal",
					description: "animal volunteer work",
					point: 100,
				},
				ParticipationDate: "2021-01-01",
				Progress: true,
			},
			{
				Userid: "1",
				Workid: {
					title: "animal2",
					description: "animal volunteer work2",
					point: 100,
				},
				ParticipationDate: "2022-11-30",
				Progress: true,
			},
			{
				Userid: "1",
				Workid: {
					title: "animal3",
					description: "animal volunteer work3",
					point: 100,
				},
				ParticipationDate: "2022-05-30",
				Progress: true,
			},
			{
				Userid: "1",
				Workid: {
					title: "animal4",
					description: "animal volunteer work4",
					point: 300,
				},
				ParticipationDate: "2022-12-30",
				Progress: true,
			},
		],
		certificates: [
			{
				certificatesNumber: 0,
				issueDate: "2023-12-1",
				owner: "abc",
				contractAddress: "",
			},
			{
				certificatesNumber: 1,
				issueDate: "2022-8-4",
				owner: "abc",
				contractAddress: "",
			},
			{
				certificatesNumber: 1,
				issueDate: "2022-11-4",
				owner: "abc",
				contractAddress: "",
			},
			{
				certificatesNumber: 1,
				issueDate: "2021-11-2",
				owner: "abc",
				contractAddress: "",
			},
		],
	});
	const [company, setCompany] = useState({
		id: "1",
		name: "company1",
		type: "company",
		profileImg: "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png",
		volunteerWorks: [
			{
				title: "vol1",
				description: "vol1",
				holder: "company1",
				point: 123,
				volunteeringStart: "2022-8-4",
				volunteeringEnd: "2022-10-4",
				workingDays: [
					{
						date: new Date("2022-12-11 14:00"),
						numberOfRegistered: 10,
						occupy: 1,
						registeredUsers: [
							{
								name: "James",
								phone: "010-1234-5678",
								emailAddress: "james@gmail.com",
								//...
							},
						],
					},
					{
						date: new Date("2022-12-12 14:00"),
						numberOfRegistered: 10,
						occupy: 2,
						registeredUsers: [
							{
								name: "John",
								phone: "010-2345-6789",
								emailAddress: "john123@gmail.com",
								//...
							},
							{
								name: "Chris",
								phone: "010-5434-4234",
								emailAddress: "chris232@gmail.com",
								//...
							},
						],
					},
					{
						date: new Date("2022-12-13 14:00"),
						numberOfRegistered: 10,
						occupy: 0,
						registeredUsers: [],
					},
				],
			},
			{
				title: "vol2",
				description: "vol2",
				holder: "company1",
				point: 200,
				volunteeringStart: "2022-12-4",
				volunteeringEnd: "2023-10-4",
				workingDays: [
					{
						date: new Date("2022-12-11 14:00"),
						numberOfRegistered: 10,
						occupy: 1,
						registeredUsers: [],
					},
					{
						date: new Date("2022-12-12 14:00"),
						numberOfRegistered: 10,
						occupy: 2,
						registeredUsers: [
							{
								name: "Jane",
								phone: "010-2345-6789",
								emailAddress: "john123@gmail.com",
								//...
							},
						],
					},
					{
						date: new Date("2022-12-13 14:00"),
						numberOfRegistered: 10,
						occupy: 0,
						registeredUsers: [],
					},
				],
			},
		],
	});
	useEffect(() => {
		localStorage.setItem("userData", JSON.stringify(company));
		getCurrentUserAPIMethod().then((user) => {
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
		});
	}, [login]);

	return (
		<div className="bg-white text-black">
			<Header login={login} setLogin={setLogin} />

			<main className="min-h-screen">
				<div className="w-full mx-auto">
					<Component {...pageProps} login={login} setLogin={setLogin} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
