# For Linux

Type the following commands:

- (root directory) npm install
- cd app
- (app directory) npm install
- npm start (this would lead to the error page, but when you type /wally on the url, it will lead you to the auth login page)

# For Windows

## Runs on Node 16 smoothly but the latest versions of node are more secure.

There are things that are needed to be installed first because some dependencies need the Windows build tools installed. Refer below:

- go to Program files/nodejs
- run the install_tools.bat and it should install all the necessary build tools for windows.
- follow the steps in linux workflow

# After Running

- type /wally to url
- input credentials
- it will lead to /connectors, where you will see all the apps that are connected.
