import { useState, useEffect } from "react";
import Link from "next/link";
import {
	getEventByIdAPIMethod,
	getEventsAPIMethod,
	getUserByIdAPIMethod,
	getUsersAPIMethod,
	updateEventAPIMethod,
	updateUserAPIMethod,
} from "../../api/client";
import ProfileCustomer from "../../components/profileCustomer";

export default function index(props) {
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);
	const [user, setUser] = useState(props.currUser);
	// const [value, setValue] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [currEvent, setCurrEvent] = useState();

	useEffect(() => {
		const page_loc = localStorage.getItem("page");
		if (page_loc) {
			setPage(page_loc);
		} else {
			localStorage.setItem("page", "home");
			setPage("home");
		}
		setUser(props.currUser);
		// setValue(props.currUser.interests);
	}, [props.currUser]);

	const handleEdit = (e, user) => {
		e.preventDefault();
		setEditMode(false);
		updateUserAPIMethod(user, user).then((res) => {
			console.log(res);
		});
	};

	const handlePageChange = (page, value) => {
		const pages = {
			home() {
				setPage("home");
				localStorage.setItem("page", "home");
			},
			events() {
				loadEvents();
				setPage("events");
				localStorage.setItem("page", "events");
			},
			points() {
				setPage("points");
				localStorage.setItem("page", "points");
			},
			certificates() {
				setPage("certificates");
				localStorage.setItem("page", "certificates");
			},
			eventDetails() {
				setPage("eventDetails");
				getEventByIdAPIMethod(value).then((res) => {
					setCurrEvent(res);
				});
				localStorage.setItem("page", "eventDetails");
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
			// TODO: get participants list
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

	const cancelEvent = () => {
		const temp = [...props.currUser.events];
		temp.splice(temp.indexOf(currEvent._id), 1);

		const newUser = {
			name: props.currUser.name,
			email: props.currUser.email,
			password: props.currUser.password,
			type: props.currUser.type,
			address1: props.currUser.address1,
			address2: props.currUser.address2,
			profileUrl: props.currUser.profileUrl,
			gender: props.currUser.gender,
			dateOfBirth: props.currUser.dateOfBirth,
			phoneNumber: props.currUser.phoneNumber,
			events: temp,
		};

		updateUserAPIMethod(props.currUser, newUser).then((res) => {
			console.log(res);
		});

		const tempTimeSlots = [...currEvent.timeSlots];
		tempTimeSlots.filter((slot) => slot.registeredUsers.includes(props.currUser._id))[0].registeredUsers.splice(tempTimeSlots.indexOf(props.currUser._id), 1);

		const newEvent = {
			title: currEvent.title,
			description: currEvent.description,
			holder: currEvent.holder,
			recruitmentStartDate: currEvent.recruitmentStartDate,
			recruitmentEndDate: currEvent.recruitmentEndDate,
			eventStartDate: currEvent.eventStartDate,
			eventEndDate: currEvent.eventEndDate,
			thumbnail: currEvent.thumbnail,
			image: currEvent.image,
			address: currEvent.address,
			point: currEvent.point,
			timeSlots: [...tempTimeSlots],
		};

		updateEventAPIMethod(currEvent, newEvent).then((res) => {
			console.log(res);
		});

		alert("Successfully cancelled");
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
						(page === "events" || page === "eventDetails") && "bg-activate2 font-semibold"
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

			{/* page contents */}
			<div className="w-full bg-white m-[20px] py-[30px] px-[40px] rounded-[20px]">
				{page === "home" && <ProfileCustomer user={user} handleEdit={handleEdit} />}
				{page === "events" && (
					<div className="flex flex-col">
						{events.map((item) => (
							<div className="max-w-[400px] flex flex-col mb-[20px] bg-gray-200 rounded-2xl px-[30px] py-[20px]">
								<button onClick={() => handlePageChange("eventDetails", item._id)}>
									<div className="font-semibold">{item.title}</div>
								</button>
							</div>
						))}
					</div>
				)}
				{page === "eventDetails" && props.currUser.type === "User" && (
					<div className="flex flex-col">
						<div className="font-bold text-30">Event Details</div>
						<div className="font-bold mt-[30px]">Title</div>
						<div>{currEvent?.title}</div>
						<div className="font-bold mt-[30px]">Description</div>
						<div>{currEvent?.description}</div>
						<div>{currEvent?.image}</div>
						<div className="flex flex-col mt-[30px]">
							<div>MyTime Slots</div>
							{currEvent?.timeSlots
								.filter((slot) => slot.registeredUsers.includes(props.currUser._id))
								.map((item) => (
									<div className="flex flex-col">
										<div className="flex flex-row gap-x-[10px]">
											<div>Starting date: </div>
											<div>{item.startTime}</div>
										</div>
										{/* <div className={"flex flex-row"}> */}
										{/*	<div>Ending date: </div> */}
										{/*	<div>{item.endTime}</div> */}
										{/* </div> */}
									</div>
								))}
						</div>
						<button className="w-[100px] h-[40px] rounded-[10px] bg-red-600 text-white mt-[200px]" onClick={cancelEvent}>
							Cancel
						</button>
					</div>
				)}
				{page === "eventDetails" && props.currUser.type === "Organization" && (
					<div className="flex flex-col">
						<div className="font-bold text-30">Event Details</div>
						<div className="font-bold mt-[30px]">Title</div>
						<div>{currEvent?.title}</div>
						<div className="font-bold mt-[30px]">Description</div>
						<div>{currEvent?.description}</div>
						<div>{currEvent?.image}</div>
						<div className="flex flex-col mt-[30px]">
							<div className="flex flex-row">
								<div>Participants:</div>
								<div className="ml-[10px]">{currEvent?.timeSlots.length}</div>
							</div>
							<div className="ml-[30px]">
								{currEvent?.timeSlots.map((slot) => (
									<div className="mt-[20px]">
										<div>{slot.startTime}</div>
										{slot.registeredUsers.map((user) => (
											<div>{user}</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
				{page === "points" && <div className="flex flex-col" />}
				{page === "certificates" && <div className="flex flex-col" />}
			</div>
		</div>
	);
}
