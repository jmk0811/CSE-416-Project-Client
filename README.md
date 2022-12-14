# CSE-416-Project-Client


## Team members
Minki Jeon  
Sangwoo Park  
Suhyun Chun  


## Project statement
Nanum is a web platform that connects users and organizations in volunteering works. Users can search, participate, and earn certificates and compensation in different kinds of volunteer works from various organizations. Organizations can recruit users easily to participate in their volunteer events.


## Problem description

1. Difficult to manage and keep track of lots of volunteer work records.
2. These Records can be lost easily.
3. Less motivation on volunteer work participation if there is no reward or compensation.
4. Companies have difficult time finding volunteers


## Solution

1. Records and certificates will be stored safely and be prevented from lost
2. Rewards (points) will be given to the users
3. Companies can advertise and recruit volunteers easily.



## Target Users

1.	People who are willing to do volunteer work but  
  A.	Do not have enough information or do not know well about volunteer work.  
  B.	Want to manage their volunteer records and schedule effectively.  
  C.	Want to get some kind of compensation.  
  
2.	Volunteer organizations and event holders who want to advertise their events and work opportunities to people.  
  A.	Create contents and post articles (volunteer work opportunities).  


## Main functionalities

1.	Secure signup, login, and logout.
2.  Able to search, sort, and filter volunteer works posted from organizations. 
3.	Volunteer work registration.
4.	View records, on each user's profile page.
5.	Issue certificates and collectibles to users.


## Deploy URL
	Frontend: https://venerable-stroopwafel-24c70d.netlify.app/
	Backend: https://cse-416-project-server.herokuapp.com/

## Step to run 

### STEP 1. Download or Git clone for client and server.
```diff
- Make sure that you are using the prod branche
```

#### Download
[Client](https://github.com/jmk0811/CSE-416-Project-Client/tree/prod)

[Server](https://github.com/jmk0811/CSE-416-Project-Server/tree/prod)

####Git Clone
Client: 
```
git clone https://github.com/jmk0811/CSE-416-Project-Client.git
```
Server: 
```
git clone https://github.com/jmk0811/CSE-416-Project-Server.git
```

### STEP 2. Install all packages needed for both client and server (npm i)

### STEP 3. Change file content at index.js from mui-rte (node_modules > mui-rte >index.js)

before:
``` 
 export {default} from './dist/MUIRichTextEditor'
```
after:
```
const MUIRichTextEditor = require('./dist/MUIRichTextEditor'); module.exports = MUIRichTextEditor;
```

Note: This step may not be necessary it's already changed.

### STEP 4. Run server-side (nodemon server.js or node server.js)

### STEP 5. Run client side (npm run dev) 


## API Design Documentation

[API Design Documentation Link](https://docs.google.com/spreadsheets/d/1FL2lbrHG2zM9vgd6tAunh98WdouYaGJ2WFJYhZ0gfz4/edit#gid=0)

## How to Submit an issue
1. You can submit an issue through the [Github issues tab](https://github.com/jmk0811/CSE-416-Project-Client/issues)
2. All outstanding issues can be found in the issue tab
