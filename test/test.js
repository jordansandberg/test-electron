const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// init chai
chai.should();
chai.use(chaiAsPromised)

// point to the Electron node module
var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')

if (process.platform === 'win32') {
    electronPath += '.cmd'
}

var appPath = path.join(__dirname, '..')

console.log(appPath);
console.log(electronPath)

//creates the application for spectron
var app = new Application({
    path: electronPath,
    args: [appPath],
    env: {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true,
        NODE_ENV: "development"
    },
    startTimeout: 20000
});

// set up chai-as-promised and start app
// global.before(function (done) {
//     chaiAsPromised.transferPromiseness = app.transferPromiseness;
// });

// describe() are for grouping; test suites.
describe("Window-change",function(){
    // run before each test
    beforeEach(function () {
        this.timeout(20000)
        return app.start()
    });

    //run after each test
    afterEach(function() {
        return app.stop();
    });

    // it() are test cases
    it('should turn the background red', function(done){
        // app.client.element('#red')
        //     .click()
        //     .then(app.client.element('body').getAttribute('style'))
        //     .then(html => {
        //         console.log(html)
        //     })
        //     .catch(done)
        app.client.element('#red').click()
        app.client.element('.colour-box').getAttribute('style')
        .then(style => {
            chai.assert.equal('background-color: red;', style)
            done()
        }).catch(done)   
    });

    it('should turn the background blue', function(done){
        app.client.element('#blue').click()
        app.client.element('.colour-box').getAttribute('style')
        .then(style => {
            chai.assert.equal('background-color: blue;', style)
            done()
        }).catch(done)  
    })

    it('should turn the background green', function(done){
        app.client.element('#green').click()
        app.client.element('.colour-box').getAttribute('style')
        .then(style => {
            chai.assert.equal('background-color: green;', style)
            done()
        }).catch(done)  
    })

});
