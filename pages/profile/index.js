import { useState, useEffect } from "react";
import { getEventByIdAPIMethod, getEventsAPIMethod, getUserByIdAPIMethod, getUsersAPIMethod, updateUserAPIMethod } from "../../api/client";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import PhoneInput from "react-phone-input-2";

export default function index(props) {
	const [page, setPage] = useState("home");
	const [events, setEvents] = useState([]);
	const [user, setUser] = useState(props.currUser);
	const [value, setValue] = useState([]);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		let page_loc = localStorage.getItem("page");
		if (page_loc) {
			setPage(page_loc);
		} else {
			localStorage.setItem("page", "home");
			setPage("home");
		}
		setUser(props.currUser);
		setValue(props.currUser.interests);
	}, [props.currUser]);

	const handleEdit = (e) => {
		e.preventDefault();
		console.log(user);
		setEditMode(false);
		updateUserAPIMethod(user).then((res) => {
			console.log(res);
		});
	};

	const handleChangeValue = (prop) => (event) => {
		if (prop == "profile_url") {
			if (event.target.files && event.target.files[0]) {
				const selectedFile = event.target.files[0];

				const formData = new FormData();
				const unsignedUploadPreset = "v8dfxg1t";
				formData.append("file", selectedFile);
				formData.append("upload_preset", unsignedUploadPreset);

				console.log("Cloudinary upload");
				console.log(formData.file);
				uploadImageToCloudinaryAPIMethod(formData).then((response) => {
					console.log(response);
					setUser({ ...user, profile_url: response.url });
				});
			}
		} else {
			setUser({ ...user, [prop]: event.target.value });
		}
	};
	const handlePageChange = (page) => {
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
	console.log(user);
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
				{page === "home" && (
					<div className="flex flex-col">
						{" "}
						<div className="flex">
							<div className="text-[30px]">
								<div className="row-justify-content-center">
									<div className="col-lg-8 min-w-[500px]">
										<div className="p-5 shadow rounded content">
											My Profile
											{editMode ? (
												""
											) : (
												<button className="ml-[60%] text-[17px]" onClick={() => setEditMode(!editMode)}>
													{" "}
													edit{" "}
												</button>
											)}
											<form method="POST" action="#">
												<div>
													<div className="flex form-group items-center jusitfy-center h-100% col-md-6 border m-[3px]">
														<label
															for="image"
															className="flex justify-center border items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
														>
															Profile Image
														</label>
														<div className="flex flex-row justify-center items-center">
															<img
																className="avatar"
																src={
																	user.profile_url == "" || user.profile_url == undefined
																		? "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
																		: user.profile_url
																}
																style={{ width: "70px", borderRadius: "50%" }}
															/>
															{editMode ? (
																<input
																	id="file-upload"
																	className="custom-file-upload"
																	placeholder="Choose New Image"
																	type="file"
																	name="image"
																	accept="image/*"
																	id="cloudinary"
																	onChange={handleChangeValue("profile_url")}
																	className="flex  items-center bg-transparent h-[30px]  px-8 text-base border-[#4EA1D3]"
																/>
															) : (
																""
															)}
														</div>
													</div>
													<div className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
														<label
															for="iName "
															className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
														>
															Name
														</label>

														<input
															className="bg-transparent h-[40px]  px-10 pr-4 text-base border-[#4EA1D3]"
															placeholder="Please enter your name"
															type="text"
															id="iName"
															name="Name"
															value={user.name ? user.name : ""}
															style={{ alignItems: "center" }}
															onChange={handleChangeValue("name")}
															disabled={editMode ? false : true}
														/>
													</div>
													<div className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
														<label
															for="Email"
															className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
														>
															Email
														</label>

														<input
															type="text"
															id="iEmail"
															name="Email"
															placeholder="Please enter your Email address"
															value={user.email}
															className="bg-transparent h-[40px]  px-10 pr-4 text-base border-[#4EA1D3]"
															disabled
														/>
													</div>

													<div className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
														<label
															for="userDateOfBirth"
															className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
														>
															Date of Birth
														</label>

														<input
															className="text-[16px] font-sans bg-white"
															type="date"
															value={user.dateOfBirth}
															name="DOB"
															id="datepicker"
															placeholder="Enter a Date"
															disabled
														/>
													</div>
													<div className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
														<label
															for="userOhoneNumber"
															className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
														>
															Phone number
														</label>

														<PhoneInput
															country={"us"}
															name="phoneNumber"
															value={user.phoneNumber ? user.phoneNumber.toString() : ""}
															className="w-[50px] px-10"
															onChange={(v) => setUser({ ...user, phoneNumber: v })}
															disabled={editMode ? false : true}
														/>
													</div>

													<div className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
														<label
															for="userInterest"
															className="flex justify-center items-center w-[120px] h-100% font-bold text-[15px] border bg-slate-200 mr-[10px]"
															style={{ height: "16vh" }}
														>
															Interests
														</label>
														<br />

														<Sheet
															variant="outlined"
															sx={{
																width: 360,
																p: 2,
																borderRadius: "sm",
																borderColor: "#CACACA",
															}}
														>
															<Box role="group" aria-labelledby="rank">
																<List
																	row
																	wrap
																	sx={{
																		"--List-gap": "8px",
																		"--List-item-radius": "20px",
																		"--List-item-minHeight": "32px",
																	}}
																>
																	{["Education", "Animal", "Environment", "Healthcare", "Sports"].map((item, index) => (
																		<ListItem key={item}>
																			{value != undefined && Array.from(value).includes(item) && (
																				<Done
																					fontSize="md"
																					color="primary"
																					sx={{
																						ml: -0.5,
																						mr: 0.5,
																						zIndex: 2,
																						pointerEvents: "none",
																					}}
																				/>
																			)}
																			<Checkbox
																				disabled={editMode ? false : true}
																				size="sm"
																				disableIcon
																				overlay
																				label={item}
																				checked={user.interests != undefined && Array.from(user.interests).includes(item)}
																				variant={user.interests != undefined && Array.from(user.interests).includes(item) ? "soft" : "outlined"}
																				onChange={(event) => {
																					if (event.target.checked) {
																						setValue((val) => [...val, item]);
																						setUser({ ...user, interests: [...value, item] });
																					} else {
																						setValue((val) => val.filter((text) => text !== item));

																						setUser({ ...user, interests: value.filter((text) => text !== item) });
																					}
																				}}
																				componentsProps={{
																					action: ({ checked }) => ({
																						sx: checked
																							? {
																									border: "1px solid",
																									borderColor: "primary.500",
																							  }
																							: {},
																					}),
																				}}
																			/>
																		</ListItem>
																	))}
																</List>
															</Box>
														</Sheet>
													</div>
												</div>
												{!editMode ? (
													""
												) : (
													<div className="flex flex-col items-center w-full justify-center p-[30px]">
														<div className="bg-[#4EA1D3] w-full rounded">
															<button onClick={handleEdit} type="submit" className="w-full">
																<div className="w-[400px] text-[25px] font-sans text-white text-center text-center decoration-8" style={{ margin: "auto" }}>
																	Confirm
																</div>
															</button>
														</div>
													</div>
												)}
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
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
