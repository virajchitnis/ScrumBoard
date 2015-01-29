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

Configure nginx to proxy requests to http://localhost:3000/ if you need.