const nodeLog = require('../dist/main.js');

console.log(nodeLog);
const log = new nodeLog();
console.log(log);
log.info('info');
log.error('error');
log.warn('warn');
log.open();