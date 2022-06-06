# Elevator Logic Code Excercise

A small application simulating elevator calls.
<br/>
Available at: https://elevators-micky.herokuapp.com/
<br/>
<br/>

## Getting Started

Clone this repo and install dependencies in both the client and api folders SEPERATELY using:

```bash
npm i
```

Once dependencies finish installing, be sure to run both the backend server and frontend dev server SEPERATELY by running the following command in both folders:

```bash
npm start
```
<br/>

## Main logic for the elevators

The logic for which elevators receive which calls is an extremely simplified version of OTIS's elevator logic. The main takeaway is that it prioritizes idle elevators and any elevators that are currently en route to the origin of the incoming call.
<br/>
<br/>
The main logic can be found in the assignCalls function in api/utils.js
<br/>
<br/>

## Work left to be done

There is a todo.md specifying some tasks left uncompleted
