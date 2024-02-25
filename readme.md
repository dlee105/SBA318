# Skill-Based Assessment 318
Hello, this is a project primarily looking at the functionality of the backend!
Using selfmade JSON datas, this project will use those datas as fake databases to be handle with 4 API calls (GET, POST, PATCH, DELETE) 

The website's theme is about music and genre!

## How It Works

It is quite simple, once the server environment is started on your local machine, go to the url http://localhost:3000/ and here you will see a rendered template of the websites' homescreen. This home screen contains 4 links but only 3 are implemented as of now (EDM, Hiphop, and Pop). 

Each one of these pages essentially display the same thing as well as having the same flow (**I've copy and pasted :)** ) and they all works the same way!

When access a genre page, a GET request is called which extracts the JSON informations within the ./data folder to be render inside the main page (there should be 10 entries of songs and their artist)

Also just right above the songs display, to the right, you should see two input fields which act as filtering entry and once a valid entry is entered, the page will automatically rerender itself with only the song requested **(by ID or Title)** 

In the bottom of the songs display, you can also find more input forms. 
The first form here is a POST request which once the input fields are filled out with valid information, the submit button will add a new song into the fake database and will re-render the page to display that additional song!

As of now, the form all the way in the bottom, which serves as the form for the PATCH request is currently not working as well as I've commented out the DELETE request form since these request doesn't seem to work as of now.

**However** I've successfully written the PATCH and DELETE request inside my JavaScript successfully and they work when using a external API testing tool. I recommend using Postman or similar tools to use PATCH and DELETE as of now until I get help figuring out why my html form corresponding to these two request are sending a GET request.


## How to use
> **INSTALLATION**
> 1. Fork the following project or download it as a .zip onto your local machine
> 2. cd into the primary folder containing both index.html and index.js
> 3. run the command **npm install**
> 4. run the command **nodemon script.js**
> 5. NOW YOU CAN USE THE WEBSITE


