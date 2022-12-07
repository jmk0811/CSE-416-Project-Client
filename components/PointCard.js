import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Checkbox from "@mui/material/Checkbox";

function PointCard(props) {
	const [workingDays, setWorkingDays] = useState(props.data);
	// const [user, setUser] = useState(props.user);
	// let today = new Date();
	// useEffect(() => {
	// 	let tmpData = data;
	// 	tmpData.sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate));

	// 	setData(tmpData);
	// }, []);

	console.log(workingDays);
	return (
		<div className="flex flex-col">
			<div className="flex flex-col ">
				{workingDays.map((v) => {
					return (
						<div className="flex flex-col">
							{v.registeredUsers.length != 0 ? (
								<div className="flex flex-col">
									<Typography variant="h5" component="div">
										{new Date(v.date).toUTCString().slice(0, 11)}
									</Typography>
									{v.registeredUsers.map((u) => {
										return (
											<div className="flex flex-row justify-between items-center">
												{u.name} <Checkbox>approve</Checkbox>{" "}
											</div>
										);
									})}
								</div>
							) : (
								<div />
							)}
						</div>
					);
				})}
			</div>
			<div />{" "}
		</div>
	);
}

export default PointCard;
