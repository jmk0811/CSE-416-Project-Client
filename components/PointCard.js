import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function PointCard(props) {
	const [workingDays, setWorkingDays] = useState(props.data);
	// const [user, setUser] = useState(props.user);
	// let today = new Date();
	// useEffect(() => {
	// 	let tmpData = data;
	// 	tmpData.sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate));

	// 	setData(tmpData);
	// }, []);

	// function handleCancleEvent(e) {
	// 	let tmp = data;
	// 	let tmpArr = [];
	// 	for (let i = 0; i < data.length; i++) {
	// 		if (data[i].Workid.title == e.target.name) {
	// 			continue;
	// 		} else {
	// 			tmpArr.push(data[i]);
	// 		}
	// 	}
	// 	setData(tmpArr);
	// }
	console.log(workingDays);
	return (
		<div className="flex flex-col sm:flex-row">
			{workingDays.map((v) => {
				return (
					<div>
						{v.registeredUsers.length != 0 ? (
							<Typography variant="h7" component="div">
								{new Date(v.date).toUTCString()}
								{v.registeredUsers.map((u) => {
									return (
										<div>
											{u.name} <button>approve</button>{" "}
										</div>
									);
								})}
							</Typography>
						) : (
							<div></div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PointCard;
