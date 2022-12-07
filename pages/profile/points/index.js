import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Sidebar from "../../../components/sideBar";
import PointCard from "../../../components/PointCard";

function Point() {
	const [user, setUser] = useState({});
	const [data, setData] = useState([]);

	let tmp = [];
	useEffect(() => {
		setData([]);
		const retrievedObject = JSON.parse(localStorage.getItem("userData"));
		setUser(retrievedObject);
		if (user.type == "user") {
			tmp = retrievedObject.myParticipant;
			setData(Array.from(tmp).sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate)));
		} else {
			tmp = retrievedObject.volunteerWorks;
			if (tmp != undefined) {
				for (let i = 0; i < tmp.length; i++) {
					// console.log(tmp[i]);
					const workingDays_data = Array.from(tmp[i].workingDays).sort((a, b) => new Date(b.date) - new Date(a.date));
					const tmp_obj = { title: tmp[i].title, workingDays: workingDays_data };
					const tmp_data = data;

					tmp_data.push(tmp_obj);
					setData(tmp_data);
				}
			}
			//

			// console.log(Array.from(tmp_obj.workingDays).sort((a, b) => new Date(b.date) - new Date(a.date)));
		}
	}, []);
	function handleConfirm(e) {
		console.log("update to backend ");
	}
	console.log(user, data);
	return (
		<div>
			{" "}
			<Sidebar width={320}>
				<div className="mx-auto text-[30px] font-bold">
					<div>
						<div>
							<div className="flex flex-col w-full p-[40px] items-center">
								<div className="relative flex w-[80px] h-[80px] bg-cover bg-center rounded-full">
									{user.profileImg == "" ? (
										<img
											className="w-[80px] h-[80px] bg-cover bg-center rounded-full"
											src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
										/>
									) : (
										<div>
											<img className="w-[70px] h-[70px] rounded-full" src={user.profileImg} />
										</div>
									)}
									<div className="absolute top-10 left-27 right-1 bg-white p-[3px] border rounded-full text-[15px] hover:text-[#1976d2]">
										<Link href="/profile">
											<CameraAltIcon color="action" className="hover:text-[#1976d2]" />
										</Link>
									</div>
								</div>

								<div className=" text-[18px]">{user.name}</div>
								<div className="text-[#767676] text-[14px]">
									<CurrencyExchangeIcon />
									{user.points}
								</div>
							</div>
							<div>
								{/* <div>
                                    <Link
                                        href={{
                                            pathname: '/profile2/analysis',
                                            // query: {
                                            //     user: JSON.stringify(user),
                                            // },
                                        }}
                                    >
                                        Analysis
                                    </Link>
                                </div> */}
								<div>
									<Link
										href={{
											pathname: "/profile/history",
											// query: {
											//     user: JSON.stringify(user),
											// },
										}}
									>
										History
									</Link>
								</div>
								<div>
									<Link
										href={{
											pathname: "/profile/points",
											// query: {
											//     user: JSON.stringify(user),
											// },
										}}
									>
										Points
									</Link>
								</div>

								<div>logout</div>
							</div>
						</div>
					</div>
				</div>
			</Sidebar>
			{user.type == "user" ? (
				<div className="flex flex-col justify-center items-center p-[40px]">
					<Typography variant="h3" component="div">
						Points
					</Typography>
					{Array.from(data).map((v, idx) => {
						return (
							<Card
								sx={{
									minWidth: 400,
									maxWidth: 700,
									margin: "5px",
									alignItems: "center",
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
										+{v.Workid.point}
									</Typography>{" "}
									<Typography sx={{ mb: 1.5 }} color="text.secondary">
										{v.ParticipationDate}
									</Typography>
								</CardContent>
							</Card>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col justify-center items-center p-[40px]">
					{data.map((v) => {
						return (
							<div className="flex flex-col">
								<Typography variant="h3" component="div">
									{v.title}
								</Typography>
								<div className="flex flex-col">
									<PointCard data={v.workingDays} />
								</div>
							</div>
						);
					})}{" "}
					<button className="mt-6" onClick={handleConfirm}>
						{" "}
						Confirm{" "}
					</button>
				</div>
			)}
		</div>
	);
}

export default Point;
