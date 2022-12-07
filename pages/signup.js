import react, { useEffect, useState } from "react";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { registerUserAPIMethod, uploadImageToCloudinaryAPIMethod } from "../api/client";
import "react-phone-input-2/lib/style.css";

export default function SignUp(props) {
	const [profileUrl, setProfileUrl] = useState("");
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [userId, setUserId] = useState("");
	const [pw, setPw] = useState();
	//	const [addr1, setAddr1] = useState();
	//	const [addr2, setAddr2] = useState();
	const [type, setType] = useState("User");
	const [gender, setGender] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [SSN, setSSN] = useState(0);
	const [error, setError] = useState();

	// const [value, setValue] = useState([]);

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
					profile_url: profileUrl,
					id: userId,
					type,
					gender,
					dateOfBirth,
					phoneNumber,
					SSN,
				};
				registerUserAPIMethod(user1).then((ret) => {
					console.log(ret);
					if (ret) {
						// props.setShowSignup(false);
						props.setLogin(true);
					} else {
						setError("Invalid information. Properly fill out the information");
					}
				});
			} else {
				setError("Invalid email format");
			}
		} else {
			setError("Invalid password format");
		}
	};

	const handleChange = (prop) => (event) => {
		if (prop === "name") {
			setName(event.target.value);
		} else if (prop === "email") {
			setEmail(event.target.value);
		} else if (prop === "pw") {
			setPw(event.target.value);
			/*		} else if (prop === "addr1") {
			setAddr1(event.target.value);
		} else if (prop === "addr2") {
			setAddr2(event.target.value);
		} */
			// } else if (prop === "userId") {
			// 	setUserId(event.target.value);
			// }
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

				console.log("Cloudinary upload");
				console.log(formData.file);
				uploadImageToCloudinaryAPIMethod(formData).then((response) => {
					console.log(response);
					setProfileUrl(response.url);
				});
			}
		} else if (prop == "x") {
			event.preventDefault();
			// props.setShowSignup(false);
			setError("");
		}
	};

	return (
		// 	<div>
		// 		<form>
		// 			<div style={{ display: "flex", justifyContent: "space-between" }}>
		// 				<h2>Sign Up</h2>
		// 			</div>

		// 			<p style={{ margin: 0 }}>Name</p>
		// 			<input type="text" id="iName" name="Name" value={name} style={{ width: "100%", alignItems: "center" }} onChange={handleChange("name")} />

		// 			<p style={{ margin: 0 }}>Email</p>
		// 			<input type="text" id="iEmail" name="Email" value={email} style={{ width: "100%", alignItems: "center" }} onChange={handleChange("email")} />

		// 			<p style={{ margin: 0 }}>Password</p>
		// 			<input type="password" id="iPw" name="pw" value={pw} style={{ width: "100%", alignItems: "center" }} onChange={handleChange("pw")} />

		// 			<p style={{ margin: 0 }}>Address 1</p>
		// 			<input type="text" id="iAddr1" name="addr1" value={addr1} style={{ width: "100%", alignItems: "center" }} onChange={handleChange("addr1")} />

		// 			<p style={{ margin: 0 }}>Address 2</p>
		// 			<input type="text" id="iAddr2" name="addr2" value={addr2} style={{ width: "100%", alignItems: "center" }} onChange={handleChange("addr2")} />

		// 		</form>
		// 	</div>

		<div className="flex">
			<div className="mx-auto mt-[100px] text-[30px]">
				<div className="row-justify-content-center">
					<div className="col-lg-8 min-w-[500px]">
						<div className="p-5 shadow rounded content">
							<h2 className="font-bold font-sans">Sign up</h2>
							<form method="POST" action="#">
								<div>
									<div className="form-group col-md-6">
										<label for="image" className="text-[15px]">
											Profile Image
										</label>
										<img className="avatar" src={profileUrl} style={{ width: "80px", borderRadius: "50%" }} />
										<input
											id="file-upload"
											className="custom-file-upload"
											placeholder="Choose New Image"
											type="file"
											name="image"
											accept="image/*"
											id="cloudinary"
											onChange={handleChange("profileUrl")}
											className="bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"
										/>
									</div>
									<div className="form-group col-md-6">
										<label for="iName " className="text-[15px]">
											Name*
										</label>

										<br />
										<input
											className="bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"
											placeholder="Please enter your name"
											type="text"
											id="iName"
											name="Name"
											value={name}
											style={{ width: "100%", alignItems: "center" }}
											onChange={handleChange("name")}
										/>
									</div>
									<div className="form-group col-md-6">
										<label for="Email" className="text-[15px]">
											Email{" "}
										</label>

										<input
											type="text"
											id="iEmail"
											name="Email"
											placeholder="Please enter your Email address"
											value={email}
											className="bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"
											onChange={handleChange("email")}
										/>
									</div>
									{/* <div className={"form-group col-md-6"}>
										<label for="userId" className={"text-[15px]"}>
											ID*
										</label>
										<br />
										<input
											type="text"
											name="userId"
											placeholder="Please enter your ID"
											// onChange={handleId}
											onChange={handleChange("ID")}
											className={"bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"}
											required
										/>
									</div> */}
									<div className="form-group col-md-6">
										<label for="userPassword" className="text-[15px]">
											Password*
										</label>
										<br />
										<input
											type="password"
											name="userPassword"
											placeholder="enter your password"
											onChange={handleChange("pw")}
											className="text-left bg-transparent w-full h-[40px] px-10 text-base border-[#4EA1D3] "
											required
										/>
									</div>
									<div className="form-group col-md-6">
										<label for="userGender" className="text-[15px]">
											Gender
										</label>
										<br />
										<select class="form-select form-select-sm bg-white font-sans text-[16px]" name="userGender" onChange={handleChange("gender")}>
											<option value="male" selected>
												Male
											</option>
											<option value="female">Female</option>
										</select>
									</div>
									<div className="form-group col-md-6">
										<label for="userType" className="text-[15px]">
											Type
										</label>
										<br />
										<select class="form-select form-select-sm bg-white font-sans text-[16px]" name="userType" onChange={handleChange("userType")}>
											<option value="User" selected>
												User
											</option>
											<option value="Organization">Organization</option>
										</select>
									</div>
									<div className="form-group col-md-6">
										<label for="userDateOfBirth" className="text-[15px]">
											Date of Birth
										</label>
										<br />
										<input
											className="text-[16px] font-sans bg-white"
											type="date"
											name="DOB"
											id="datepicker"
											placeholder="Enter a Date"
											onChange={handleChange("DOB")}
										/>
									</div>
									<div className="form-group col-md-6">
										<label for="userOhoneNumber" className="text-[15px]">
											Phone number*
										</label>
										<br />
										<PhoneInput
											country="us"
											// value={this.state.phone}
											name="phoneNumber"
											onChange={handleChange("phoneNumber")}
										/>
									</div>
								</div>
								<div className="flex flex-col items-center w-full justify-center p-[30px]">
									<div className="bg-[#4EA1D3] w-full rounded">
										<button onClick={testRegister} type="submit">
											<div className="w-[400px] text-[25px] font-sans text-white text-center text-center decoration-8">Create an Account</div>
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
