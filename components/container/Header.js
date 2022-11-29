import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { logoutUserAPIMethod } from "../../api/client";

export default function Header(props) {
	const logout = () => {
		logoutUserAPIMethod().then(() => {
			props.setLogin(false);
		});
	};

	return (
		<div className="z-50 w-full h-[60px] bg-main1 sticky top-0 flex flex-col px-[30px]">
			<div className="flex flex-row my-auto mx-auto w-full max-w-[1400px] px-[20px]">
				<Link href="/">
					<a>
						<div className="mr-auto my-auto font-bold text-white text-22">Platform Logo</div>
					</a>
				</Link>
				<div className="flex flex-row mx-auto">
					<div className="flex flex-row bg-main2 rounded-[10px] min-w-[400px] w-full px-[10px]">
						<SearchIcon className="mt-[4px]" sx={{ color: "white" }} />
						<input className="bg-transparent border-none outline-none text-white mt-[2px] px-[10px]" type="text" placeholder="Search" />
					</div>
				</div>
				{props.login ? (
					<div className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14">
						<button className="">
							<Link href="/profile">
								<a>PROFILE</a>
							</Link>
						</button>
						<button onClick={logout}>LOGOUT</button>
					</div>
				) : (
					<div className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14">
						<button className="">
							<Link href="/login">
								<a>LOGIN</a>
							</Link>
						</button>
						<button className="">
							<Link href="/signup">
								<a>SIGN UP</a>
							</Link>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
