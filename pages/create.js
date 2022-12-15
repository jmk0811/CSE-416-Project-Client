import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { createEventAPIMethod, updateUserAPIMethod } from "../api/client";

export default function index(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const event = {
			title,
			description,
			holder: props.currUser._id,
			recruitmentStartDate: Temporal.PlainDateTime.from("2022-12-05T09:00:00"),
			recruitmentEndDate: Temporal.PlainDateTime.from("2022-12-09T18:00:00"),
			eventStartDate: Temporal.PlainDateTime.from("2022-12-12T09:00:00"),
			eventEndDate: Temporal.PlainDateTime.from("2022-12-16T18:00:00"),
			thumbnail: "",
			image: "",
			address: "",
			point: 10,
			timeSlots: testTimeSlots,
		};

		let eventId;

		createEventAPIMethod(event).then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="min-h-screen bg-bg1">
			<div className="max-w-[1000px] mx-auto">
				<form className="flex flex-col p-[30px]">
					<div className="font-bold text-26 mb-[20px]">Create an event</div>
					<div className="flex flex-col mb-[20px]">
						<label className="font-semibold mb-[5px]">Title</label>
						<input className="" value={title} onChange={(e) => setTitle(e.target.value)} />
					</div>
					<div className="flex flex-col mb-[20px]">
						<label className="font-semibold mb-[5px]">Description</label>
						<textarea className="resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
					</div>
					<button className="mx-auto mt-[30px] font-bold" onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
