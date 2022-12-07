import * as React from "react";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from "@mui/x-data-grid";

import { useRouter } from "next/router";

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarDensitySelector />
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

export default function Table() {
	const router = useRouter();
	const handleEvent = (e) => {
		// router.push(`/work/${e.id}`); subfolder 하는 방법 알아보기
		router.push(`/work`);
	};

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
		{
			id: 2,
			name: "Name2",
			description: "This is Work Name 2 helping animals blah",
			holder: "name2 Company",
			RecruitmentStart: "2022.12.15",
			RecruitmentEnd: "2022.13.15",
			VolunteeringStart: "2022.12.15",
			VolunteeringEnd: "2022.12.20",
			Address: "somethingelse street",
			tag: ["animal", "tag2"],
			point: 20,
		},
	];

	return (
		<div style={{ height: "50vh", width: "100%" }}>
			<DataGrid
				onRowClick={handleEvent}
				columns={[
					{ field: "name", width: 200, headerName: "Title" },
					{ field: "RecruitmentStart", headerName: "Apply Start" },
					{ field: "RecruitmentEnd", headerName: "Apply End" },
					{ field: "VolunteeringStart", headerName: "Work Start" },
					{ field: "VolunteeringEnd", headerName: "Work End" },
				]}
				rows={data}
				components={{ Toolbar: CustomToolbar }}
				style={{ marginTop: "20px" }}
			/>
		</div>
	);
}
