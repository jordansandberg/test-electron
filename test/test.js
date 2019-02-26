const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// point to the Electron node module
var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

console.log(appPath);

//creates the application for spectron
var app = new Application({
    path: electronPath,
    args: [appPath]
});

// set up chai-as-promised and start app
global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
    return app.start();
});

// describe() are for grouping; test suites.
describe("Window-change",function(){
    // it() are test cases

    it('should turn the background red', function(done){

        click('button*=Red');
        return $('.body').should.have.css('background-color', 'red');
    })
});

// teardown
after(function() {
    if(app && app.isRunning()){
        return app.stop();
    }
});