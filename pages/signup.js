import react, { useEffect, useState } from "react";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { registerUserAPIMethod, uploadImageToCloudinaryAPIMethod } from "../api/client";
import "react-phone-input-2/lib/style.css";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import { useRouter } from "next/router";

export default function SignUp(props) {
	const [profileUrl, setProfileUrl] = useState("");
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [userId, setUserId] = useState("");
	const [pw, setPw] = useState();
	const router = useRouter();

	const [addr1, setAddr1] = useState("");
	const [addr2, setAddr2] = useState("");
	const [type, setType] = useState("User");
	const [gender, setGender] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [SSN, setSSN] = useState(0);
	const [error, setError] = useState();
	const [value, setValue] = useState([]);

	useEffect(() => {
		setProfileUrl(profileUrl);
	}, [profileUrl]);
	useEffect(() => {
		setError(error);
	}, [error]);

	const testRegister = (e) => {
		e.preventDefault();

		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(pw)) {
			// password validation
			if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
				// email validation
				const user1 = {
					name,
					email,
					password: pw,
					type,

					address1: addr1,
					approvedEvents: [],
					profileUrl,
					gender,
					dateOfBirth,
					phoneNumber,
					events: [],
					interests: value,
				};

				registerUserAPIMethod(user1).then((ret) => {
					if (ret) {
						props.setLogin(true);
						router.push({
							pathname: "/",
						});
					} else {
						setError("Invalid information. Properly fill out the information");
						alert("Invalid information. Properly fill out the information");
					}
				});
			} else {
				setError("Invalid email format");
				alert("Invalid email format");
			}
		} else {
			setError("Invalid password format");
			alert("Invalid password format -- at least 1 upper case, lower case, and numbers "); //verification ?????? ????????? ?????? ???????????????
		}
	};

	const handleChange = (prop) => (event) => {
		if (prop === "name") {
			setName(event.target.value);
		} else if (prop === "email") {
			setEmail(event.target.value);
		} else if (prop === "pw") {
			setPw(event.target.value);
		} else if (prop === "gender") {
			setGender(event.target.value);
		} else if (prop === "DOB") {
			setDateOfBirth(event.target.value);
		} else if (prop === "phoneNumber") {
			setPhoneNumber(event);
		} else if (prop == "userType") {
			setType(event.target.value);
		} else if (prop === "profileUrl") {
			if (event.target.files && event.target.files[0]) {
				const selectedFile = event.target.files[0];

				const formData = new FormData();
				const unsignedUploadPreset = "v8dfxg1t";
				formData.append("file", selectedFile);
				formData.append("upload_preset", unsignedUploadPreset);

				uploadImageToCloudinaryAPIMethod(formData).then((response) => {
					setProfileUrl(response.url);
				});
			}
		} else if (prop == "x") {
			event.preventDefault();

			setError("");
		}
	};

	return (
		<div className="flex">
			<div className="mx-auto mt-[100px] text-[30px]">
				<div className="row-justify-content-center">
					<div className="col-lg-8 ">
						<div className="p-5 shadow rounded content">
							<h2 className="font-bold font-sans mb-[20px]">Sign up</h2>
							<form method="POST" action="#">
								<div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="image"
											className="flex justify-center border items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Profile Image
										</label>
										<div name="customerInfoFormValue" className="flex flex-row justify-center items-center">
											<img
												className="avatar"
												src={profileUrl == "" ? "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png" : profileUrl}
												style={{ width: "70px", height: "70px", borderRadius: "50%" }}
											/>
											<input
												id="file-upload"
												className="custom-file-upload"
												placeholder="Choose New Image"
												type="file"
												name="image"
												accept="image/*"
												id="cloudinary"
												onChange={handleChange("profileUrl")}
												className="flex  items-center bg-transparent h-[30px]  px-8 text-base border-[#4EA1D3]"
											/>
										</div>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="iName "
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Name*
										</label>

										<input
											className="bg-transparent h-[40px] pr-4 text-base border-[#4EA1D3]"
											placeholder="Please enter your name"
											type="text"
											id="iName"
											name="Name"
											value={name}
											style={{ alignItems: "center" }}
											onChange={handleChange("name")}
										/>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="Email"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Email*{" "}
										</label>

										<input
											type="text"
											id="iEmail"
											name="Email"
											placeholder="Please enter your Email address"
											value={email}
											className="bg-transparent h-[40px]  pr-4 text-base border-[#4EA1D3]"
											onChange={handleChange("email")}
										/>
									</div>

									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userPassword"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Password*
										</label>

										<input
											type="password"
											name="userPassword"
											placeholder="Please enter your password"
											onChange={handleChange("pw")}
											className="text-left bg-transparent  h-[40px] text-base border-[#4EA1D3] "
											required
										/>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userGender"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Gender
										</label>

										<select className="form-select form-select-sm bg-white font-sans text-[16px]" name="userGender" onChange={handleChange("gender")}>
											<option value="male" selected>
												Male
											</option>
											<option value="female">Female</option>
										</select>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userType"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Type*
										</label>

										<select class="form-select form-select-sm bg-white font-sans text-[16px]" name="userType" onChange={handleChange("userType")}>
											<option value="User" selected>
												User
											</option>
											<option value="Organization">Organization</option>
										</select>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userDateOfBirth"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Date of Birth
										</label>

										<input
											className="text-[16px] font-sans bg-white"
											type="date"
											name="DOB"
											id="datepicker"
											placeholder="Enter a Date"
											onChange={handleChange("DOB")}
										/>
									</div>
									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userOhoneNumber"
											className="flex justify-center items-center w-[120px] h-[70px] font-bold text-[15px] border bg-slate-200 mr-[10px]"
										>
											Phone number*
										</label>

										<PhoneInput country="us" style={{ width: "300px" }} name="phoneNumber" onChange={handleChange("phoneNumber")} />
									</div>

									<div name="SignUpcustomerInfoForm" className="flex form-group items-center jusitfy-self-center h-100% col-md-6 border m-[3px]">
										<label
											name="customerInfoFormLabel"
											for="userInterest"
											className="flex justify-center items-center w-[120px] h-100% font-bold text-[15px] border bg-slate-200 mr-[10px]"
											style={{ height: "23vh" }}
										>
											Interests
										</label>
										<br />

										<Sheet
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
															{value.includes(item) && (
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
																size="sm"
																disableIcon
																overlay
																label={item}
																checked={value.includes(item)}
																variant={value.includes(item) ? "soft" : "outlined"}
																onChange={(event) => {
																	if (event.target.checked) {
																		setValue((val) => [...val, item]);
																	} else {
																		setValue((val) => val.filter((text) => text !== item));
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
								<div className="flex flex-col items-center w-full justify-center p-[30px]">
									<div name="formSubmitContainer" className="bg-[#4EA1D3] w-full rounded">
										<button id="SignupButton" onClick={testRegister} type="submit" className="flex w-full">
											<div name="formSubmit" className=" text-[25px] font-sans text-white text-center text-center decoration-8" style={{ margin: "auto" }}>
												Create an Account
											</div>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
