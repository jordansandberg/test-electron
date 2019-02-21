// Test electron application file

const { app, BrowserWindow } = require('electron')
const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {ipcMain} = require('electron');

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
let mainWindow;
let secondWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    resizable: true, 
  })

  secondWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    resizable: true,
    show: false 
  })
  // and load the index.html of the app.
  mainWindow.loadFile('templates/index.html')
  secondWindow.loadFile('templates/red.html')
  
  // // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

ipcMain.on('changeRed', (event, arg) => {
  secondWindow.show()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})