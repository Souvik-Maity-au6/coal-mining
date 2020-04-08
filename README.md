# Entertainment-Sports-API
Project done by Abhijeet and Souvik

# Contributors

* Abhijeet Rajak
* Souvik Maity
* Sundeep Charan Ramkumar(Project Instructor)
* Alfred Joseph(Project Mentor)

# Overview
    The Entertainment and Sports API is a RESTful web service to obtain various information about the
    movies,Theater, Sports, Events, TV-Series.Its contain many components like Movies,Theatre,City,ShowTime and No of
    Seats available in a theatre, ongoing events/sports or upcoming events/sports/movies etc...

# Goals
    The goal of this project is to define API systems, discuss their implementation, and
    then, through a case study and interviews, analyze the implementation of such a
    system at a large scale.

# Technologies:
    The technologies that are going to be used for the project are as follows:
    * Back End : Node.js, Express, Mongoose, Sequelize, Cloudinary
    * Cloud Platform : Mongo Atlas, POSTGRESQL, Heroku

## Users of Application

|Role   |  Rights   |
 |------ | ----------|------
 API Generator| Maintainence API |
 Movie Provider| The company/Producer can give their movie details for addition to the API|
 Theater Owner| Can give his/her theater details and show details to the API and update/delete data from API|
 Sports Organiser| Can add/update/delete their Sports details to the API|
 Events Organiser| Can add/update/delete their Events details to the API|
 TV-Series Producer| Can add/update/delete their TV_Series details to the API|
 Genertal users| Can only view the movie/theater/sports/evnts/tv-series from the API|

### End Points of APIs

1. Movie Provider Routes : 

        * Registering Movie Provider 

            > POST https://entertainment-sports.herokuapp.com/register

        * Provider Account Activation

            > GET https://entertainment-sports.herokuapp.com/verify?token=${user.token}

        * Logging into Provider Account

            > POST https://entertainment-sports.herokuapp.com/login

        * Provide Movie

            > POST https://entertainment-sports.herokuapp.com/addMovie

        * Update Movie 

            > PATCH https://entertainment-sports.herokuapp.com/updateMovie

        * See Profile 

            > GET https://entertainment-sports.herokuapp.com/seeProfile

        * Change Password 

            > POST https://entertainment-sports.herokuapp.com/changePassword

        * Forgot Password 

            > POST https://entertainment-sports.herokuapp.com/forgotPassword

        * Logout from account

            > DELETE https://entertainment-sports.herokuapp.com/logout

2. Theater Owner Routes

        * Registering Movie Provider 

            > POST https://entertainment-sports.herokuapp.com/register

        * Provider Account Activation

            > GET https://entertainment-sports.herokuapp.com/verify?token=${user.token}

        * Logging into Provider Account

            > POST https://entertainment-sports.herokuapp.com/login

        * Provide Movie

            > POST https://entertainment-sports.herokuapp.com/addMovie

        * Update Movie 

            > PATCH https://entertainment-sports.herokuapp.com/updateMovie

        * See Profile 

            > GET https://entertainment-sports.herokuapp.com/seeProfile

        * Change Password 

            > POST https://entertainment-sports.herokuapp.com/changePassword

        * Forgot Password 

            > POST https://entertainment-sports.herokuapp.com/forgotPassword

        * Logout from account

            > DELETE https://entertainment-sports.herokuapp.com/logout

        * Delete Theater details

            > DELETE https://entertainment-sports.herokuapp.com/logout/revomeTheater/:theaterId

3. Events organiser routes

        * Registering Movie Provider 

            > POST https://entertainment-sports.herokuapp.com/register

        * Provider Account Activation

            > GET https://entertainment-sports.herokuapp.com/verify?token=${user.token}

        * Logging into Provider Account

            > POST https://entertainment-sports.herokuapp.com/login

        * Provide Movie

            > POST https://entertainment-sports.herokuapp.com/addMovie

        * Update Movie 

            > PATCH https://entertainment-sports.herokuapp.com/updateMovie

        * See Profile 

            > GET https://entertainment-sports.herokuapp.com/seeProfile

        * Change Password 

            > POST https://entertainment-sports.herokuapp.com/changePassword

        * Forgot Password 

            > POST https://entertainment-sports.herokuapp.com/forgotPassword

        * Logout from account

            > DELETE https://entertainment-sports.herokuapp.com/logout

        * Delete Events details

            > DELETE https://entertainment-sports.herokuapp.com/logout/revomeEvent/:eventId

