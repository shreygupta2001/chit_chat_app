This application has been built as a project for Microsoft Engage 2021.\
Try out the application here: https://chit-chat-webapp.herokuapp.com/ \
The code can be found out at these GitHub repository links: https://github.com/shreygupta2001/chit_chat_server \
https://github.com/shreygupta2001/chit_chat_app \
A complete documentation can be found here: https://drive.google.com/file/d/1e3WTwfLyr2QkW-hbQkzpx0w519B6P7xR/view

# DOCUMENTATION

MICROSOFT ENGAGE 2021 PROJECT \
CHIT CHAT WEB APP BY - SHREYA GUPTA

## DESCRIPTION

This project has been done as a part of Microsoft Engagement and Mentorship
Program 2021. The aim was to build a clone of Microsoft Teams satisfying a basic
requirement that two people should be able to have a video conversation with each
other through it. I built a web application for it using basic HTML, CSS, Javascript and
MERN Stack for development and webRTC for media sharing and connection through
the web. The complete list of libraries used has been given below.

The development phase has the concept of AGILE to its core. A functional feature is built after which
additional features are taken care of to deliver a completely functional product at the
end. All the functionalities have been explained in detail in the youtube video uploaded
as a part of submission.

During the Adapt phase, the chat feature was added in one-to-one calling with fast and
disappearing messages.

## PREREQUISITES

This section lists all the frameworks and web development related libraries used to
build the application. The basics of HTML, CSS and Javascript have been used to
implement all the things.

For the backend of web applications i.e. server, Node.js has been used. Installation can
be directly done from the website by following a few simple steps.

The command npm init was run to initialise the package.json file which stores all the
basic information about the document and the dependencies required.

For the app, Express.js is used. It is a node.js web application framework for easily
building web applications. To install it, run npm install --save express on the
integrated terminal.

To enable real time communication happening through the web application, Socket.io
has been used. To install it, run npm install --save socket.io on the integrated
terminal.

For the FrontEnd of the application, React.js has been used. It is used for making good
User Interfaces and controlling the frontend of the application. It’s installation can be
done by following a few simple steps on the website and running npx
create-react-app on the integrated terminal.

To establish the connection between socket client and socket server, socket.io-client
has been used. To install it, run npm install --save socket.io-client on the
terminal.

For routing through the different component web pages, react router dom has been
used for easy navigation. To install it, run npm install react-router-dom on the
terminal.

To manage the states of various components a state container has been used i.e. Redux.
To install it, type npm install react-redux redux on the terminal.

Moving to Group calling, Peer js is used. It simplifies the functionality of webRTC to have
peer-to-peer connection for audio and video streaming. To install it, type npm install
--save peer on the terminal.

To have a unique but random room id for every room that we create, uuid has been used.
To install it, run npm install --save uuid on the command line terminal.

Lastly, for the web application to work from anywhere, cors has been used. To install it,
run npm install --save cors on the terminal.

## INSTALLATION

The web application can be used by clicking on this link:
https://chit-chat-webapp.herokuapp.com/
To run the application on a local network, the github repositories can be cloned.
After cloning the github repository, open it in a code editor (preferably Visual Studio
Code).

Type npm install on the command line to install all the dependencies.

Navigate to the server folder, and type node server.js. The server will start running.

Navigate to the frontend folder, and type npm start. The frontend will start working
and the application will open in the browser.
