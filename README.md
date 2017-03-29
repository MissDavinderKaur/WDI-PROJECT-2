# WDI\_PROJECT\_2: Manage My Madness

## Overview
When tasked with building a MEN (Mongo, Express, Node) stack app, I decided to build a to-do list app that allow the user to delegate tasks to other users. This is because I have a huge to-do list and I enjoy tasking friends/faily with helping me out!

The application can be found here

## Code Overview
This application only required 2 models: a User and a Task. Each Task has an owner (User) and an assigned to user (also a User object). Each User will have a tasklist (an arry of Task objects). Whilst building this application was relatively simple  - RESTful endpoints for both models - getting the nested models to display on the EJS pages was quite tricky as using the Mongoos populate function, didnt always work as expected.

## Successes
It was a huge win to get the application to hang together the way I wanted it to: each User profile page has a list of Tasks that they owned and also ones delegated to them. Although the styling is quite basic, all required information is displayed on each page.

## Challenges
As mentioned above, when retrieving the data from the Mongo DB, I needed to use the populate functionality to allow all nested data to be shown. However it took a lot of reserch to understand how this works.
 
## Next Steps
This app would be vastly improved by a login feature - to prevent all users from seeing other user's data. I think each user should maintain their own list of categories/labels too, for a more personal experience. Also, using the end-date to provide a countdown of how long is left to complete the task would be great.
