import Sidebar from "../../../components/sideBar";
import { withRouter } from "next/router";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Link from "next/link";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect, useState } from "react";
import HistoryCard from "../../../components/historyCard";
import Typography from "@mui/material/Typography";
function History() {
	const [user, setUser] = useState({});
	const [type, setType] = useState("");
	const [logs, setLogs] = useState([]);
	const [years, setYears] = useState([]);

	var tmp = [];
	var tmp_year = [];
	var arr = [];

	useEffect(() => {
		var retrievedObject = JSON.parse(localStorage.getItem("userData"));
		setUser(retrievedObject);
		setType(retrievedObject.type);

		for (let i = 0; i < retrievedObject.myParticipant.length; i++) {
			// if (logs[i] != undefined) {
			var year = new Date(retrievedObject.myParticipant[i].ParticipationDate).getFullYear();
			// if (year != NaN) {
			if (tmp[year] != undefined) {
				//console.log(tmp);
				arr = tmp;
				arr[year].push(retrievedObject.myParticipant[i]);
				arr[year] = arr[year].sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate));

				setLogs(arr);
			} else {
				//console.log(year);
				arr = tmp;
				arr[year] = [retrievedObject.myParticipant[i]];
				setLogs(arr);
				tmp_year.push(year);
				setYears(tmp_year);
			}
		}
	}, []);
	console.log(years, logs);
	return (
		<div>
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
										<Link
											href={{
												pathname: "/profile",
											}}
										>
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
			{user == {} ? (
				<div>loading</div>
			) : (
				<div className="flex flex-col justify-center items-center p-[40px]">
					<div>
						{" "}
						{Array.from(years)
							.sort()
							.reverse()
							.map((v, idx) => {
								return (
									<div>
										<div className="m-[5px]">
											<Typography variant="h5" component="div">
												{v}
												{v == new Date().getFullYear() && type == "company" ? <button>+</button> : ""}
											</Typography>
											<div className="p-[7px]">
												<HistoryCard data={logs[v]} />
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
export default History;
