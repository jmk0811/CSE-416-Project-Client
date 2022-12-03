import Sidebar from "../../../components/sideBar";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
function Point() {
	const [user, setUser] = useState({});
	const [data, setData] = useState([]);
	let tmp = [];
	useEffect(() => {
		var retrievedObject = JSON.parse(localStorage.getItem("userData"));
		setUser(retrievedObject);
		tmp = retrievedObject.myParticipant;
		console.log(tmp);
		// Array.from(tmp).sort(
		//     (a, b) =>
		//         new Date(b.ParticipationDate) - new Date(a.ParticipationDate)
		// );
		// console.log(
		//     Array.from(tmp).sort(
		//         (a, b) =>
		//             new Date(b.ParticipationDate) -
		//             new Date(a.ParticipationDate)
		//     )
		// );
		setData(Array.from(tmp).sort((a, b) => new Date(b.ParticipationDate) - new Date(a.ParticipationDate)));
	}, []);
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
			<div className="flex flex-col justify-center items-center p-[40px]">
				<Typography variant="h5" component="div">
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
		</div>
	);
}
export default Point;