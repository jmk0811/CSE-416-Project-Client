import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Modal(props) {
    const no = () => {}

	const submit = () => {
		confirmAlert({
			title: "Confirm to cancel",
			message: "Are you sure you want to cancel?",
			buttons: [
				{
					label: "Yes",
					onClick: () => props.cancelEvent(),
				},
				{
					label: "No",
					onClick: () => no(),
				},
			],
		});
	};
	return (
		<div className="container">
			<button className="w-[100px] h-[40px] rounded-[10px] bg-red-600 text-white mt-[200px]" onClick={submit}>Cancel</button>
		</div>
	);
}
