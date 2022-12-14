import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { createCertificateAPIMethod, getCertificatesAPIMethod, getEventByIdAPIMethod, updateEventAPIMethod, updateUserAPIMethod, getCurrentUserAPIMethod } from "../../api/client";
import ProfileCustomer from "../../components/profileCustomer";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function index(props) {
	const router = useRouter();
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);
	const [certificates, setCertificates] = useState([]);
	const [user, setUser] = useState(props.currUser);
	// const [value, setValue] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [currEvent, setCurrEvent] = useState();

	useEffect(() => {
		const page_loc = localStorage.getItem("page");
		if (page_loc) {
			setPage(page_loc);
			//handlePageChange(page_loc);
		} else {
			localStorage.setItem("page", "home");
			setPage("home");
		}
		setUser(props.currUser);
	}, [props.currUser]);

	useEffect(() => {
		getCurrentUserAPIMethod().then((res) => {
			if(res === null){
				alert('Please Login First')
				router.push('/')
			}
		})
	}, []);

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
				loadEvents();
				loadCertificates();
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
		if (props.currUser?.type === "User") {
			if (props.currUser?.events !== undefined) {
				Promise.all(
					props.currUser?.events?.map(async (id) => {
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
		} else {
			// TODO: get participants list
			if (props.currUser?.events !== undefined) {
				Promise.all(
					props.currUser?.events?.map(async (id) => {
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
		}
	};

	const loadCertificates = () => {
		getCertificatesAPIMethod().then((res) => {
			setCertificates(res.filter((cert) => cert.owner === props.currUser?._id));
		});
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

	const approveUser = (userId) => {
		const certificate = {
			issueDate: new Date(),
			owner: userId,
			event: currEvent._id,
			contractAddress: "",
		};

		createCertificateAPIMethod(certificate).then((res) => {
			console.log();
			alert("Successfully approved the user and granted a certificate");
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
						(page === "events" || page === "eventDetails") && "bg-activate2 font-semibold"
					}`}
					onClick={() => handlePageChange("events")}
				>
					Events
				</div>
				{/* {props.currUser.type === "User" && (
					<div
						className={`w-full duration-200 hover:bg-hover1 pl-[20px] py-[5px] rounded-r-full cursor-pointer ${
							page === "points" && "bg-activate2 font-semibold"
						}`}
						onClick={() => handlePageChange("points")}
					>
						Points
					</div>
				)} */}
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
			<div className="w-full bg-white m-[20px] py-[30px]  rounded-[20px]"  style={{paddingLeft: '10px', paddingRight: '10px'}}>
				{page === "home" && <ProfileCustomer user={user} handleEdit={handleEdit} />}
				{page === "events" && (
					<div className="flex flex-col">
						<div className="font-bold text-30 mb-[30px]">Events List</div>
						{events.map((item) => (
							<div className="max-w-[400px] flex flex-col mb-[20px] bg-gray-200 rounded-2xl px-[30px] py-[20px]">
								<button onClick={() => handlePageChange("eventDetails", item._id)}>
									<div className="font-semibold">{item.title}</div>
								</button>
							</div>
						))}
						{props.currUser.type === "Organization" && (
							<>
							<button className={"mt-[60px] max-w-[200px] px-[20px] py-[5px] rounded-[10px] bg-blue-600 text-white font-semibold"}>
								<Link href={"/workUpload"}>
									<a>Create Event</a>
								</Link>
							</button>

							<div className="text-5" style={{marginTop: '20px'}}>To cancle or modify an event, please contact nanum.orghelp@gmail.com </div>
							</>
						)}
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
											<div>{new Date(item.startTime).toLocaleDateString()}</div>
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
								<div className="font-bold">Participants</div>
							</div>
							<div className="ml-[30px]">
								{currEvent?.timeSlots.map((slot) => (
									<div className="mt-[30px]">
										<div className="flex flex-col">
											<div className="mr-[20px] font-semibold">{new Date(slot.startTime).toLocaleDateString()}:</div>
											{slot.registeredUsers.map((user) => (
												<div className="flex flex-row">
													<div className="mr-[20px]">{user}</div>
													<button className="bg-green-500 px-[10px] py-[2px] rounded-[10px] my-auto text-white text-[14px]" onClick={() => approveUser(user)}>
														Approve
													</button>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
				{/* {page === "points" && <div className="flex flex-col" />} */}
				{page === "certificates" && (
					<div className="flex flex-col">
						<div className="flex flex-col">
							<div className="font-bold text-30">My Certificates</div>
							<div className="mt-[30px]">
								{certificates.map((cert) => (
									<div className="mt-[20px] flex flex-col w-[400px] h-[200px] rounded-[10px] px-[20px] py-[20px] bg-main2">
										<div className={"mx-auto font-bold mb-[20px]"}>Completion Certificate</div>
										<div className="flex flex-row">
											<div className="font-bold">Certificate ID:</div>
											<div className="ml-[10px]">{cert._id}</div>
										</div>
										<div className={"flex flex-row"}>
											<div className="font-bold">Event name:</div>
											<div className="ml-[10px]">{events.filter((e) => e._id === cert.event)[0]?.title}</div>
										</div>
										<div className={"flex flex-row"}>
											<div className="font-bold">Owner:</div>
											<div className="ml-[10px]">Me</div>
										</div>
										<div className={"mt-auto ml-auto scale-[1.5]"}>
											<WorkspacePremiumIcon />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
