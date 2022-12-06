import {Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
	return (
                <div className="bg-main1 h-[100px]" style={{color: 'white'}}>
                        <Box style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center', margin: "20px"}}>
                                 <Box style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems:'center', margin: "20px"}}>
                                         <button className="" style={{marginRight: '20px'}}>
                                                <Link href="/about">
                                                        <a>About Us</a>
                                                </Link>
                                        </button>
                                        <button className="" style={{marginRight: '20px'}}>
                                                <Link href= "mailto:sangwoo.park.2@stonybrook.edu?subject=Hello!">
                                                        <a>Contact Us</a>
                                                </Link>
                                        </button>
                                        <button className="">
                                                <Link href="https://github.com/jmk0811/CSE-416-Project-Client/issues">
                                                        <a>Report Bug</a>
                                                </Link>
                                        </button>
                                </Box>
                                <Typography>Copyright © 2022 NaNum</Typography>
                        </Box>
	        </div>
        )
}