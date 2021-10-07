AskMeAnything Documentation

The project was implemented in MVC and MSS architectures. The technologies used for both architectures are : Nodejs,Expressjs,Ejs and Mongodb.

The MVC project was structured under the principals of MVC structure and the main characteristics of it are Models, Views and Controllers.

The interesting and most challenging part was the implementation of the MSS architecture. I decided to implement 10 services, each for every possible 
functionality in order to provide better UX even if something goes wrong with a certain service. To be more specific, if the create-a-post-service is down, the user will not be able to ask a new question to the public but can still browse around questions or answer a question. Therefore, i believe that in this way, better UX is provided.

As for the eventbus, I implemented my own that receives every kind of event as an object({type,data}) and routes each received event in every subscriber and the subscriber dispatches the event and decides what to do with it.

Another important aspect of MSS is sustainability and synchronisation. In order to achieve this, i created my own EventsSync function which is executed every time a service goes up and checks if an event was emitted while it was down. If not, it logs in the terminal message that "Everything is up-to-date", else it syncs the events and logs "Successful Synchronisation". The things mentioned above are achieved by keeping a counter in every service that represents the number of events it received. The Event Bus has its own database the stores each and every event and therefore every service can ask for the total events emitted and if the counter is smaller than the total events, it receives and handles the missed events, while increasing the counter for every missed event. After that, everything is up-to-date and every service holds the same data.

Deployment
I decided to deploy to heroku, both MSS and MVC. The steps of the deployment were:
1) Created a branch in my github repo that holds the MSS and MVC projects ready to be deployed.
2) heroku login
3) heroku create <app_name> : Create a heroku app for the MVC folder and each of the mss subfolders.
4) heroku git:remote -a <app_name>
5) git subtree push --prefix <path/to/subfolder> heroku master
6) heroku open ( to open the app )

For the MVC i just had to set the PORT that the server is listening to process.env.PORT
For the MSS, i had to create and deploy every app and then change all the post and get requests to the endpoints running in my localhost with the heroku urls.
The branch deploymss holds all the changes made to the urls.

UML Diagrams
In the documentation folder, the is a .vpp file that contains the UML diagrams for both implementations.


