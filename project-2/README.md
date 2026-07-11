# config/
Configuration files don't belong inside controllers or routes.
Connecting to the database is application configuration.

# What is Mongoose?

Remember what the PDF said?

Use an ORM.

For MongoDB, Mongoose is technically an ODM (Object Document Mapper), but it serves the same purpose: it lets you work with JavaScript objects instead of writing raw MongoDB commands everywhere.