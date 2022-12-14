import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import PhoneInput from "react-phone-input-2";
import Typography from "@mui/material/Typography";
import { uploadImageToCloudinaryAPIMethod } from "../api/client";
function ProfileCustomer(props) {
	const [user, setUser] = useState(props.user);
	const [value, setValue] = useState([]);
	const [editMode, setEditMode] = useState(false);
	console.log(user);
	useEffect(() => {
		setUser(props.user);
		setValue(props.user.interests);
	}, [props.user]);

	console.log(user, value);

	const handleClick = (e) => {
		props.handleEdit(e, user);
		setEditMode(false);
	};

	const handleChangeValue = (prop) => (event) => {
		if (prop == "profile_url") {
			if (event.target.files && event.target.files[0]) {
				const selectedFile = event.target.files[0];

				const formData = new FormData();
				const unsignedUploadPreset = "v8dfxg1t";
				formData.append("file", selectedFile);
				formData.append("upload_preset", unsignedUploadPreset);

				console.log("Cloudinary upload");
				console.log(formData.file);
				uploadImageToCloudinaryAPIMethod(formData).then((response) => {
					console.log(response);
					setUser({ ...user, profile_url: response.url });
				});
			}
		} else {
			setUser({ ...user, [prop]: event.target.value });
		}
	};

	return (
		<div className="flex flex-col">
			{" "}
			<div className="row-justify-content-center">
				<div className="col-lg-8">
					<div className="max-w-[400px] -md:max-w-[200px]">
						<div className="flex flex-row justify-between">
							<Typography variant="h5" component="div">
								My Profile
							</Typography>
							{editMode ? (
								""
							) : (
								<button className="text-[17px]" onClick={() => setEditMode(!editMode)}>
									{" "}
									edit{" "}
								</button>
							)}
						</div>
						<form method="POST" action="#">
							<div>
								<div name="customerInfoForm" className=" flex flex-row form-group items-center jusitfy-center h-100% col-md-6 border m-[3px] ">
									<label
										name="customerInfoFormLabel"
										for="image"
										className="flex justify-center border items-center w-[120px] h-[100px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
									>
										Profile Image
									</label>
									<div name="customerInfoFormValue" className="flex flex-row  justify-center items-center md:flex-col" style={{ width: "240px" }}>
										<img
											className="avatar"
											src={
												user.profile_url == "" || user.profile_url == undefined
													? "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
													: user.profile_url
											}
											style={{ width: "70px", height: "70px", borderRadius: "50%" }}
										/>
										{editMode ? (
											<input
												id="file-upload"
												className="custom-file-upload"
												type="file"
												name="image"
												accept="image/*"
												id="cloudinary"
												onChange={handleChangeValue("profile_url")}
												className="max-w-[300px] flex items-center bg-transparent h-[30px] px-8 text-base border-[#4EA1D3]"
											/>
										) : (
											""
										)}
									</div>
								</div>
								<div name="customerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
									<label
										name="customerInfoFormLabel"
										for="iName "
										className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
									>
										Name
									</label>

									<input
										className="bg-transparent h-[40px] text-base border-[#4EA1D3]"
										type="text"
										id="iName"
										name="Name"
										value={user.name ? user.name : ""}
										style={{ alignItems: "center" }}
										onChange={handleChangeValue("name")}
										disabled={editMode ? false : true}
									/>
								</div>
								<div name="customerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
									<label
										name="customerInfoFormLabel"
										for="Email"
										className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
									>
										Email
									</label>

									<input type="text" id="iEmail" name="Email" value={user.email} className="bg-white h-[40px] text-base border-[#4EA1D3]" disabled />
								</div>

								<div name="customerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
									<label
										name="customerInfoFormLabel"
										for="userDateOfBirth"
										className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
									>
										Date of Birth
									</label>

									<input
										className="bg-white w-[190px] h-[40px] text-base border-[#4EA1D3]"
										type="date"
										value={user.dateOfBirth}
										name="DOB"
										id="datepicker"
										disabled
									/>
								</div>
								<div name="customerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
									<label
										name="customerInfoFormLabel"
										for="userOhoneNumber"
										className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
									>
										Phone number
									</label>
									<div className="phoneContainer">
										<PhoneInput
											country={"us"}
											name="phoneNumber"
											value={user.phoneNumber ? user.phoneNumber.toString() : ""}
											className="w-[250px] bg-white"
											onChange={(v) => setUser({ ...user, phoneNumber: v })}
											disabled={editMode ? false : true}
										/>
									</div>
								</div>

								<div name="customerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
									<label
										name="customerInfoFormLabel"
										for="userInterest"
										className="flex justify-center items-center w-[120px] h-100% font-bold text-[15px] border bg-slate-200 mr-[10px]"
										style={{ height: "25vh" }}
									>
										Interests
									</label>
									<br />

									<Sheet
										name="interest"
										variant="outlined"
										sx={{
											width: 200,
											p: 2,
											borderRadius: "sm",
											borderColor: "#CACACA",
										}}
									>
										<Box role="group" aria-labelledby="rank">
											<List
												row
												wrap
												sx={{
													"--List-gap": "8px",
													"--List-item-radius": "20px",
													"--List-item-minHeight": "32px",
												}}
											>
												{["Education", "Animal", "Environment", "Healthcare", "Sports"].map((item, index) => (
													<ListItem key={item}>
														{value != undefined && Array.from(value).includes(item) && (
															<Done
																fontSize="md"
																color="primary"
																sx={{
																	ml: -0.5,
																	mr: 0.5,
																	zIndex: 2,
																	pointerEvents: "none",
																}}
															/>
														)}
														<Checkbox
															disabled={editMode ? false : true}
															size="sm"
															disableIcon
															overlay
															label={item}
															checked={user.interests != undefined && Array.from(user.interests).includes(item)}
															variant={user.interests != undefined && Array.from(user.interests).includes(item) ? "soft" : "outlined"}
															onChange={(event) => {
																if (event.target.checked) {
																	setValue((val) => [...val, item]);
																	setUser({ ...user, interests: [...value, item] });
																} else {
																	setValue((val) => val.filter((text) => text !== item));

																	setUser({ ...user, interests: value.filter((text) => text !== item) });
																}
															}}
															componentsProps={{
																action: ({ checked }) => ({
																	sx: checked
																		? {
																				border: "1px solid",
																				borderColor: "primary.500",
																		  }
																		: {},
																}),
															}}
														/>
													</ListItem>
												))}
											</List>
										</Box>
									</Sheet>
								</div>
							</div>
							{!editMode ? (
								""
							) : (
								<div className="flex flex-col items-center justify-center p-[30px]">
									<div className="bg-[#4EA1D3] w-[100px] rounded">
										<button onClick={handleClick} type="submit">
											<div id="ConfirmButton" className="flex text-[25px] font-sans text-white text-center decoration-8" style={{ margin: "auto" }}>
												Confirm
											</div>
										</button>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCustomer;
