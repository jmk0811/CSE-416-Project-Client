import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getEventsAPIMethod } from "../../api/client";

export default function Index(props) {
	const [events, setEvents] = useState([]);
	const [query, setQuery] = useState("");
	const router = useRouter();

	useEffect(() => {
		setQuery(router.query.query?.toLowerCase());
	}, [router.query.query]);

	useEffect(() => {
		getEventsAPIMethod().then((res) => {
			console.log(res);
			setEvents(res);
		});
	}, []);

	return (
		<div className="min-h-screen bg-bg1">
			<div className="max-w-[1000px] mx-auto p-[30px]">
				<div className="font-bold text-26 mb-[60px]">Search for events</div>
				<div>
					{events
						.filter((item) => item.title.toLowerCase().includes(query))
						.map((item, i) => (
							<div key={i + 1}>
								{/* TODO: change to dynamic route */}
								<Link
									href={{
										pathname: "/events/details",
										query: { query: item._id },
									}}
								>
									<a>
										<div className="w-[300px] mb-[20px] bg-main2 rounded-[10px] py-[10px] px-[20px] hover:shadow-md">
											<div className="font-bold">{item.title}</div>
											<div>{item.description}</div>
										</div>
									</a>
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
