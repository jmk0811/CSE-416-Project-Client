import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createVolunteerWorkAPIMethod, logoutUserAPIMethod } from "../../api/client";
import Login from "../../pages/login";

export default function Header(props) {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const logout = () => {
		logoutUserAPIMethod().then(() => {
			props.setLogin(false);
		});
	};

	const getItemsDataWithQuery = (e) => {
		e.preventDefault();
		router.push({
			pathname: "/search",
			query: { query },
		});
	};

	// TODO: remove testing code

	const populateData = () => {
		const volunteerWorks = [
			{
				title: "Plogging event",
				description: "test description 1",
			},
			{
				title: "Medical event",
				description: "test description 2",
			},
			{
				title: "School event",
				description: "test description 3",
			},
		];

		volunteerWorks.map((event) => {
			console.log(event);
			createVolunteerWorkAPIMethod(event).then((res) => {
				console.log(res);
			});
		});
	};

	const [openLogin, setOpenLogin] = useState(false);

	const handleClickLogIn = () => {
		setOpenLogin(true);
	};
	const handleCloseLogin = () => {
		setOpenLogin(false);
	};

	return (
		<div className="z-50 w-full h-[60px] bg-main1 sticky top-0 flex flex-col px-[30px]">
			{openLogin ? <Login status={openLogin} close={handleCloseLogin} /> : null}
			<div className="flex flex-row my-auto mx-auto w-full max-w-[1400px] px-[20px]">
				<Link href="/">
					<a>
						<div className="mr-auto my-auto font-bold text-white text-22">Platform Logo</div>
					</a>
				</Link>
				<div className="flex flex-row mx-auto">
					<form onSubmit={getItemsDataWithQuery}>
						<div className="flex flex-row bg-main2 rounded-[10px] min-w-[400px] w-full px-[10px] py-[2px]">
							<button>
								<SearchIcon className="mt-[4px]" sx={{ color: "white" }} />
							</button>
							<input
								className="bg-transparent border-none outline-none text-white mt-[2px] px-[10px]"
								type="text"
								placeholder="Search"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
						</div>
					</form>
				</div>
				{props.login ? (
					<div className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14">
						<button className="">
							<Link href="/about">
								<a>ABOUT US</a>
							</Link>
						</button>
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
							<Link href="/about">
								<a>ABOUT US</a>
							</Link>
						</button>
						<button className="" onClick={handleClickLogIn}>
							{/* <Link href="/login">
								<a>LOGIN</a>
							</Link> */}
							LOGIN
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
