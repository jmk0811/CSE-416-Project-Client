import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sidebar from "../../components/sideBar";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Link from "next/link";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
function MyPage() {
	const [user, setUser] = useState({});
	//     {
	//     profileImg:
	//         'https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png',
	//     name: 'abc',
	//     points: 2,
	//     type: 'user',
	//     phoneNumber: '0',
	//     dayOfBirth: '2022-12-01',
	//     gender: 'female',
	//     interest: ['education'],
	//     myParticipant: [
	//         {
	//             Userid: '1',
	//             Workid: {
	//                 title: 'animal',
	//                 description: 'animal volunteer work',
	//                 point: 100,
	//             },
	//             ParticipationDate: '2021-01-01',
	//             Progress: true,
	//         },
	//         {
	//             Userid: '1',
	//             Workid: {
	//                 title: 'animal2',
	//                 description: 'animal volunteer work2',
	//                 point: 100,
	//             },
	//             ParticipationDate: '2022-11-30',
	//             Progress: true,
	//         },
	//         {
	//             Userid: '1',
	//             Workid: {
	//                 title: 'animal3',
	//                 description: 'animal volunteer work3',
	//                 point: 100,
	//             },
	//             ParticipationDate: '2022-05-30',
	//             Progress: true,
	//         },
	//         {
	//             Userid: '1',
	//             Workid: {
	//                 title: 'animal4',
	//                 description: 'animal volunteer work4',
	//                 point: 300,
	//             },
	//             ParticipationDate: '2022-12-30',
	//             Progress: true,
	//         },
	//     ],
	//     certificates: [
	//         {
	//             certificatesNumber: 0,
	//             issueDate: '2023-12-1',
	//             owner: 'abc',
	//             contractAddress: '',
	//         },
	//         {
	//             certificatesNumber: 1,
	//             issueDate: '2022-8-4',
	//             owner: 'abc',
	//             contractAddress: '',
	//         },
	//         {
	//             certificatesNumber: 1,
	//             issueDate: '2022-11-4',
	//             owner: 'abc',
	//             contractAddress: '',
	//         },
	//         {
	//             certificatesNumber: 1,
	//             issueDate: '2021-11-2',
	//             owner: 'abc',
	//             contractAddress: '',
	//         },
	//     ],
	// }
	const [value, setValue] = useState([]);
	let formData;
	useEffect(() => {
		var retrievedObject = JSON.parse(localStorage.getItem("userData"));
		setUser(retrievedObject);
		setValue(retrievedObject.interest);
		// localStorage.setItem('userData', JSON.stringify(user));
	}, []);
	const onChangeInput = (event) => {
		const target = event.target;
		console.log("change input", target);
		const value = target.value;
		const name = target.name;
		let updatedUser = { ...user };

		updatedUser = { ...user, [name]: value };
		console.log(updatedUser);
		setUser(updatedUser);
	};
	const removeImg = () => {
		let updatedUser = {
			...user,
			profileImg: "https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png",
		};
		setUser(updatedUser);
	};
	const handleSave = (event) => {
		let tmpUser = { ...user };
		// const loc = tmpUser.locations.location;
		// const loc2 = tmpUser.locations.locationDetail;
		// tmpUser = { ...user, location: loc, locationDetail: loc2 };
		//updateUserAPIMethod(tmpUser).then((res) => console.dir(res));
		//props.setUser(user);
		//setUser(user);
		let updatedUser = { ...user, interest: value };
		console.log(updatedUser);
	};

	const handleImageSelected = (event) => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			console.dir(selectedFile);

			formData = new FormData();

			const unsignedUploadPreset = "fugjlrit";
			formData.append("file", selectedFile);
			formData.append("upload_preset", unsignedUploadPreset);

			console.log("Cloudinary upload");
			// uploadImageToCloudinaryAPIMethod(formData).then((response) => {
			//     console.log('Upload success');
			//     console.dir(response);

			//     const updatedUser = { ...user, profileImg: response.url };
			//     setUser(updatedUser);
			//     console.log('Updating...', updatedUser);
			// });
		}
	};
	return (
		<div className="flex p-[30px]  items-center justify-center">
			<Sidebar width={320}>
				<div className="mx-auto text-[30px] font-bold">
					<div>
						<div>
							<div className="flex flex-col w-full p-[40px] items-center">
								<div className="relative flex w-[80px] h-[80px] bg-cover bg-center rounded-full">
									{user.profileImg == "" ? (
										<img
											className="w-[80px] h-[80px] bg-cover bg-center rounded-full"
											src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
										/>
									) : (
										<div>
											<img className="w-[70px] h-[70px] rounded-full" src={user.profileImg} />
										</div>
									)}
									<div className="absolute top-10 left-27 right-1 bg-white p-[3px] border rounded-full text-[15px] hover:text-[#1976d2]">
										<Link
											href={{
												pathname: "/profile",
											}}
										>
											<CameraAltIcon color="action" className="hover:text-[#1976d2]" />
										</Link>
									</div>
								</div>

								<div className=" text-[18px]">{user.name}</div>
								<div className="text-[#767676] text-[14px]">
									<CurrencyExchangeIcon />
									{user.points}
								</div>
							</div>
							<div>
								{/* <div>
                                    <Link
                                        href={{
                                            pathname: '/profile2/analysis',
                                            query: {
                                                user: JSON.stringify(user),
                                            },
                                        }}
                                    >
                                        Analysis
                                    </Link>
                                </div> */}
								<div>
									<Link
										href={{
											pathname: "/profile/history",
											// query: {
											//     user: JSON.stringify(user), //user.type , user myParticipant //local 다 저장을 하고, 페이지 넘어가면 값을 다시 가져온다 지우는걸
											// },
										}}
									>
										History
									</Link>
								</div>
								<div>
									<Link
										href={{
											pathname: "/profile/points",
											// query: {
											//     user: JSON.stringify(user),
											// },
										}}
									>
										Points
									</Link>
								</div>

								<div>logout</div>
							</div>
						</div>
					</div>
				</div>
			</Sidebar>
			<div id="profile-form">
				<div className="profile-content">
					<div className="profile-photo">
						<div className="photo">
							<img className="profile_picture" src={!user ? "defaultProfile.png" : user.profileImg} alt="profile" />
							<label className="newImg">
								<input type="file" name="image" accept="image/*" id="cloudinary" className="newImg" style={{ width: 0 + "%" }} onChange={handleImageSelected} />
								Choose New Image
							</label>
							<button type="button" className="removeImg" onClick={removeImg}>
								Remove Image
							</button>
						</div>
					</div>

					<div>
						<div className={"form-group col-md-6"}>
							<label for="name" className={"text-[15px]"}>
								Name*
							</label>
							<br />
							<input
								type="text"
								name="name"
								value={user ? user.name : ""}
								onChange={onChangeInput}
								className={"bg-transparent h-[40px] w-full px-10 pr-4 text-base border-[#4EA1D3]"}
							/>
						</div>

						<div className={"form-group col-md-6"}>
							<label for="userGender" className={"text-[15px]"}>
								Gender
							</label>
							<br />
							<select class="form-select form-select-sm bg-white font-sans text-[16px]" onChange={onChangeInput} name="gender">
								<option value="male" selected={user.gender == "male" ? true : false}>
									Male
								</option>
								<option value="female" selected={user.gender == "female" ? true : false}>
									Female
								</option>
							</select>
						</div>
						<div className={"form-group col-md-6"}>
							<label for="userDateOfBirth" className={"text-[15px]"}>
								Date of Birth
							</label>
							<br />
							<input
								className="text-[16px] font-sans bg-white"
								type="date"
								id="datepicker"
								name="dayOfBirth"
								placeholder="Enter a Date"
								value={user.dayOfBirth ? user.dayOfBirth : ""}
								onChange={onChangeInput}
							/>
						</div>
						<div className={"form-group col-md-6"}>
							<label for="userPhoneNumber" className={"text-[15px]"}>
								Phone number
							</label>
							<br />
							<PhoneInput
								country={"us"}
								name="phoneNumber"
								value={user.phoneNumber ? user.phoneNumber : ""}
								onChange={(v) => setUser({ ...user, phoneNumber: v })}
							/>
						</div>
					</div>
					{user.type == "user" ? (
						<div className={"form-group col-md-6"}>
							<label for="userInterest" className={"text-[15px]"}>
								Your Interest
							</label>
							<br />

							<Sheet
								variant="outlined"
								sx={{
									width: 360,
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
										{["education", "animal", "environment", "healthcare", "sports"].map((item, index) => (
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
					) : (
						<div></div>
					)}
					<div className="clearfix">
						<button type="submit" className="save" onClick={handleSave} style={{ width: 150 + "px" }}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default MyPage;
