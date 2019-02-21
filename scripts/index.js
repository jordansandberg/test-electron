// Test electron application file

const { app, BrowserWindow } = require('electron')
const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// // create path for spectron to run app from
// var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

// // modification for windows
// if(process.platform == 'win32') {
//   electronPath += '.cmd';
// }


// var appPath = path.join(__dirname, '..')

// var appTest = new Application({
//   path: electronPath,
//   args: [appPath]
// });

// // set up Chai
// global.before(function () {
//   chai.should();
//   chai.use(chaiAsPromised);
// });

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('templates/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.on('ready', createWindow)