4. Sports organiser routes

        * Registering Movie Provider 

            > POST https://entertainment-sports.herokuapp.com/register

        * Provider Account Activation

            > GET https://entertainment-sports.herokuapp.com/verify?token=${user.token}

        * Logging into Provider Account

            > POST https://entertainment-sports.herokuapp.com/login

        * Provide Movie

            > POST https://entertainment-sports.herokuapp.com/addMovie

        * Update Movie 

            > PATCH https://entertainment-sports.herokuapp.com/updateMovie

        * See Profile 

            > GET https://entertainment-sports.herokuapp.com/seeProfile

        * Change Password 

            > POST https://entertainment-sports.herokuapp.com/changePassword

        * Forgot Password 

            > POST https://entertainment-sports.herokuapp.com/forgotPassword

        * Logout from account

            > DELETE https://entertainment-sports.herokuapp.com/logout

        * Delete Events details

            > DELETE https://entertainment-sports.herokuapp.com/logout/revomeSports/:sportId

5. TV-Series Routes

        * Registering Movie Provider 

            > POST https://entertainment-sports.herokuapp.com/register

        * Provider Account Activation

            > GET https://entertainment-sports.herokuapp.com/verify?token=${user.token}

        * Logging into Provider Account

            > POST https://entertainment-sports.herokuapp.com/login

        * Provide Movie

            > POST https://entertainment-sports.herokuapp.com/addMovie

        * Update Movie 

            > PATCH https://entertainment-sports.herokuapp.com/updateMovie

        * See Profile 

            > GET https://entertainment-sports.herokuapp.com/seeProfile

        * Change Password 

            > POST https://entertainment-sports.herokuapp.com/changePassword

        * Forgot Password 

            > POST https://entertainment-sports.herokuapp.com/forgotPassword

        * Logout from account

            > DELETE https://entertainment-sports.herokuapp.com/logout

        * Delete Events details

            > DELETE https://entertainment-sports.herokuapp.com/logout/revomeTvSeries/:tvSeriesId

6. General user Routes 

    * Get all the Movies
        > GET https://entertainment-sports.herokuapp.com/allMovies

    * Search Perticular Movie

        > GET https://entertainment-sports.herokuapp.com/singelMovie

    * Search Theater in the city

        > GET https://entertainment-sports.herokuapp.com/searchTheater

    * Search Upcoming Movies

        > GET https://entertainment-sports.herokuapp.com/upcomingMovies

    * Search Current Running Movies in the Theater

        > GET https://entertainment-sports.herokuapp.com/getCurrentlyRunningMovies

    * Search Top rated Movies

        > GET https://entertainment-sports.herokuapp.com/getTopRatedMovies

    * Search TV series

       > GET https://entertainment-sports.herokuapp.com/searchSingleTvSeries

    * Search Uopcoming TV Series

        > GET https://entertainment-sports.herokuapp.com/searchUpcomingTvSeries

    * Search Current TV series

        > GET https://entertainment-sports.herokuapp.com/searchCurrentTvSeries

    * Search Events by city location

       > GET https://entertainment-sports.herokuapp.com/searchCity/event

    * Search Events by category

        > GET https://entertainment-sports.herokuapp.com/searchEvent

    * Search Sports by city location

        > GET https://entertainment-sports.herokuapp.com/searchCity/sports

    * Search Sports by category

        > GET https://entertainment-sports.herokuapp.com/searchSports

# Future Goals :
      1. Auto Lcation maping
      2. Online Payment Wallet
      3. Customer's grievance Suport System
      4. Mobile Application Implementation
      5. Mobile OTP for login
      6. Login Via Google/ Facebook/ Insta/ Twitter
      7. Review and ratings system for general users
      8. general users account creation
      9. Theater seat booking system

# Acknowledgement:

    I would like to express my special thanks of gratitude to my Instructor Sundeep Charan Ramkumar as well as our Mentor Alfred Joseph who gave me the golden opportunity to do this wonderful project on the topic Entertainment and Sports API, which also helped me in doing a lot of Research and I came to know about so many new things I am really thankful to them.
    Secondly I would also like to thank our group-4 friends specially Harish and Siddhida who helped us a lot in finalizing this project within the limited time frame.
