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
						<li>1. Difficult to manage and keep track of lots of volunteer work records.</li>
						<li>2. These Records can be lost easily.</li> <li>3. Less motivation on volunteer work participation if there is no reward or compensation.</li>{" "}
						<li>4. Companies have difficult time finding volunteers.</li>
					</ul>
				</div>
				<div className="p-[10px] mt-[10px] border rounded">
					<Typography variant="h5" component="div" color="text.primary">
						Solutions we have
					</Typography>
					<ul className="mt-[30px]">
						<li>1. Records and certificates will be stored safely and be prevented from lost. </li> 
						<li>2. Rewards (points) will be given to the users.</li>
						<li>3. Companies can advertise and recruit volunteers easily.</li>
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
