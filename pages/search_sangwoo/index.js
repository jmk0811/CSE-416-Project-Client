import React from "react";
import { Box, Typography, Button } from "@mui/material"
import { Stack, Chip } from "@mui/material"
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import Table from "./Table"

export default function Search() {

    const { asPath, pathname } = useRouter();
    const searchword = parseURLParams(asPath)

    //Search Word
    const [search, setSearch] = React.useState(searchword);
    const handleSearch = (e) => { setSearch(e.target.value); }

    //Advanced Search
    const [location, setLocation] = React.useState('');
    const handleChangeLocation = (e) => { setLocation(e.target.value) };

    const [point, setPoint] = React.useState('');
    const handleChangePoint = (e) => { setPoint(e.target.value) };

    const [recruitmentStartDate, setRecruitmentStartDate] = React.useState(undefined);
    const handleRecruitmentStartDate = (e) => { setRecruitmentStartDate(e) }

    const [recruitmentEndDate, setRecruitmentEndDate] = React.useState(undefined);
    const handleRecruitmentEndDate= (e) => { setRecruitmentEndDate(e) }

    const [startDate, setStartDate] = React.useState(undefined);
    const handleStartDateChange = (e) => { setStartDate(e) }

    const [endDate, setEndDate] = React.useState(undefined); //dayjs(Date.now())
    const handleEndDateChange = (e) => { setEndDate(e) }

    //Tags: outlined (선택안함)
    const [animal, setAnimal] = React.useState('');
    const handleAnimal = () => {if(animal == '') setAnimal('outlined'); else setAnimal('')}
    const [education, setEducation] = React.useState('');
    const handleEducation = () => {if(education == '') setEducation('outlined'); else setEducation('')}
    const [environment, setEnvironment] = React.useState('');
    const handleEnviroment = () => {if(environment == '') setEnvironment('outlined'); else setEnvironment('')}
    const [sports, setSports] = React.useState('');
    const handleSports = () => {if(sports == '') setSports('outlined'); else setSports('')}
    const [healthcare, setHealthcare] = React.useState('');
    const handleHealthcare = () => {if(healthcare == '') setHealthcare('outlined'); else setHealthcare('')}





    const handleClickSearch = () => {
        console.log(search);
        console.log(location);
        console.log(point);
        console.log(recruitmentStartDate);
        console.log(recruitmentEndDate);
        console.log(startDate);
        console.log(endDate);
        console.log(animal, education, environment, sports, healthcare);
    }

    return(
        <Box display="flex" flexDirection="column">

            <Box display="flex" flexDirection="column" alignItems="center" alignSelf="center" width= "md"> 
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    maxWidth="md"
                    width="md"
                    p={{ xs: 1, sm: 2, md: 0 }}
                >
                    <Box style={{display: 'flex', flexDirection: 'row', maxWidth: 'md', marginTop: '30px', marginBottom: '30px'}}>
                        <TextField id="outlined-basic" label="Search" variant="outlined" style={{ maxWidth: "300px", marginRight: '10px'}} 
                                value={search} onChange = {handleSearch}/>

                            <Button variant="contained" onClick={handleClickSearch} style={{backgroundColor: "skyblue"}}>
                                <Typography variant={{ md: "h5", sm: "body1" }} style={{color: 'black'}}>
                                    Search
                                </Typography>
                            </Button>
                    </Box>


                    <Accordion style={{width: '100%', backgroundColor: "efefef", marginBottom: '30px'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <Typography style={{marginLeft: '15px', fontFamily: "'Noto Sans KR', sans-serif",}}>Advanced Search</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <div>
                                    <FormControl fullWidth style={{width: "300px", margin: '10px'}}>
                                        <InputLabel id="demo-simple-select-label"> Location </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={location}
                                                label="Location"
                                                onChange={handleChangeLocation}
                                            >
                                                <MenuItem value={1}> Seoul </MenuItem>
                                                <MenuItem value={2}> Gyeonggi-do</MenuItem>
                                                <MenuItem value={3}> Incheon </MenuItem>
                                            </Select>
                                    </FormControl>

                                    <FormControl fullWidth style={{width: "300px", margin: '10px'}}>
                                        <InputLabel id="demo-simple-select-label"> Points </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={point}
                                            label="Points"
                                            onChange={handleChangePoint}
                                        >
                                        <MenuItem value={1}> below 10 </MenuItem>
                                        <MenuItem value={2}> 10 ~ 20</MenuItem>
                                        <MenuItem value={3}> above 20 </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div style={{margin: '10px', display: 'flex', justifyContent: 'left'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginBottom: '10px'}}>
                                        <DesktopDatePicker
                                            label="Recruitment Start Date"
                                            inputFormat="MM/DD/YYYY"
                                            value={recruitmentStartDate}
                                            onChange={handleRecruitmentStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </div>
                                    </LocalizationProvider>
                                    <Typography style={{fontWeight: 700, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignSelf: 'center',
                                        marginRight: '5px', marginLeft: '5px'}}> 
                                        ~ 
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginBottom: '10px'}}>
                                        <DesktopDatePicker
                                            label="Recruitment End Date"
                                            inputFormat="MM/DD/YYYY"
                                            value={recruitmentEndDate}
                                            onChange={handleRecruitmentEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </div>
                                    </LocalizationProvider>
                                </div>

                                <div style={{margin: '10px', display: 'flex', justifyContent: 'left'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginBottom: '10px'}}>
                                        <DesktopDatePicker
                                            label="Start Date"
                                            inputFormat="MM/DD/YYYY"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </div>
                                    </LocalizationProvider>
                                    <Typography style={{fontWeight: 700, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignSelf: 'center',
                                        marginRight: '5px', marginLeft: '5px'}}> 
                                        ~ 
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginBottom: '10px'}}>
                                        <DesktopDatePicker
                                            label="End Date"
                                            inputFormat="MM/DD/YYYY"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </div>
                                    </LocalizationProvider>
                                </div>
                                <div> 
                                    <Typography style={{margin: '10px'}}>Interests</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Animal" variant={animal} onClick={handleAnimal}/>
                                        <Chip label="Education" variant={education} onClick={handleEducation}/>
                                        <Chip label="Environment" variant={environment} onClick={handleEnviroment}/> 
                                        <Chip label="Healthcare" variant={healthcare} onClick={handleHealthcare}/> 
                                        <Chip label="Sports" variant={sports} onClick={handleSports}/> 
                                    </Stack>
                                </div>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

            <Typography variant={"h3"} style={{alignContent: 'center', fontWeight: 'bolder'}}>Volunteer Works</Typography>
            <Table/>
        </Box>
    )
}

function parseURLParams(url) {
    if(url.includes("?")){
        let queryStart = url.indexOf("?") + 2
        let queryEnd   = url.indexOf("#") + 1 || url.length + 1
        let query = url.slice(queryStart, queryEnd - 1);
        return query;
    }
    else return "";
}