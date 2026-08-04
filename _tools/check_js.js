const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('', {
    url: 'https://radianceglamourlounge.com/treatments/',
    runScripts: "dangerously",
    resources: "usable"
});

jsdom.window.onerror = function(msg, source, lineno, colno, error) {
    console.log("Error:", msg, "at line:", lineno);
};

// Also listen to unhandled rejections
jsdom.window.addEventListener('unhandledrejection', event => {
    console.log("Promise rejected:", event.reason);
});
