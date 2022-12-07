import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./sidebar.module.css";

function Sidebar({ width = 330, children }) {
	const [isOpen, setOpen] = useState(false);
	const [xPosition, setX] = useState(-width);
	const side = useRef();

	const toggleMenu = () => {
		if (xPosition < 0) {
			setX(0);
			setOpen(true);
		} else {
			setX(-width);
			setOpen(false);
		}
	};

	const handleClose = async (e) => {
		const sideArea = side.current;
		const sideCildren = side.current.contains(e.target);
		console.log(sideArea, sideCildren);
		if (isOpen && (!sideArea || !sideCildren)) {
			await setX(-width);
			await setOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleClose);
		return () => {
			window.removeEventListener("click", handleClose);
		};
	});

	return (
		<div className={styles.container}>
			<div
				ref={side}
				className={styles.sidebar}
				style={{
					width: `${width}px`,
					height: "100%",
					transform: `translatex(${xPosition}px)`,
				}}
			>
				<button onClick={() => toggleMenu()} className={styles.button}>
					{isOpen ? <span>X</span> : <span style={{ fontSize: "11px" }}> MENU</span>}
				</button>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
}

export default Sidebar;
