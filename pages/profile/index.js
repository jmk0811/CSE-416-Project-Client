import { useState, useEffect } from "react";
import { getEventByIdAPIMethod, getEventsAPIMethod, getUserByIdAPIMethod, getUsersAPIMethod } from "../../api/client";

export default function index(props) {
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);

	const handlePageChange = (page) => {
		const pages = {
			home() {
				setPage("home");
			},
			events() {
				loadEvents();
				setPage("events");
			},
			points() {
				setPage("points");
			},
			certificates() {
				setPage("certificates");
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
							<div className="flex flex-col mb-[20px]">
								<div className="font-semibold">{item.title}</div>
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
