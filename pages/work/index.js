import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
// import MainBanner from "../../components/carousel/MainBanner";
// import Footer from "../main/Footer";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

export default function Work() {
	// 'Values' will be changed by connecting to database
	const data = [
		{
			id: 1,
			name: "Name1",
			description: "This is Work Name 1",
			holder: "name1 Company",
			RecruitmentStart: "2022.02.10",
			RecruitmentEnd: "2022.03.10",
			VolunteeringStart: "2022.03.15",
			VolunteeringEnd: "2022.03.20",
			Address: "something something street",
			tag: ["trash", "tag1"],
			point: 10,
		},
	];

	const headingStyle = {
		readOnly: true,
		style: { fontSize: 30 },
	};

	const bodyStyle = {
		readOnly: true,
		style: { fontSize: 20 },
	};

	const handleEdit = () => {
		// 이 글을 작성한 관계자가 맞으면
		// /workEdit/{work_id}로 링크 바꿔주면 됩니다
	};

	return (
		<Box display="flex" flexDirection="column">
			{/* <MainBanner/> */}

			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" alignSelf="center" width="md">
				<Box display="flex" flexDirection="column" alignItems="left" justifyContent="center" maxWidth="md" width="md" p={{ xs: 1, sm: 2, md: 0 }}>
					<Box width="80vw" maxWidth="md" height="75vh" maxHeight="75vh">
						{/* style={{border: '1px solid red'}} */}
						<div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px", paddingTop: "10px" }}>
							<EditIcon fontSize="large" onClick={handleEdit} />
						</div>

						<TextField fullWidth style={{ marginTop: "20px" }} InputProps={headingStyle} value="Title Title of the volunteer work" />

						<div style={{ marginTop: "10px", marginBottom: "10px", fontFamily: "'Noto Sans KR', sans-serif" }}>
							<Typography>
								Recruitment: {data[0].RecruitmentStart} ~ {data[0].RecruitmentEnd}
							</Typography>
							<Typography>
								Volunteer Work: {data[0].VolunteeringStart} ~ {data[0].VolunteeringEnd}
							</Typography>
						</div>

						<TextField fullWidth multiline rows={14} style={{ marginTop: "10px" }} InputProps={bodyStyle} value={data[0].description} />
						<Link href="/apply">
							<a>
								<Button variant="contained" style={{ backgroundColor: "skyblue", marginTop: "20px", marginBotton: "20px" }}>
									<Typography
										variant={{ md: "h5", sm: "body1" }}
										style={{ display: "flex", justifyContent: "center", flexDirection: "column", color: "black", width: "100px", height: "30px" }}
									>
										Apply
									</Typography>
								</Button>
							</a>
						</Link>
					</Box>
					{/* <Footer/>  */}
				</Box>
			</Box>
		</Box>
	);
}
