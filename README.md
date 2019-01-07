# CheckList

Utility to register standardized checks in ICT equipment.

CheckList is a [PWA](https://medium.freecodecamp.org/progressive-web-apps-101-the-what-why-and-how-4aa5e9065ac2) (_Progressive Web App_) used in Catalan public schools to register standardized checks in the delivery and installation of new ICT equipment.

Demo site: https://met.xtec.cat/checklist<br>
(school code: _12345678_ password: _demo_)

### Usage

The scenario where the application is used has the following elements:

- Each school has a unique ID (currently 8 numeric digits) and a password known only by the school officials.

- The schools have had an allocation of points that allowed them to make a selection of products in a catalog of ICT equipment, based on their educational project. The products are delivered and installed in schools by supplier companies. At the time of installation, schools must check that everything works correctly and is well configured.

- Each ICT product type has a unique alphanumeric identifier and a specific set of tests to be carried out.

- Several teachers of each school simultaneously perform the checks, using different devices.

### Main components

The PWA has three main components, organized in three separated directories:

- __`/api`__: a [REST API](https://en.m.wikipedia.org/wiki/Representational_state_transfer) currently powered by PHP scripts backed by a MySQL 8.0 database.

- __`/app`__: the front end PWA made with [React](https://reactjs.org/) components, most based on [Material-UI](https://material-ui.com/) and built with [create-react-app](https://github.com/facebook/create-react-app) scripts.  

- __`/socketsrv`__: a [WebSocket](https://en.wikipedia.org/wiki/WebSocket) service powered by [Socket.io](https://socket.io/), used to synchronize all instances of the PWA running at the same time on different devices. For more information about this component see: [socketsrv/README.md](https://github.com/projectestac/check-list/blob/master/socketsrv/README.md).

In addition to this, three more folders are provided:

- __`/data`__: Contains product pictures, the application icons and a SQL file (`checklist-demo.sql`) that can be used to initialize the MysQL database with example data. It contains also an utility (`create_units.js`) used to generate SQL scripts from data in JSON format.

- __`/.devilbox`__: Specific settings for [Devilbox](http://devilbox.org/), used to glue all components in a powerful development platform based on [Docker](https://www.docker.com/) containers. For more information see: [.devilbox/README.md](https://github.com/projectestac/check-list/blob/master/.devilbox/README.md).

- __`/.vscode`__: This folder contains a script used to debug react sessions with Chromium in [Visual Studio Code](https://code.visualstudio.com/).

### Prerequisites

- [NodeJS](https://nodejs.org/) is needed to build the main application and launch the webSocket server. Linux users are advised to use the [official LTS repositories](https://github.com/nodesource/distributions/blob/master/README.md).

- A [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle) environment providing Apache or Nginx, PHP and MySQL or MariaDB.

### Setting up

First of all, the [NPM](https://www.npmjs.com/) components must be loaded in `app` and `socketsrv`:

```bash
# Go to the main project directory:
$ cd path/to/checklist

# Go to the 'app' folder and install the required npm components:
$ cd app
$ npm install
```

The same process should be done with the socket server:

```bash
# Go to the main project directory:
$ cd path/to/checklist

# Go to the 'socketsrv' folder and install the required components:
$ cd socketsrv
$ npm install
```

### Common operations

From here, the most usual operations are:

#### Start the socket server:
```bash
$ cd path/to/checklist
$ cd socketsrv
$ SOCKET_PORT=8000 DEBUG=chklist node index.js
```

#### Launch the development server:
```bash
$ cd path/to/checklist
$ cd app
$ npm start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### Build the main application:
```bash
$ cd path/to/checklist
$ cd app
$ npm run build
```
Builds the app for production to the `app/build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

For more information about this and other available scripts check the [Create React App](https://facebook.github.io/create-react-app/) site.

### License and Credits

_CheckList_ has been created by the ICT in Education Unit of the Department of Education of the Government of Catalonia.

Released under the terms of the [European Union Public License v. 1.2](https://spdx.org/licenses/EUPL-1.2.html).

This application uses the following open source components:
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Material UI](https://material-ui.com/) - React components that implement Google's Material Design
- [Socket.IO](https://socket.io/) - Enables real-time, bidirectional and event-based communication
- [json2csv](http://www.mircozeiss.com/json2csv/) - Converts json into csv

