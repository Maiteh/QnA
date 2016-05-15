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

> - Show user who posted topic
> - show user who posted question
> - Make questions added realtime
> - add awnser to question 
> - show user who posted awnser
> - make awsners realtime
> - save the location of the post 
> - view who is active in the discussion. 
> - view which discussions are nearby
> - make the creator of the discussion the moderator
> - give moderator option to delete or edit their posts.
> - able to upload images in post.

----------

>**Documentation list**

> - Express validate
> https://github.com/ctavan/express-validator 
> - passport
>
> http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
> http://passportjs.org
> - 