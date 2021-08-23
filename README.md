# Personal Time Tracker

[Personal Time Tracker](https://personaltimetracker.netlify.app/) is a web application used for tracking different projects or areas of your life. Titles, descriptions, and colorful tags are used to organize and track your recorded times. 

Built with HTML, CSS, Bootstrap, Javascript, and Firebase.

## Functionality

This app allows users to track the time they spend throughout different areas of their work or personal life. Each time can be given a title, a description and a costom tag to show which project that time belongs to. You can easily sort all of your project times by day, week, month, year, and all time to see all the time you have spent on different projects throughout different time frames.

With authentication, your times are kept track of on the Firestore Database (from Firebase) so that you never have to worry about losing your data.

## Installation and Running

You will need [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine globally.

Once this repository is cloned, to install, run:

`npm install`

To Start Server, Run:

`npm start`

To View App, Visit:

`localhost:3000`

Web application hosted by netlify through automatic deploys from github.

## Dependencies

- npm
- Nodemon
- Express

### Reflection

The idea for this project was mainly inspired by my love for data and efficiency tracking. I always like to know how much time I've put into a project and how much time each part of that project took. Looking online, I couldn't find any simple tracking websites that fitted my needs exacly and weren't paid, so I set off to build my own project that could live up to my expectations.

The first design of the personal time tracker website was a bit clunky as it was one of my first complete JavaScript HTML and CSS projects without any other libraries. There were also some larger bugs that were difficult to deal with in daily use. So after a couple weeks of personal use, I decided to completely refactor the UI and some functionality to turn it into what the time tracker has become today.

Since this was my first real project with Firebase as a backend, my main challenge was both firebase authentication, and storing/retrieving user data in the cloud. This led me to spend a while researching and studying the firebase documentation and other resources. But I was eventually knowledgeable enough in firebase to set up both authentication and storing data in the Firestore Database.

Overall, this project was a great way for me to gain real experience in creating web apps and setting up firebase database communication, and I find this app very useful in my daily work schedule.
