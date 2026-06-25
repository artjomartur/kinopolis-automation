const fs = require('fs');
let code = fs.readFileSync('src/index.html', 'utf8');

code = code.replace(
    /window\.setSettingsPage = function\(pageId, btn\) \{/,
    `window.setSettingsPage = function(pageId, btn) {
            console.log("setSettingsPage called with:", pageId);`
);

fs.writeFileSync('src/index.html', code);
