import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getEventByIdAPIMethod } from "../../../api/client";

export default function Index(props) {
	useEffect(() => {
		getEventByIdAPIMethod().then((res) => {
			console.log(res);
		});
	}, []);

	return (
		<div className="min-h-screen bg-bg1">
			<div className="max-w-[1000px] mx-auto p-[30px]">
				<div className="font-bold text-26 mb-[60px]">Event details</div>
			</div>
		</div>
	);
}
