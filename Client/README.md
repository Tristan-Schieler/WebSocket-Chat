# Project 1

Gift of Asynchronous Babble Chat Client

## Getting Started

## Installing

`npm install`

## Use

### joining into Server:
* Type use local host/port number 
    * `node . yourusername` - connect with username `yourusername`
    * username must be alpha-numeric and be between 3 and 10 characters
* To use specific host/port number 
    * `node . username host  port`
    * EX: `node . username 10.226.9.220  4931` - server running on port 4931 and address 10.226.9.220

### Type `help` for a list of commands:
* Commands are `NOT` case sensitive
    * `g` for global message
    * `d` for direct message
    * `ul` for userlist of server
    * `u` for username you are using
    * `rm` to send random ascii art meme
    * `exit` to leave client and server

For Global message type "command message" then enter:
* EX: `g hello` - for a global message of hello

For Direct message type "command towho message" then enter:
* EX: `d name hello` - for a direct message of hello to name

For Random Meme type "command towho" then enter:
* EX: `rm username` - to send a random ascii art meme to username

for Userlist and Username typr command then enter:
* EX: `ul` - for list of users on the server
* EX: `u` - for th username you are using

Two  options for loging off of server and exiting Client:
* `exit` followed by enter
* press ctrl and c at the same time

## JSON Styling

The expression.json provides styled expressions to the client
* "expression" is the word being styled
* "style" is the style used on the word
* EX: `{"expression": "wonderful", "style": "bold"}` will make the word wonderful bold

Epressions can be added to Expression.json file. 
* `Make sure you use the same formating`
* `You must use one of the styles already in the file` 

## Built With

* [ws](https://github.com/websockets/ws) - Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js

* [fs](https://nodejs.org/api/fs.html) - The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.

* [terminal-kit](https://www.npmjs.com/package/terminal-kit) - A full-blown terminal lib featuring: 256 colors, styles, keys & mouse handling, input field, progress bars, screen buffer (including 32-bit composition and image loading), text buffer, and many more...


## Versioning

The version of this server provided is purely for test purposes. The Maker reserves the right to make small updates to this client for bugfixes. 
