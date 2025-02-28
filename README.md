# NC News Seeding

- Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news

Step 1 - pre-requisites : Creating .env.* files!

Since .env.* files are ignored by Git, anyone who clones my project won’t have access to the required environment variables. So the first step for anyone cloning this porject is to make their own .env.* files (* doesn't mean anything ignore it for now). 

Now to make the .env. file :

1: -Create TWO new file in the project you have git cloned, make sure the file is NOT created inside ANY folder!
2: -Name the TWO new file .env.test  and  .env.development
3: -copy and paste this line of code inside BOTH .env.test  and  .env.development file . Here is the line of code : PGDATABASE='nc_news'
4: -Yes,just this line is good! You are done with this step.

These .env. files will enable developers to connect to both databases locally

    
