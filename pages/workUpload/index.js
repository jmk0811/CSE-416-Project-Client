import React from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
// import AsyncImageUpload from "./AsyncImageUpload";
import { convertToRaw } from "draft-js";
import { useRouter } from "next/router";
import {createEventAPIMethod, updateUserAPIMethod, uploadImageToCloudinaryAPIMethod, getCurrentUserAPIMethod} from "../../api/client";

export default function workupload(props) {
	const router = useRouter();

	function dateFormat(date) {
		let day = date.getDate();
		let month = date.getMonth() + 1;
		const year = date.getYear() + 1900;

		if (month > 12) month -= 12;
		if (month < 10) month = `0${month}`;
		if (day < 10) day = `0${day}`;

		return `${year}-${month}-${day}`;
	}

	function dateFormat2(date, i) {
		let day = date.getDate() + i;
		let month = date.getMonth() + 1;
		const year = date.getYear() + 1900;

		if (month > 12) month -= 12;
		if (month < 10) month = `0${month}`;
		if (day < 10) day = `0${day}`;

		return `${year}-${month}-${day}`;
	}

	const myTheme = createTheme({});

	Object.assign(myTheme, {
		overrides: {
			MUIRichTextEditor: {
				root: {
					"& pre": {
						color: "#212121",
					},
				},
				editor: {
					padding: "20px",
					height: "300px",
					maxHeight: "60vh",
					overflow: "auto",
				},
				placeHolder: {
					paddingLeft: 20,
					width: "inherit",
					position: "static",
				},
				anchorLink: {
					color: "#FFEB3B",
					textDecoration: "underline",
				},
			},
		},
	});

	// Tags: outlined (선택안함)
	const [animal, setAnimal] = React.useState("outlined");
	const handleAnimal = () => {
		if (animal == "") setAnimal("outlined");
		else setAnimal("");
	};
	const [education, setEducation] = React.useState("outlined");
	const handleEducation = () => {
		if (education == "") setEducation("outlined");
		else setEducation("");
	};
	const [environment, setEnvironment] = React.useState("outlined");
	const handleEnviroment = () => {
		if (environment == "") setEnvironment("outlined");
		else setEnvironment("");
	};
	const [sports, setSports] = React.useState("outlined");
	const handleSports = () => {
		if (sports == "") setSports("outlined");
		else setSports("");
	};
	const [healthcare, setHealthcare] = React.useState("outlined");
	const handleHealthcare = () => {
		if (healthcare == "") setHealthcare("outlined");
		else setHealthcare("");
	};

	const [title, setTitle] = React.useState("");
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const [address, setAddress] = React.useState("");
	const handleAddress = (e) => {
		setAddress(e.target.value);
	};

	const [point, setPoint] = React.useState(0);
	const handlePoint = (e) => {
		setPoint(e.target.value);
	};

	const [recruitmentStartDate, setRecruitmentStartDate] = React.useState(dateFormat(new Date()));
	const handleRecruitmentStartDate = (e) => {
		setRecruitmentStartDate(e.target.value);
	};

	const [recruitmentEndDate, setRecruitmentEndDate] = React.useState(dateFormat(new Date()));
	const handleRecruitmentEndDate = (e) => {
		setRecruitmentEndDate(e.target.value);
	};

	const [startDate, setStartDate] = React.useState(dateFormat(new Date()));
	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const [endDate, setEndDate] = React.useState(dateFormat(new Date()));
	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	const [fileURL, setfileURL] = React.useState("");
	const handleFiile = (e) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			const formData = new FormData();
			const unsignedUploadPreset = "v8dfxg1t";
			formData.append("file", selectedFile);
			formData.append("upload_preset", unsignedUploadPreset);

			console.log("Cloudinary upload");
			console.log(formData.file);
			uploadImageToCloudinaryAPIMethod(formData).then((response) => {
				console.log(response.url);
				setfileURL(response.url);
			});
		}
	};
	const [applyDay, setApplyDate] = React.useState([1, 2, 3, 4]);

	const [detail, setDetail] = React.useState("");
	const handleDetail = (e) => {
		const plainText = e.getCurrentContent().getPlainText(); // for plain text
		//console.log(plainText);
		const rContent = convertToRaw(e.getCurrentContent()); // for rte content with text formating
		rContent && setDetail(JSON.stringify(plainText)); // store your rteContent to state
	};

	const handleFormDate = (e, i) => {
		const newObject = { ...applyDay[i] };
		newObject[e.target.id] = e.target.value;
		applyDay[i] = newObject;

		const updatedArray = applyDay.map((obj, j) => {
			if (i == j) {
				return newObject;
			}
			return obj;
		});

		setApplyDate(updatedArray);
	};

	const handleSubmit = () => {
		const interest = [];
		if (animal == "") interest.push("animal");
		if (education == "") interest.push("education");
		if (environment == "") interest.push("environment");
		if (sports == "") interest.push("sports");
		if (healthcare == "") interest.push("healthcare");

		console.log(applyDay);

		let temp = [];

		applyDay.map((item) => {
			const hr = item.time.split(":")[0];
			const min = item.time.split(":")[1];
			let tempDate = new Date(item.date);
			tempDate.setHours(hr);
			tempDate.setMinutes(min);
			temp = [...temp, { startTime: tempDate, endTime: "", registerLimit: item.occupy, registeredUsers: [] }];
		});

		const event = {
			title,
			description: detail,
			holder: props.currUser._id,
			recruitmentStartDate,
			recruitmentEndDate,
			eventStartDate: startDate,
			eventEndDate: endDate,
			thumbnail: fileURL,
			image: fileURL,
			address,
			interests: interest,
			point,
			timeSlots: temp,
		};

		createEventAPIMethod(event).then((res) => {
			console.log('res', res);

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
				events: [...props.currUser.events, res],
			};

			updateUserAPIMethod(props.currUser, newUser).then((res) => {
				console.log(res);
			});

			alert("Your event has been successfully uploaded!");
			router.push({
				pathname: "/",
			});
		});
	};

	React.useEffect(() => {
		const sd = new Date(startDate);
		const ed = new Date(endDate);
		const daysBetween = (ed.getTime() - sd.getTime()) / (1000 * 3600 * 24) + 1;
		if (daysBetween <= 0) {
			alert("please make the start date before the end date");
			setEndDate(sd);
			return;
		}
		const dateArray = new Array(daysBetween).fill({ date: sd, time: "00:00", occupy: 0, register: [] });
		setApplyDate(dateArray);
	}, [startDate, endDate]);

	React.useEffect(() => {
		const sd = new Date(recruitmentStartDate);
		const ed = new Date(recruitmentEndDate);
		const daysBetween = (ed.getTime() - sd.getTime()) / (1000 * 3600 * 24) + 1;
		if (daysBetween <= 0) {
			alert("please make the start date before the end date");
			setRecruitmentEndDate(sd);
		}
	}, [recruitmentStartDate, recruitmentEndDate]);

	React.useEffect(() => {
		getCurrentUserAPIMethod().then((res) => {
			if(res.type !== 'Organization' ){
				alert('Unauthorized')
				router.push('/')
			}
		}).catch((err) => {
			alert('Unauthorized')
			router.push('/')
		})
	}, [])

	return (
		<Box display="flex" flexDirection="column">
			<Box display="flex" justifyContent="center" alignItems="center" alignSelf="center" width="md">
				<Box display="flex" flexDirection="column" alignItems="left" justifyContent="center" maxWidth="md" p={{ xs: 1, sm: 2, md: 0 }}>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginTop: "20px", marginBottom: "20px" }}>
						<div className="text-[25px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Title
						</div>
						<input
							className="text-[25px] font-bold font-sans bg-white"
							type="text"
							style={{ border: "1px solid black", borderRadius: "10px", padding: "15px", width: "1000px", maxWidth: "70vw" }}
							value={title}
							onChange={handleTitle}
						/>
					</div>

					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginBottom: "20px" }}>
						<div className="text-[25px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Recruitment Period
						</div>
						<input className="text-[25px] font-sans bg-gray-300" type="date" value={recruitmentStartDate} onChange={handleRecruitmentStartDate} />
						<div
							className="text-[25px] font-sans"
							style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", marginLeft: "10px" }}
						>
							{" "}
							~{" "}
						</div>
						<input className="text-[25px] font-sans bg-gray-300" type="date" value={recruitmentEndDate} onChange={handleRecruitmentEndDate} />
					</div>

					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginBottom: "20px" }}>
						<div className="text-[25px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Volunteering Period
						</div>
						<input className="text-[25px] font-sans bg-gray-300" type="date" value={startDate} onChange={handleStartDate} />
						<div
							className="text-[25px] font-sans"
							style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", marginLeft: "10px" }}
						>
							{" "}
							~{" "}
						</div>
						<input className="text-[25px] font-sans bg-gray-300" type="date" value={endDate} onChange={handleEndDate} />
					</div>

					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginTop: "20px", marginBottom: "20px" }}>
						<div className="text-[20px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Address
						</div>
						<input
							className="text-[20px] font-bold font-sans bg-white"
							type="text"
							style={{ border: "1px solid black", borderRadius: "10px", padding: "15px", width: "1000px", maxWidth: "65vw" }}
							value={address}
							onChange={handleAddress}
						/>
					</div>

					<div style={{ border: "1px solid black" }}>
						<ThemeProvider theme={myTheme}>
							{/* <AsyncImageUpload detail = {detail} handleDetail = {handleDetail}/> */}
							<MUIRichTextEditor label="Start Here..." controls={["bold", "underline", "italic"]} value={detail.text} onChange={handleDetail} />
						</ThemeProvider>
					</div>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginBottom: "20px" }}>
						<div className="text-[25px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Files
						</div>
						<input type="file" style={{ display: "flex", justifyContent: "center", alignSelf: "center" }} onChange={handleFiile} />
					</div>

					<div style={{ display: "flex", flexDirection: "column", justifyContent: "left", maxWidth: "90vw", marginBottom: "20px" }}>
						<div className="text-[25px] font-bold font-sans">Interests</div>
						<div className="text-[25px] font-bold font-sans" style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
							<Stack direction="row" spacing={1} style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", maxWidth: "90vw" }}>
								<Chip label="Animal" variant={animal} onClick={handleAnimal} style={{ width: "100px" }} />
								<Chip label="Education" variant={education} onClick={handleEducation} style={{ width: "100px" }} />
								<Chip label="Environment" variant={environment} onClick={handleEnviroment} style={{ width: "100px" }} />
								<Chip label="Healthcare" variant={healthcare} onClick={handleHealthcare} style={{ width: "100px" }} />
								<Chip label="Sports" variant={sports} onClick={handleSports} style={{ width: "100px" }} />
							</Stack>
						</div>
					</div>

					<div>
						<div className="text-[25px] font-bold font-sans">Time Slots</div>
						{applyDay.map((arr, i) => (
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									flexDirection: "row",
									justifyContent: "left",
									border: "1px solid black",
									borderRadius: "10px",
									marginBottom: "10px",
								}}
								onChange={(event) => handleFormDate(event, i)}
							>
								<input
									className={"bg-gray-300"}
									id="date"
									type="date"
									value={dateFormat2(new Date(arr.date), i)}
									style={{ display: "flex", justifyContent: "center", alignSelf: "center", marginRight: "10px" }}
								/>
								<input className={"bg-gray-300"} id="time" type="time" value={arr.time} style={{ display: "flex", justifyContent: "center", alignSelf: "center", marginRight: "10px" }} />
								<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", margin: "10px" }}>
									<Typography style={{ marginRight: "10px" }}>Occupy:</Typography>
									<input
										className={"bg-gray-300"}
										id="occupy"
										type="number"
										value={arr.occupy}
										style={{
											paddingLeft: "10px",
											display: "flex",
											justifyContent: "center",
											alignSelf: "center",
											border: "1px solid black",
											borderRadius: "10px",
											width: "100px",
											marginRight: "10px",
										}}
									/>
								</div>
								<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", margin: "10px" }}>
									<Typography style={{ marginRight: "10px" }}>Registered Users:</Typography>
									<input
										className={"bg-gray-300"}
										id="occupy"
										type="number"
										value={0}
										// value will change to register.length when we will be getting data, this may be needed to be done in useEffects
										disabled
										style={{
											paddingLeft: "10px",
											display: "flex",
											justifyContent: "center",
											alignSelf: "center",
											border: "1px solid black",
											borderRadius: "10px",
											width: "100px",
										}}
									/>
								</div>
							</div>
						))}
					</div>

					<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", maxWidth: "90vw", marginTop: "20px", marginBottom: "20px" }}>
						<div className="text-[20px] font-bold font-sans" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
							Points
						</div>
						<input
							className="text-[20px] font-bold font-sans bg-gray-300"
							type="number"
							style={{ border: "1px solid black", borderRadius: "10px", padding: "15px", maxWidth: "100px" }}
							value={point}
							onChange={handlePoint}
						/>
					</div>

					<Button
						type="submit"
						variant="contained"
						style={{ backgroundColor: "skyblue", marginTop: "20px", marginBottom: "20px", width: "200px" }}
						onClick={handleSubmit}
					>
						<Typography
							variant={{ md: "h5", sm: "body1" }}
							style={{ display: "flex", justifyContent: "center", flexDirection: "column", color: "black", width: "100px", height: "30px" }}
						>
							Submit
						</Typography>
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
