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
		router.push({
			pathname: "/",
		});
	};

	const getItemsDataWithQuery = (e) => {
		e.preventDefault();
		router.push({
			pathname: "/events",
			query: { query },
		});
	};

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
		localStorage.removeItem("page");
		setOpenLogin(false);
	};

	return (
		<div
			className="z-50 w-full h-[60px] bg-main1 sticky top-0 flex flex-col px-[30px] hidescroll"
			style={{ minWidth: "98vw", display: "flex", flexWrap: "wrap", overflow: "scroll" }}
		>
			{openLogin ? <Login status={openLogin} close={handleCloseLogin} setLogin={props.setLogin} /> : null}
			<div className="flex flex-row my-auto mx-auto w-full px-[20px]">
				<Link href="/">
					<a>
						<div className="mr-auto my-auto font-bold text-white">
							<img className={"w-[50px] h-[50px]"} src={"/asset/logo.png"} />
						</div>
					</a>
				</Link>
				{props.currUser?.type === "Organization" && (
					<button className={"mx-auto my-auto text-white font-semibold"} style={{ marginLeft: "30px" }}>
						<Link href={"/workUpload"}>
							<a>Create Event</a>
						</Link>
					</button>
				)}
				<div className="flex flex-row mx-auto" style={{ justifyContent: "center", alignItems: "center" }}>
					<form onSubmit={getItemsDataWithQuery}>
						<div
							className="flex flex-row bg-main2 rounded-[10px] px-[10px] py-[2px]"
							style={{ display: "flex", width: "40vw", marginLeft: "20px", marginRight: "10px" }}
						>
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
					<div
						className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14"
						style={{ border: "1px solid white", borderRadius: "10px", padding: "5px", marginRight: "20px" }}
					>
						<button className="">
							<Link href="/events?query=">
								<a>SEE MORE</a>
							</Link>
						</button>
					</div>
				</div>
				{props.login ? (
					<div className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14">
						<button className="">
							<Link href="/about">
								<a>ABOUT US</a>
							</Link>
						</button>
						<button className="" onClick={() => {localStorage.clear()}}>
							<Link href="/profile">
								<a>PROFILE</a>
							</Link>
						</button>
						<button onClick={logout} style={{ marginRight: "30px" }}>
							LOGOUT
						</button>
					</div>
				) : (
					<div className="ml-auto my-auto flex flex-row gap-x-[20px] font-semibold text-white text-14">
						<button className="">
							<Link href="/about">
								<a>ABOUT US</a>
							</Link>
						</button>
						<button className="" onClick={handleClickLogIn}>
							LOGIN
						</button>
						<button className="" style={{ marginRight: "30px" }}>
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
