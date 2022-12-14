import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { getEventByIdAPIMethod, updateEventAPIMethod, updateUserAPIMethod } from "../../../api/client";

export default function Index(props) {
	const [data, setDate] = useState();
	const [eventId, setEventId] = useState(props.query.query);
	const [timeSlots, setTimeSlots] = useState([]);
	const router = useRouter();

	useEffect(() => {
		getEventByIdAPIMethod(props.query.query)
			.then((res) => {
				setEventId(props.query.query);
				setDate(res);
				setTimeSlots(res.timeSlots);
			})
			.catch((err) => {
				alert("Please Login First");
				router.push("/");
			});
	}, []);

	const [isChecked, setIsChecked] = React.useState(() => timeSlots.map((i) => false));
	useEffect(() => {
		setIsChecked(timeSlots.map((i) => false));
	}, [timeSlots]);

	const [name, setName] = React.useState("");
	useEffect(() => {
		setName(props.currUser.name);
	}, [props.currUser]);

	const handleNameChange = (e) => {};
	const [email, setEmail] = React.useState("");
	useEffect(() => {
		setEmail(props.currUser.email);
	}, [props.currUser]);

	const handleEmailChange = (e) => {};
	const [contactNumber, setContactNumber] = React.useState("");
	useEffect(() => {
		setContactNumber(props.currUser.phoneNumber);
	}, [props.currUser]);

	const handleNumberChange = (e) => {};

	const [term, setTerm] = React.useState(false);
	const handleTermClick = (e) => {
		setTerm(e.target.checked);
	};
	const handleApply = () => {
		if (term === false) {
			return alert("Please Check our terms before applying");
		}
		if (isChecked.indexOf(true) === -1) {
			return alert("Please select the time slot");
		}

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
			events: [...props.currUser.events, eventId],
		};

		updateUserAPIMethod(props.currUser, newUser).then((res) => {
			console.log(res);
		});

		const tempTimeSlots = [...timeSlots];
		isChecked.map((bool, i) => {
			if (bool) {
				tempTimeSlots[i].registeredUsers.push(props.currUser._id);
			}
		});

		const newEvent = {
			title: data?.title,
			description: data?.description,
			holder: data?.holder,
			recruitmentStartDate: data?.recruitmentStartDate,
			recruitmentEndDate: data?.recruitmentEndDate,
			eventStartDate: data?.eventStartDate,
			eventEndDate: data?.eventEndDate,
			thumbnail: data?.thumbnail,
			image: data?.image,
			address: data?.address,
			point: data?.point,
			timeSlots: [...tempTimeSlots],
		};

		updateEventAPIMethod(data, newEvent).then((res) => {
			console.log(res);
		});

		alert("Your reservation has been successful. Thank you for volunteering!");
		router.push(`/`);
	};

	const isCheckboxChecked = (index, checked) => {
		setIsChecked((isChecked) => {
			return isChecked.map((c, i) => {
				if (i === index) return checked;
				return c;
			});
		});
	};

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	const dateStyle = {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "200px",
		border: "1px solid red",
	};

	return (
		<Box display="flex" flexDirection="column">
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" alignSelf="center" width="md">
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" maxWidth="md" width="md" p={{ xs: 1, sm: 2, md: 0 }}>
					<div className="flex flex-col">
						<div className="mx-auto text-28 font-bold my-[50px]">{data?.title}</div>
						<div className="mx-auto text-20">
							Recruitment Period: {new Date(data?.recruitmentStartDate).toLocaleDateString()} ~ {new Date(data?.recruitmentEndDate).toLocaleDateString()}
						</div>
						<div className="mx-auto text-20">
							Volunteering Period: {new Date(data?.eventStartDate).toLocaleDateString()} ~ {new Date(data?.eventEndDate).toLocaleDateString()}
						</div>
						<div className="mx-auto text-20" style={{ marginTop: "20px" }}>
							Address: {data?.address}{" "}
						</div>
						<div className="mx-auto text-20">Points: {data?.point} </div>
						<div className="mx-auto text-20 my-[20px] mb-[100px]">{data?.description}</div>
						<div className="">{data?.image && <img className="w-full h-full object-cover" src={data?.image} />}</div>
					</div>
					<Box width="80vw" maxWidth="md" height="40vh" maxHeight="75vh" overflow="scroll" style={{ marginTop: "20px" }}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={1} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
								{timeSlots.map((item, i) => (
									<Grid item xs={5} sm={1.7} md={0} style={{ display: "flex", flexWrap: "wrap", minWidth: "200px" }}>
										{item.registerLimit > item.registeredUsers?.length ? (
											<Item style={dateStyle}>
												<FormControlLabel
													key={i + item.name}
													label={formatDate(item)}
													control={<Checkbox checked={isChecked[i]} onChange={(e) => isCheckboxChecked(i, e.target.checked)} />}
												/>
											</Item>
										) : null}
									</Grid>
								))}
							</Grid>
						</Box>
					</Box>
					<Box display="flex" flexWrap="wrap" flexDirection="column" justifyContent="center" alignItems="center" width="80vw" maxWidth="md">
						<Typography style={{ fontSize: "30px" }}> Application Information </Typography>
						<Typography>If your information does the match the following, please change the information on your profile page before applying</Typography>

						<div style={{ display: "flex", flexWrap: "wrap", maxWidth: "md" }}>
							<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px", width: "250px" }}>
								<Typography style={{ fontSize: "20px", marginRight: "10px" }}> Name: </Typography>
								<TextField
									id="outlined-basic"
									variant="outlined"
									style={{ marginBottom: "10px", marginTop: "10px" }}
									value={name}
									onChange={handleNameChange}
								/>
							</div>

							<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px", width: "250px" }}>
								<Typography style={{ fontSize: "20px", marginRight: "10px" }}> Email: </Typography>
								<TextField
									id="outlined-basic"
									variant="outlined"
									style={{ marginBottom: "10px", marginTop: "10px" }}
									value={email}
									onChange={handleEmailChange}
								/>
							</div>

							<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "250px" }}>
								<Typography style={{ fontSize: "20px", marginRight: "10px" }}> Number: </Typography>
								<TextField
									id="outlined-basic"
									variant="outlined"
									style={{ marginBottom: "10px", marginTop: "10px" }}
									value={contactNumber}
									onChange={handleNumberChange}
								/>
							</div>
						</div>

						<div style={{ display: "flex", flexDirection: "column" }}>
							<Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<Checkbox checked={term} onChange={handleTermClick} />{" "}
								<Typography>Check the box to indicate that you have read and agreed to the terms presented by Nanum</Typography>
							</Box>

							<Button
								className={"mb-[200px]"}
								variant="contained"
								style={{
									display: "flex",
									justifyContent: "center",
									alignSelf: "center",
									backgroundColor: props.currUser.type == "Organization" ? "grey" : "skyblue",
									marginTop: "20px",
									marginBotton: "20px",
									maxWidth: "100px",
								}}
								onClick={handleApply}
								disabled={props.currUser.type == "Organization" ? true : false}
							>
								<Typography
									variant={{ md: "h5", sm: "body1" }}
									style={{ display: "flex", justifyContent: "center", flexDirection: "column", color: "black", width: "100px", height: "30px" }}
								>
									Apply
								</Typography>
							</Button>
						</div>
					</Box>
				</Box>
			</Box>
		</Box>
	);

	function formatDate(input) {
		const date = new Date(input.startTime);
		const occupy = input.registerLimit;
		const registered = input.registeredUsers.length;
		if (date.getMinutes() < 10)
			return (
				<div>
					<div>
						{" "}
						{date.getMonth() + 1}/{date.getDate()}{" "}
					</div>
					<div>
						{" "}
						{date.getHours()}:0{date.getMinutes()}{" "}
					</div>
					{occupy - registered == 1 ? <div> {occupy - registered} slot available </div> : <div> {occupy - registered} slots available </div>}
				</div>
			);
		return (
			<div>
				<div>
					{" "}
					{date.getMonth() + 1}/{date.getDate()}{" "}
				</div>
				<div>
					{" "}
					{date.getHours()}:{date.getMinutes()}{" "}
				</div>
				{occupy - registered == 1 ? <div> {occupy - registered} slot available </div> : <div> {occupy - registered} slots available </div>}
			</div>
		);
	}
}

export const getServerSideProps = (context) => {
	return {
		props: {
			query: context.query,
		},
	};
};
