# config/
Configuration files don't belong inside controllers or routes.
Connecting to the database is application configuration.

# What is Mongoose?

Like an ORM.

For MongoDB, Mongoose is technically an ODM (Object Document Mapper), but it serves the same purpose: it lets you work with JavaScript objects instead of writing raw MongoDB commands everywhere.

# Status Codes
200 OK
201 Created
204 No Content
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error

204 means "the request succeeded and there's nothing else to return."