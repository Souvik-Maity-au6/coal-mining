# Entertainment-Sports-API
Project done by Abhijeet and Souvik

# Contributors

* Abhijeet Rajak
* Souvik Maity
* Sundeep Charan Ramkumar(Project Instructor)
* Alfred Joseph(Project Mentor)

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

        * 


