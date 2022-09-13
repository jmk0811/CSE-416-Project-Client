# CSE-416-Project-Client



## Team members
Minki Jeon  
Sangwoo Park  
Suhyun Chun  



## Project statement
[PlatformTitle] is a platform where the users can see different kinds of volunteer works from various organizations, participate in, and earn NFT certificates and collectibles as a compensation or commemoration.



## Problem description

1.  Hard to get information about different kinds of volunteer works from various organizations comprehensively.

2.  Hard to manage and keep track of lots of records of completed volunteer works.

3.	Records can be lost easily if paper certificates are lost or organizations that held the volunteer work are gone.

4.	People may become less motivated in volunteer work participation if there is no reward or compensation.


## Solution

1.  Make a platform that has various volunteer events from organizations, and list up so that the users can check events they want quickly.

2.  For people who have done lots of volunteer works, it will show and provide well design displayed schedule of volunteer record that can be acceptable whenver.

3.  Record and store online volunteer work histories that can never be lost, preventing losing volunteer/work experiences caused by an unexpected situation. 

4.  Add rewards (points, NFTs certificates) when the users participate in the volunteer events to prompt and stimulate users’ desire to collect and give motivation. 



## Target Users

1.	People who are willing to do volunteer works but  
  A.	Do not have enough information or do not know well about volunteer works.  
  B.	Want to manage their volunteer records and schedule effectively.  
  C.	Want to get some kind of reward, compensation, or collectibles.  
  
2.	Volunteer works organizations, holders, who want to advertise their events and work opportunities to people.

3.	Admin who  
  A.	Creates contents and post articles (volunteer work opportunities).  
  B.	Validates users’ submissions of paper certificates or photos in order to issue NFT certificates and points.  
  C.	Manages and maintains the platform.  



## Main functionalities

1.	Secure signup, login, logout, and cryptocurrency wallet connection

2.	Get data of volunteer works from organizations (or from the admin), store them in the database, show lists of available opportunities to users. Sort and filter them by name, date, theme, holder, vacancy, etc.

3.	Volunteer work registration, application submission

4.	View records, history, and list of owned NFTs in profile page

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
  A.	Review users’ paper certificate or photo submissions  
  B.	Upload and manage IPFS server and metadata of NFTs  

7.	Real-time chat customer service



## Data to be stored in SQL Database

1.	Users’ account information (name, user type, etc.)

2.	Users’ points (earned from participating in volunteer works)

3.	Lists of volunteer works and their name, date, theme, holder, vacancy, etc.  
  A.  Each volunteer work data object reference user object to keep track of who have participated in.  

4.	Metadata of NFTs (can be stored in IPFS)



## Data to be stored in Blockchain

1.	Smart contract

2.	NFTs



## Data to be stored in IPFS (optional)

1.	Metadata of NFTs



