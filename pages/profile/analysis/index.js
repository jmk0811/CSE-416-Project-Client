import { withRouter } from "next/router";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Link from "next/link";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sideBar";

function Analysis({ router: { query } }) {
	const user = JSON.parse(query.user);
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log("run");
		for (let i = 0; i < user.myParticipant.length; i++) {
			const tmpDate = new Date(user.myParticipant[i].ParticipationDate);
			// console.log(date);

			setData(data.push(tmpDate));
		}
	}, []);
	const new_dates = data.sort(function (a, b) {
		return b.getTime() - a.getTime();
	});
	console.log(new_dates);
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
										<Link
											href={{
												pathname: "/profile2",
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
								<div>
									<Link
										href={{
											pathname: "/profile2/analysis",
											query: {
												user: JSON.stringify(user),
											},
										}}
									>
										Analysis
									</Link>
								</div>
								<div>
									<Link
										href={{
											pathname: "/profile2/history",
											query: {
												user: JSON.stringify(user),
											},
										}}
									>
										History
									</Link>
								</div>
								<div>
									<Link
										href={{
											pathname: "/profile2/points",
											query: {
												user: JSON.stringify(user),
											},
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
		</div>
	);
}
export default withRouter(Analysis);
