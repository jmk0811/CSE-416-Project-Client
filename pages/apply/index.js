import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper, Checkbox, FormControlLabel} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'


export default function Work() {
    const router = useRouter();

     //'Values' will be changed by connecting to database
    const data = [
        [new Date("2022-03-25 11:00"), 10, 20],
        [new Date("2022-12-25 11:00"), 199, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 200, 200], //full
        [new Date("2022-12-25 11:00"), 100, 200], 
        [new Date("2022-12-25 11:00"), 100, 200], 

    ]

    const [isChecked, setIsChecked] = React.useState(() =>
         data.map((i) => false)
    );
    const [name, setName] = React.useState('');
    const handleNameChange = (e) => { setName(e.target.value) }
    const [email, setEmail] = React.useState('');
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const [contactNumber, setContactNumber] = React.useState('');
    const handleNumberChange = (e) => { setContactNumber(e.target.value) }

    const [term, setTerm] = React.useState(false);
    const handleTermClick = (e) => {setTerm(e.target.checked)}
    const handleApply = () => {
        if(term == false) {
            return alert('Please Check our terms before applying')
        }
        else {
            //완료 페이지로 이동 
            // 서버에서 추가로 확인해야할 것 이 있어서 추후에 설명 드리겠습니다 use Queue
            alert('Your reservation has been successful. Thank you for volunteering!');
            router.push(`/main`);
        }
    }

    const isCheckboxChecked = (index, checked) => {
        setIsChecked((isChecked) => {
          return isChecked.map((c, i) => {
            if (i === index) return checked;
            return c;
          });
        });
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const dateStyle = {display: "flex", flexWrap: 'wrap', justifyContent: "center", alignItems: 'center', height: "100px", border: '1px solid red'}
      
   
    return(
        <Box display="flex" flexDirection="column">

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" alignSelf="center" width= "md">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    justifyContent="center"
                    maxWidth="md"
                    width="md"
                    p={{ xs: 1, sm: 2, md: 0 }}
                >
                    <Box width ='80vw' maxWidth = 'md' height='40vh' maxHeight="75vh" overflow="scroll" style={{marginTop: '20px'}}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1} style={{display: "flex", justifyContent: "center", alignItems: 'center', marginTop: '20px'}}>
                                {data.map((checkbox, index) => (
                                    <Grid item xs={5} sm={1.7} md={0}>
                                        {(checkbox[1] < checkbox[2]) ? 
                                        <Item style={dateStyle}>
                                            <FormControlLabel
                                                key={index + checkbox.name}
                                                label={formatDate(checkbox)}
                                                control={<Checkbox 
                                                    checked={isChecked[index]}
                                                    onChange={(e) => isCheckboxChecked(index, e.target.checked)}
                                                    />}
                                                />
                                        </Item> : null}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                    <Box display = "flex" flexWrap= 'wrap' flexDirection="column" justifyContent = "center" alignItems= 'center' width ='80vw' maxWidth = 'md' height='50vh' maxHeight="75vh"> 

                        <Typography style={{fontSize: "30px"}}> Application Information </Typography>

                        <div style={{display: "flex", flexWrap: 'wrap', maxWidth: 'md'}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight: '20px', width: '250px'}}>
                                <Typography style={{fontSize: "20px", marginRight: "10px"}}> Name: </Typography>
                                <TextField id="outlined-basic"  variant="outlined" style={{marginBottom: '10px', marginTop: '10px'}} 
                                    value={name} onChange = {handleNameChange}/>
                            </div>

                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight: '20px', width: '250px'}}>
                                <Typography style={{fontSize: "20px", marginRight: "10px"}}> Email: </Typography>
                                <TextField id="outlined-basic" variant="outlined" style={{marginBottom: '10px', marginTop: '10px'}} 
                                    value={email} onChange = {handleEmailChange}/>
                            </div>
                        
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '250px'}}>
                                <Typography style={{fontSize: "20px", marginRight: "10px"}}> Number: </Typography>
                                <TextField id="outlined-basic" variant="outlined" style={{marginBottom: '10px', marginTop: '10px'}} 
                                    value={contactNumber} onChange = {handleNumberChange}/>
                            </div>
                        </div>

                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Checkbox checked={term} onChange={handleTermClick}/> <Typography>Check the box to indicate that you have read and agree to the terms presented by Nanum</Typography>
                        </Box>

                        <Button variant="contained" style={{backgroundColor: "skyblue", marginTop: '20px', marginBotton: '20px'}} onClick={handleApply}>
                            <Typography variant={{ md: "h5", sm: "body1" }} style={{display: "flex", justifyContent: 'center', flexDirection:"column",
                                color: 'black', width: '100px', height: '30px'}}>
                                Apply
                            </Typography>
                        </Button>

                    </Box>
                </Box>
            </Box>
        </Box>
    )

    function formatDate(input){
        const date = input[0];
        const full = input[1]
        const occupy = input[2];
        if(date.getMinutes() < 10) return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:0${date.getMinutes()} ${full}/${occupy}`
        else return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:0${date.getMinutes()} ${full}/${occupy}`
    }
} 