import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
	createCertificateAPIMethod,
	getCertificatesAPIMethod,
	getEventByIdAPIMethod,
	updateEventAPIMethod,
	updateUserAPIMethod,
	getCurrentUserAPIMethod,
	getUserByIdAPIMethod,
} from "../../api/client";
import ProfileCustomer from "../../components/profileCustomer";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function index(props) {
	const router = useRouter();
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);
	const [certificates, setCertificates] = useState([]);
	const [user, setUser] = useState(props.currUser);
	const [points, setPoints] = useState(0);
	var today = new Date();
	const [editMode, setEditMode] = useState(false);
	const [currEvent, setCurrEvent] = useState();
	const [certificateUser, setCertificateUser] = useState([]);
	const [approved, setApproved] = useState([]);

	useEffect(() => {
		const page_loc = localStorage.getItem("page");
		if (page_loc) {
			setPage(page_loc);
			handlePageChange(page_loc, -1);
		} else {
			localStorage.setItem("page", "home");
			setPage("home");
		}
		setUser(props.currUser);
	}, [props.currUser]);

	useEffect(() => {
		getCurrentUserAPIMethod().then((res) => {
			if (res === null) {
				alert("Please Login First");
				router.push("/");
			}
		});
	}, []);

	const handleEdit = (e, user) => {
		e.preventDefault();
		setEditMode(false);
		updateUserAPIMethod(user, user).then((res) => {
			console.log(res);
		});
		props.setCurrUser(user);
	};

	const handlePageChange = (page, value) => {
		if (page === "eventDetails" && value === -1) page = "events";

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
				if (props.currUser.type === "Organization") {
					getEventByIdAPIMethod(value).then((currentEvent) => {
						setCurrEvent(currentEvent);
						currEvent?.timeSlots.map((slot, i) => {
							slot.registeredUsers.map((userId, j) => {
								getUserByIdAPIMethod(userId).then((user) => {
									const bool = user.approvedEvents?.includes(currentEvent._id);
									let tempList = [];
									if (bool) {
										tempList.push(user._id);
										setApproved(tempList);
									}
								});
							});
						});
					});
				}
				setPage("certificates");
				localStorage.setItem("page", "certificates");
			},
			eventDetails() {
				setPage("eventDetails");
				getEventByIdAPIMethod(value).then((currentEvent) => {
					setCurrEvent(currentEvent);
					currEvent?.timeSlots.map((slot, i) => {
						slot.registeredUsers.map((userId, j) => {
							getUserByIdAPIMethod(userId).then((user) => {
								const bool = user.approvedEvents?.includes(currentEvent._id);
								let tempList = [];
								if (bool) {
									tempList.push(user._id);
									setApproved(tempList);
								}
							});
						});
					});
				});
				localStorage.setItem("page", "eventDetails");
			},
		};

		pages[page]();
	};

	useEffect(() => {}, [approved]);

	const loadEvents = async () => {
		const tempEvents = [];

		if (props.currUser?.type === "User") {
			if (props.currUser?.events !== undefined) {
				Promise.all(
					props.currUser?.events?.map(async (id) => {
						const res = await getEventByIdAPIMethod(id);

						tempEvents.push(res);
					}),
				).then(() => {
					setEvents(tempEvents);
					return tempEvents;
				});
			}
		} else {
			if (props.currUser?.events !== undefined) {
				Promise.all(
					props.currUser?.events?.map(async (id) => {
						const res = await getEventByIdAPIMethod(id);

						tempEvents.push(res);
					}),
				).then(() => {
					setEvents(tempEvents);
					return tempEvents;
				});
			}
		}
	};

	const loadCertificates = () => {
		getCertificatesAPIMethod().then((res) => {
			const tempList = res.filter((cert) => cert.owner === props.currUser?._id);
			setCertificates(tempList);
			let sum = 0;
			tempList.map((cert) => {
				sum += events.filter((e) => e._id === cert.event)[0]?.point;
			});

			setPoints(sum);
		});
	};

	useEffect(() => {
		loadCertificates();
	}, [events]);

	const cancelEvent = () => {
		const temp = [...props.currUser.events];
		temp.splice(temp.indexOf(currEvent._id), 1);

		const newUser = {
			name: props.currUser.name,
			email: props.currUser.email,
			password: props.currUser.password,
			type: props.currUser.type,
			address1: props.currUser.address1,
			approvedEvents: props.currUser.approvedEvents,
			profileUrl: props.currUser.profileUrl,
			gender: props.currUser.gender,
			dateOfBirth: props.currUser.dateOfBirth,
			phoneNumber: props.currUser.phoneNumber,
			events: temp,
		};

		updateUserAPIMethod(props.currUser, newUser).then((res) => {
			router.push("/profile").then(() => {
				location.reload();
			});
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

		getUserByIdAPIMethod(userId).then((res) => {
			const newUser = {
				name: res.name,
				email: res.email,
				password: res.password,
				type: res.type,
				address1: res.address1,
				approvedEvents: [...res.approvedEvents, currEvent._id],
				profileUrl: res.profileUrl,
				gender: res.gender,
				dateOfBirth: res.dateOfBirth,
				phoneNumber: res.phoneNumber,
				events: res.events,
				interests: res.events,
			};
			updateUserAPIMethod(res, newUser).then((res) => {
				console.log(res);
			});
		});

		createCertificateAPIMethod(certificate).then((res) => {
			alert("Successfully approved the user and granted a certificate");
			router.push("/profile").then(() => {
				location.reload();
			});
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
			<div className="w-full bg-white m-[20px] py-[30px]  rounded-[20px]" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
								<button className="mt-[60px] max-w-[200px] px-[20px] py-[5px] rounded-[10px] bg-blue-600 text-white font-semibold">
									<Link href="/workUpload">
										<a>Create Event</a>
									</Link>
								</button>

								<div className="text-5" style={{ marginTop: "20px" }}>
									To cancel or modify an event, please contact nanum.orghelp@gmail.com{" "}
								</div>
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
						<img className="" src={currEvent?.image} />
						<div className="flex flex-col mt-[30px]">
							<div className={"font-bold"}>My Time Slots</div>
							{currEvent?.timeSlots
								.filter((slot) => slot.registeredUsers.includes(props.currUser._id))
								.map((item) => (
									<div className="flex flex-col">
										<div className="flex flex-row gap-x-[10px]">
											<div>Starting date: </div>
											<div>
												{new Date(item.startTime).toLocaleDateString()} {new Date(item.startTime).toTimeString().slice(0, 9)}
											</div>
										</div>
									</div>
								))}
						</div>
						<ConfirmationModal cancelEvent={cancelEvent} />
					</div>
				)}
				{page === "eventDetails" && props.currUser.type === "Organization" && (
					<div className="flex flex-col">
						<div className="font-bold text-30">Event Details</div>
						<div className="font-bold mt-[30px]">Title</div>
						<div>{currEvent?.title}</div>
						<div className="font-bold mt-[30px]">Description</div>
						<div>{currEvent?.description}</div>
						<img className="w-[400px] mt-[30px]" src={currEvent?.image} />
						<div className="flex flex-col mt-[30px]">
							<div className="flex flex-row">
								<div className="font-bold">Participants</div>
							</div>
							<div className="ml-[30px]">
								{currEvent?.timeSlots.map((slot) => (
									<div className="mt-[30px]">
										<div className="flex flex-col">
											<div className="mr-[20px] font-semibold">
												{new Date(slot.startTime).toLocaleDateString()} {new Date(slot.startTime).toTimeString().slice(0, 9)}:
											</div>
											{slot.registeredUsers.map((user) => (
												<div className="flex flex-row mb-[10px]">
													<div className="mr-[20px]">{user}</div>

													{approved.includes(user) ? (
														<button className="bg-gray-400 px-[10px] py-[2px] rounded-[10px] my-auto text-white text-[14px]">Already approved</button>
													) : (
														<button className="bg-green-500 px-[10px] py-[2px] rounded-[10px] my-auto text-white text-[14px]" onClick={() => approveUser(user)}>
															Approve
														</button>
													)}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{page === "certificates" && (
					<div className="flex flex-col">
						<div className="flex flex-col">
							<div className="flex flex-row mb-[30px]">
								<div className="font-bold text-30">My Certificates</div>
								<div className="flex flex-row ml-auto my-auto mr-[30px]">
									<div className="text-20">Earned points:</div>
									<div className="text-20 font-bold ml-[10px]">{points}</div>
								</div>
							</div>
							<div className="mt-[30px]">
								{certificates.map((cert) => (
									<div className="mt-[20px] flex flex-col w-[400px] h-[200px] rounded-[10px] px-[20px] py-[20px] bg-main2">
										<div className="mx-auto font-bold mb-[20px]">Completion Certificate</div>
										<div className="flex flex-row">
											<div className="font-bold">Certificate ID:</div>
											<div className="ml-[10px]">{cert._id}</div>
										</div>
										<div className="flex flex-row">
											<div className="font-bold">Event name:</div>
											<div className="ml-[10px]">{events.filter((e) => e._id === cert.event)[0]?.title}</div>
										</div>
										<div className="flex flex-row">
											<div className="font-bold">Owner:</div>
											<div className="ml-[10px]">Me</div>
										</div>
										<div className="mt-auto ml-auto scale-[1.5]">
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
