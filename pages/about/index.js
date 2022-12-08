import Typography from "@mui/material/Typography";

function About() {
	return (
		<div className="flex flex-col items-center justify-center p-[30px]">
			<div className="p-[10px]">
				<Typography variant="h3" component="div">
					About Us!
				</Typography>
			</div>
			<div>
				<div className="p-[10px] mt-[10px] border rounded">
					<Typography variant="h5" component="div">
						{" "}
						Problems We Want to Solve!
					</Typography>
					<ul className="mt-[30px]">
						<li>1. Hard to get information about different kinds of volunteer works comprehensively. </li>
						<li>2. Hard to manage and keep track of records</li> <li>3. Volunteer work records can be lost easily</li>{" "}
						<li>4. Less motivation to join volunteer works</li>
					</ul>
				</div>
				<div className="p-[10px] mt-[10px] border rounded">
					<Typography variant="h5" component="div" color="text.primary">
						Solutions we have
					</Typography>
					<ul className="mt-[30px]">
						<li>1. Make a platform that has various volunteer events. </li> <li>2. Show and provide well design displayed schedule of volunteer record. </li>
						<li>3. Store volunteer work histories online</li> <li>4. Add rewards when the users participate in the volunteer works</li>
					</ul>{" "}
				</div>
				<div className="p-[10px] mt-[10px] border rounded">
					<Typography variant="h5" component="div">
						Members
					</Typography>
					<ul className="mt-[30px]">
						<li>
							<div>
								Minki Jeon
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									minki.jeon@stonybrook.edu
								</Typography>
							</div>
						</li>{" "}
						<li>
							<div>
								Suhyun Chun{" "}
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									suhyun.chun@stonybrook.edu
								</Typography>
							</div>
						</li>
						<li>
							<div>
								Sangwoo Park
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									sangwoo.park.2@stonybrook.edu
								</Typography>
							</div>
						</li>{" "}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default About;
