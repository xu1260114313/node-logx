### node-logx

#### introduction.

记录日志内容并查看.

##### example
```javascript
const nodeLog = require('node-logx');
/**
 * @param dirName - 文件夹名称(默认: logs)
 * @param prefix - 前缀
 * @param subfix - 后缀
 * @param format - 日期格式(默认: YYYY-MM-DD HH:mm:ss)
 * @methods info 普通日志
 * @methods warn 警告日志
 * @methods error 错误日志
 * @methods open 打开日志所存在的文件夹
 */
const log = new nodeLog(dirName, prefix, subfix, format);

/**
 * @param printStr 输出的内容
 */
log.info(printStr);
log.warn(printStr);
log.error(printStr);
log.open();
```