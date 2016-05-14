IMD Q&A App
===================

This is a Live Q&A app made as a final project for the course Webtechnologie2 2016 of Thomas More.

With the usage of Express.js, Node.js, Socket.io and MongoDB.

At the moment everything is still on the "developement" branch since it's not ready to be published yet.

###  Installing
download the developement branch and install the modules with 
>npm install

Then you can run the app with
> node index.js

The app will be running on *localhost:3000*.

----------
###  What do we have so far
When surfing to localhost:3000 you'll get a login page with the option to create an account. 
When the account is created you will be redirected to the login page again and you van login now.
When logged in you'll see a page that displays your information.

>**Todo**

> - create home page with list of discussions
> - be able to create discussion
> - view detail page of discussion
> - add question in discussion
> - add awnser to question 
> - save the location of the post 
> - view who is active in the discussion. 
> - view which discussions are nearby
> - make the creator of the discussion the moderator
> - give moderator option to delete or edit their posts.

----------

Download or clone the repo, 
Open twor cmd windows. 
In the fist one you'll start mongoDB with `mongod` 
In the second one browse to the folder of the app 
Install all the modules with `npm install`
and run the app with `npm start`