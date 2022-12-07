import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVolunteerWorksAPIMethod } from "../../api/client";

export default function Index(props) {
	const [volunteerWorks, setVolunteerWorks] = useState([]);
	const [query, setQuery] = useState("");
	const router = useRouter();

	useEffect(() => {
		setQuery(router.query.query?.toLowerCase());
	}, [router.query.query]);

	useEffect(() => {
		getVolunteerWorksAPIMethod().then((res) => {
			setVolunteerWorks(res);
		});
	}, []);

	return (
		<div className="px-[100px] pt-[100px]">
			<div className="mb-[100px] text-24 font-bold">search page</div>
			<div>
				{volunteerWorks
					.filter((item) => item.title.toLowerCase().includes(query))
					.map((item) => (
						<div className="mb-[20px]">
							<div className="font-bold">{item.title}</div>
							<div>{item.description}</div>
						</div>
					))}
			</div>
		</div>
	);
}
