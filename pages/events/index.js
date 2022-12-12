import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Typography,
	Stack,
	Chip,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from "@mui/material";

import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getEventsAPIMethod } from "../../api/client";
import Table from "./Table";

export default function Index(props) {
	const [events, setEvents] = useState([]);
	const [query, setQuery] = useState("");
	const router = useRouter();

	// Advanced Search
	const [location, setLocation] = useState("");
	const handleChangeLocation = (e) => {
		setLocation(e.target.value);
	};

	const [point, setPoint] = useState("");
	const handleChangePoint = (e) => {
		setPoint(e.target.value);
	};

	const [recruitmentStartDate, setRecruitmentStartDate] = useState(new Date("2021-01-01"));
	const handleRecruitmentStartDate = (e) => {
		setRecruitmentStartDate(e);
	};

	const [recruitmentEndDate, setRecruitmentEndDate] = useState(new Date("2031-01-01"));
	const handleRecruitmentEndDate = (e) => {
		setRecruitmentEndDate(e);
	};

	const [startDate, setStartDate] = useState(new Date("2021-01-01"));
	const handleStartDateChange = (e) => {
		setStartDate(e);
	};

	const [endDate, setEndDate] = useState(new Date("2031-01-01")); // dayjs(Date.now())
	const handleEndDateChange = (e) => {
		setEndDate(e);
	};

	// Tags: outlined (선택안함)
	const [animal, setAnimal] = useState("");
	const handleAnimal = () => {
		if (animal == "") setAnimal("outlined");
		else setAnimal("");
	};
	const [education, setEducation] = useState("");
	const handleEducation = () => {
		if (education == "") setEducation("outlined");
		else setEducation("");
	};
	const [environment, setEnvironment] = useState("");
	const handleEnviroment = () => {
		if (environment == "") setEnvironment("outlined");
		else setEnvironment("");
	};
	const [sports, setSports] = useState("");
	const handleSports = () => {
		if (sports == "") setSports("outlined");
		else setSports("");
	};
	const [healthcare, setHealthcare] = useState("");
	const handleHealthcare = () => {
		if (healthcare == "") setHealthcare("outlined");
		else setHealthcare("");
	};

	useEffect(() => {
		setQuery(router.query.query?.toLowerCase());
	}, [router.query.query]);

	useEffect(() => {
		getEventsAPIMethod().then((res) => {
			console.log("getEvent", res);
			setEvents(res);
		});
	}, []);

	return (
		<div className="min-h-screen bg-bg1">
			<div className="max-w-[1000px] mx-auto p-[30px]">
				<div className="font-bold text-26 mb-[60px]">Search for events</div>
				<Accordion style={{ width: "100%", backgroundColor: "efefef", marginBottom: "30px" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
						<Typography style={{ marginLeft: "15px", fontFamily: "'Noto Sans KR', sans-serif" }}>Advanced Search</Typography>
					</AccordionSummary>
					<AccordionDetails style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Box>
							<div>
								<FormControl fullWidth style={{ width: "300px", margin: "10px" }}>
									<InputLabel id="demo-simple-select-label"> Location </InputLabel>
									<Select labelId="demo-simple-select-label" id="demo-simple-select" value={location} label="Location" onChange={handleChangeLocation}>
										<MenuItem value={1}> Comming Soon </MenuItem>
										{/* <MenuItem value={2}> Gyeonggi-do</MenuItem>
                                                <MenuItem value={3}> Incheon </MenuItem> */}
									</Select>
								</FormControl>

								<FormControl fullWidth style={{ width: "300px", margin: "10px" }}>
									<InputLabel id="demo-simple-select-label"> Points </InputLabel>
									<Select labelId="demo-simple-select-label" id="demo-simple-select" value={point} label="Points" onChange={handleChangePoint}>
										<MenuItem value={1}> below 10 </MenuItem>
										<MenuItem value={2}> 10 ~ 20</MenuItem>
										<MenuItem value={3}> above 20 </MenuItem>
									</Select>
								</FormControl>
							</div>

							<div style={{ margin: "10px", display: "flex", justifyContent: "left" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<div style={{ marginBottom: "10px" }}>
										<DesktopDatePicker
											label="Recruitment Start Date"
											inputFormat="MM/DD/YYYY"
											value={recruitmentStartDate}
											onChange={handleRecruitmentStartDate}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>
								</LocalizationProvider>
								<Typography
									style={{
										fontWeight: 700,
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
										alignSelf: "center",
										marginRight: "5px",
										marginLeft: "5px",
									}}
								>
									~
								</Typography>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<div style={{ marginBottom: "10px" }}>
										<DesktopDatePicker
											label="Recruitment End Date"
											inputFormat="MM/DD/YYYY"
											value={recruitmentEndDate}
											onChange={handleRecruitmentEndDate}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>
								</LocalizationProvider>
							</div>

							<div style={{ margin: "10px", display: "flex", justifyContent: "left" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<div style={{ marginBottom: "10px" }}>
										<DesktopDatePicker
											label="Start Date"
											inputFormat="MM/DD/YYYY"
											value={startDate}
											onChange={handleStartDateChange}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>
								</LocalizationProvider>
								<Typography
									style={{
										fontWeight: 700,
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
										alignSelf: "center",
										marginRight: "5px",
										marginLeft: "5px",
									}}
								>
									~
								</Typography>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<div style={{ marginBottom: "10px" }}>
										<DesktopDatePicker
											label="End Date"
											inputFormat="MM/DD/YYYY"
											value={endDate}
											onChange={handleEndDateChange}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>
								</LocalizationProvider>
							</div>
							<div>
								<Typography style={{ margin: "10px" }}>Interests</Typography>
								<Stack direction="row" spacing={1} style={{ display: "flex", flexWrap: "wrap" }}>
									<Chip label="Animal" variant={animal} onClick={handleAnimal} style={{ marginBottom: "10px" }} />
									<Chip label="Education" variant={education} onClick={handleEducation} style={{ marginBottom: "10px" }} />
									<Chip label="Environment" variant={environment} onClick={handleEnviroment} style={{ marginBottom: "10px" }} />
									<Chip label="Healthcare" variant={healthcare} onClick={handleHealthcare} style={{ marginBottom: "10px" }} />
									<Chip label="Sports" variant={sports} onClick={handleSports} style={{ marginBottom: "10px" }} />
								</Stack>
							</div>
						</Box>
					</AccordionDetails>
				</Accordion>
				<div>
					{/* {events
						.filter((item) => item.title.toLowerCase().includes(query))
						.map((item, i) => (
							<div key={i + 1}>

								<Link
									href={{
										pathname: "/events/details",
										query: { query: item._id },
									}}
								>
									<a>
										<div className="w-[300px] mb-[20px] bg-main2 rounded-[10px] py-[10px] px-[20px] hover:shadow-md">
											<div className="font-bold">{item.title}</div>
											<div>{item.description}</div>
										</div>
									</a>
								</Link>
							</div>
						))} */}

					<Typography variant="h3" style={{ alignContent: "center", fontWeight: "bolder" }}>
						Volunteer Works
					</Typography>
					<Table
						events={events}
						keyword={query}
						recruitmentStartDate={recruitmentStartDate}
						recruitmentEndDate={recruitmentEndDate}
						startDate={startDate}
						endDate={endDate}
						point={point}
						animal={animal}
						education={education}
						environment={environment}
						healthcare={healthcare}
						sports={sports}
					/>
				</div>
			</div>
		</div>
	);
}
