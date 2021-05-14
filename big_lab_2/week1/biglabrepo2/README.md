
# BigLab 2 - Class: 2021 WA1

## Team name: TEAM_NAME

Team members:
* s123456 LASTNAME FIRSTNAME
* s123456 LASTNAME FIRSTNAME 
* s123456 LASTNAME FIRSTNAME
* s123456 LASTNAME FIRSTNAME (delete line if not needed)

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.


### Filter
* [GET] ['/api/filter/:filterId']
* [returns the list of tasks filtered by filterId (all...next7days)]
* [GET http://localhost:3000/api/filter/all]
* HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 131
ETag: W/"83-6uSIIb6DgqGvx8rU9ZvtzbCUB3w"
Date: Fri, 14 May 2021 17:17:38 GMT
Connection: close

[
  {
    "id": 2,
    "description": "Go for a walk",
    "important": 1,
    "private": 1,
    "deadline": "2021-04-14 08:30",
    "completed": 0,
    "user": 1
  },
  {
    "id": 5,
    "description": "Prepare thesis discussion",
    "important": 1,
    "private": 1,
    "deadline": "2021-05-21 21:00",
    "completed": 1,
    "user": 1
  }
]
* [HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 19
ETag: W/"13-B1fPu4O12lwEOJzFfUShk8E7GZA"
Date: Fri, 14 May 2021 17:19:17 GMT
Connection: close

"unexistent filter"]

### Retrieve by id 
* [GET]['/api/retrieveTask/:id']
* [retrieve a task given its id]
* [GET http://localhost:3000/api/retrieveTask/2]
* [HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 117
ETag: W/"75-XOXunXYhF5rYYo3Z6Ejp5ewtBdE"
Date: Fri, 14 May 2021 17:24:11 GMT
Connection: close

{
  "id": 2,
  "description": "Go for a walk",
  "important": 1,
  "private": 1,
  "deadline": "2021-04-14 08:30",
  "completed": 0,
  "user": 1
}]
* [HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 27
ETag: W/"1b-U+IGTUOxefCZ4+1oh0S4K+JnPeM"
Date: Fri, 14 May 2021 17:25:48 GMT
Connection: close

{
  "error": "Task not found."
}]

### Create Task

* [POST] ['/api/addTask']
* [inserts the task sent in body into db, returns the id]
* [POST http://localhost:3000/api/addTask
Content-Type: application/json

{ "description" : "test", "important" : 1, "private" : 1, "deadline" : "2021-06-06 12:00", "user" : 1 }
]
* [HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-sdV4ERHYT3s/5FoIUuWXWM16h+U"
Date: Fri, 14 May 2021 17:27:33 GMT
Connection: close

10]

### Update Task


* [POST] ['/api/updateTask']
* [updates the task, if present]
* [POST http://localhost:3000/api/updateTask
Content-Type: application/json

{"id": 14, "description" : "testaaaa", "important" : 1, "private" : 1, "deadline" : "2021-06-06 12:00", "user" : 1 }
]
* [HTTP/1.1 200 OK
X-Powered-By: Express
Date: Fri, 14 May 2021 17:31:17 GMT
Connection: close
Content-Length: 0
]


### Delete task

* [GET] ['/api/deleteTask/:id']
* [deletes a task]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

### Mark task

* [POST] ['/api/markTask']
* [updates a task whose id and mark value is sent in body]
* [POST http://localhost:3000/api/markTask
Content-Type: application/json

{ "id" : 2, "mark" : 0}]
* [Sample response, with body (if any)]
* [Error responses, if any]