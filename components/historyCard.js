import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function HistoryCard(props) {
	const [data, setData] = useState(props.data);
	let today = new Date();
	useEffect(() => {
		let tmpData = data;
		tmpData.sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate));

		setData(tmpData);
	}, []);
	function handleCancleEvent(e) {
		let tmp = data;
		let tmpArr = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].Workid.title == e.target.name) {
				continue;
			} else {
				tmpArr.push(data[i]);
			}
		}
		setData(tmpArr);
		console.log(tmp, data);
	}
	return (
		<div className="flex flex-col sm:flex-row">
			{" "}
			{data.map((v, idx) => {
				return (
					<Card
						sx={{
							minWidth: 275,
							margin: "5px",
							dispaly: "flex",
							flexDirection: "column",
						}}
					>
						{" "}
						<CardContent>
							<Typography variant="h5" component="div">
								{v.Workid.title}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								<CurrencyExchangeIcon />
								{v.Workid.point}
							</Typography>{" "}
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{v.ParticipationDate}
							</Typography>
							<Typography variant="body2">{v.Workid.description}</Typography>
							{new Date(v.ParticipationDate) > today ? (
								<CardActions>
									<Button
										size="small"
										onClick={handleCancleEvent}
										name={v.Workid.title} //나중에 key로 바꾸기
									>
										Cancle
									</Button>
								</CardActions>
							) : (
								""
							)}{" "}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

export default HistoryCard;
