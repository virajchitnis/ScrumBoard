# ScrumBoard
A simple scrum board for agile projects

## Installation

This application uses the MEAN stack.

### Ubuntu

```
$ sudo apt-get install mongodb nodejs npm nginx nodejs-legacy
$ sudo npm install -g express
$ wget https://github.com/virajchitnis/ScrumBoard/archive/beta1.tar.gz
$ tar -zxvf beta1.tar.gz
$ cd ScrumBoard-beta1/
$ npm install
$ npm start
```

Visit http://localhost:3000/ to use the application.
If you want to serve this application on port 80, configure nginx to proxy requests from port 80 to http://localhost:3000/.