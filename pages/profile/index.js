import { useState, useEffect } from "react";
import { getEventByIdAPIMethod, getEventsAPIMethod, getUserByIdAPIMethod, getUsersAPIMethod } from "../../api/client";

export default function index(props) {
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);
	useEffect(() => {
		//let page_loc = localStorage.getItem("page");
		//setPage(page_loc);
		//console.log(page_loc);
	}, []);
	const handlePageChange = (page) => {
		const pages = {
			home() {
				setPage("home");
				//localStorage.setItem("page", "home");
			},
			events() {
				loadEvents();
				setPage("events");
				//localStorage.setItem("page", "events");
			},
			points() {
				setPage("points");
				//localStorage.setItem("page", "points");
			},
			certificates() {
				setPage("certificates");
				//localStorage.setItem("page", "certificates");
			},
		};

		pages[page]();
	};

	const loadEvents = async () => {
		const tempEvents = [];

		// TODO: refactor
		if (props.currUser.type === "User") {
			Promise.all(
				props.currUser.events.map(async (id) => {
					console.log(id);
					const res = await getEventByIdAPIMethod(id);
					console.log(res);
					tempEvents.push(res);
				}),
			).then(() => {
				console.log(tempEvents);
				setEvents(tempEvents);
			});
		} else {
			//TODO: get participants list
			Promise.all(
				props.currUser.events.map(async (id) => {
					console.log(id);
					const res = await getEventByIdAPIMethod(id);
					console.log(res);
					tempEvents.push(res);
				}),
			).then(() => {
				console.log(tempEvents);
				setEvents(tempEvents);
			});
		}
	};

	return (
		<div className="relative flex flex-row min-h-screen bg-bg1">
			<div className="w-[256px] pr-[20px] py-[20px]">
				<div
					className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${page === "home" && "bg-activate2 font-semibold"}`}
					onClick={() => handlePageChange("home")}
				>
					Profile
				</div>
				<div
					className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
						page === "events" && "bg-activate2 font-semibold"
					}`}
					onClick={() => handlePageChange("events")}
				>
					Events
				</div>
				{props.currUser.type === "User" && (
					<div
						className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
							page === "points" && "bg-activate2 font-semibold"
						}`}
						onClick={() => handlePageChange("points")}
					>
						Points
					</div>
				)}
				{props.currUser.type === "User" && (
					<div
						className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
							page === "certificates" && "bg-activate2 font-semibold"
						}`}
						onClick={() => handlePageChange("certificates")}
					>
						Certificates
					</div>
				)}
			</div>
			<div className="w-full bg-white m-[20px] py-[30px] px-[40px] rounded-[20px]">
				{page === "home" && <div className="flex flex-col" />}
				{page === "events" && (
					<div className="flex flex-col">
						{events.map((item) => (
							<div className="max-w-[400px] flex flex-col mb-[20px] bg-gray-200 rounded-2xl px-[30px] py-[20px]">
								<div className="font-semibold">{item.title}</div>
								{/*TODO: remove hard-coded parts*/}
								{props.currUser.type === "Organization" && (
									<div className={"flex flex-row gap-x-[20px]"}>
										<div>Minki</div>
										<div>user@test.com</div>
										<div>123123123</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
				{page === "points" && <div className="flex flex-col" />}
				{page === "certificates" && <div className="flex flex-col" />}
			</div>
		</div>
	);
}
