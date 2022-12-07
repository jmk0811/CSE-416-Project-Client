import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
						.map((item) => (
							<div className="mb-[20px]">
								<div className="font-bold">{item.title}</div>
								<div>{item.description}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
