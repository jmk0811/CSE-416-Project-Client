import { useState, useEffect } from "react";
import { getEventByIdAPIMethod, getEventsAPIMethod } from "../../api/client";

export default function index(props) {
	const [page, setPage] = useState("home");
	const [history, setHistory] = useState([]);

	const handlePageChange = (page) => {
		const pages = {
			home() {
				setPage("home");
			},
			history() {
				loadHistory();
				setPage("history");
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

	const loadHistory = async () => {
		const tempHistory = [];

		Promise.all(
			props.currUser.events.map(async (id) => {
				console.log(id);
				const res = await getEventByIdAPIMethod(id);
				console.log(res);
				tempHistory.push(res);
			}),
		).then(() => {
			console.log(tempHistory);
			setHistory(tempHistory);
		});
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
						page === "history" && "bg-activate2 font-semibold"
					}`}
					onClick={() => handlePageChange("history")}
				>
					History
				</div>
				<div
					className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
						page === "points" && "bg-activate2 font-semibold"
					}`}
					onClick={() => handlePageChange("points")}
				>
					Points
				</div>
				<div
					className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
						page === "certificates" && "bg-activate2 font-semibold"
					}`}
					onClick={() => handlePageChange("certificates")}
				>
					Certificates
				</div>
			</div>
			<div className="w-full bg-white m-[20px] py-[30px] px-[40px] rounded-[20px]">
				{page === "home" && <div className="flex flex-col" />}
				{page === "history" && (
					<div className="flex flex-col">
						{history.map((item) => (
							<div className={"flex flex-col mb-[20px]"}>
								<div className={"font-semibold"}>{item.title}</div>
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
