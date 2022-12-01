# CSE-416-Project-Client



## Team members
Minki Jeon  
Sangwoo Park  
Suhyun Chun  



## Project statement
[PlatformTitle] is a platform where the users can see different kinds of volunteer works from various organizations, participate in, and earn NFT certificates and collectibles as a compensation or commemoration.



## Problem description

1.  Hard to get information about different kinds of volunteer works from various organizations comprehensively.

2.  Hard to manage and keep track of lots of records of completed volunteer work.

3.	Records can be lost easily if paper certificates are lost or organizations that held the volunteer work are gone.

4.	People may become less motivated in volunteer work participation if there is no reward or compensation.



## Solution

1.  Our web app will show various volunteer work events to the users, and list them so that the users can check and choose events they want to participate in easily and quickly.

2.  For people who have done multiple volunteer works, it will provide functionalities that help the users manage their schedules and volunteer work records effectively.

3.  Volunteer work histories and certificates will be safely recorded and stored, preventing them from being lost or corrupted accidentally or for unexpected reasons.

4.  Rewards will be given to the users, such as points and NFTs, when they participate in volunteer events to prompt their motivation and stimulate their desire to collect.



## Target Users

1.	People who are willing to do volunteer work but  
  A.	Do not have enough information or do not know well about volunteer work.  
  B.	Want to manage their volunteer records and schedule effectively.  
  C.	Want to get some kind of reward, compensation, or collectibles.  
  
2.	Volunteer organizations and event holders who want to advertise their events and work opportunities to people.  
  A.	Create contents and post articles (volunteer work opportunities).  

3.	Admin who  
  A.	Approve articles posted from organizations.  
  B.	Validates users’ submissions of paper certificates or photos in order to issue NFT certificates and points.  
  C.	Manages and maintains the platform.  



## Main functionalities

1.	Secure signup, login, logout, and cryptocurrency wallet connection

2.	Get data of volunteer works from organizations (or from the admin), store them in the database, and show lists of available opportunities to users. Sort and filter them by name, date, theme, holder, vacancy, etc.

3.	Volunteer work registration, application submission

4.	View records, history, and list of owned NFTs on profile page

5.	Issue NFT certificates and collectibles to users

6.	Admin account



## Sub functionalities (To be later added for the app’s complexity.)

1.	Point trade system  
  A.	Users earn points by participating in volunteer works  
  B.	Users spend points to buy unique NFT collectibles  

2.	Bookmarking volunteer works

3.	Scheduler, time overlap and schedule conflict detection

4.	Customizable NFT minting

5.	Separate IPFS server to store metadata of NFTs

6.	Separate admin page  
  A.	Review users’ paper certificates or photo submissions  
  B.	Upload and manage IPFS server and metadata of NFTs  

7.	Real-time chat customer service



## Data to be stored in SQL Database

1.	Users’ account information (name, user type, etc.)

2.	Users’ points (earned from participating in volunteer works)

3.	Lists of volunteer works and their name, date, theme, holder, vacancy, etc.  
  A.  Each volunteer work data object references the user object to keep track of who has participated.  

4.	Metadata of NFTs (can be stored in IPFS)



## Data to be stored in Blockchain

1.	Smart contract

2.	NFTs



## Data to be stored in IPFS (optional)

1.	Metadata of NFTs



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

 ## How to Submit an issue
1. You can submit an issue through the "[Github issues tab]" "(https://github.com/jmk0811/CSE-416-Project-Client/issues)"
