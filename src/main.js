const {spawnSync} = require('child_process');
const { tmpdir } = require('os');
const {appendFileSync, mkdirSync} = require('fs');
const dayjs = require('dayjs');
const { join } = require('path');

/**
 * Log日志记录.
 * @constructor
 * @param {string} dirName - 文件夹名称(默认'logs').
 * @param {string} prefix - 前缀.
 * @param {string} subfix - 后缀.
 * @param {string} format - 日期格式(默认: YYYY-MM-DD HH:mm:ss).
 */
class Log {
    /** 
     * @private _rootDir - 根文件夹
     * @private _fileName - 文件名称
     * @private _logDir - log文件夹
     * @private _logFileName - log文件名称
     * @public prefix - 前缀
     * @public subfix - 后缀
     * @public format - 后缀
     */
    constructor(dirName = 'logs', prefix = "", subfix = "", format = "YYYY-MM-DD HH:mm:ss") {
        this._rootDir = tmpdir();
        this._dirName = dirName;
        this._fileName = dayjs().format('YYYYMMDDHHmmss');
        this._logDir = join(this._rootDir, this._dirName);
        this.prefix = prefix;
        this.subfix = subfix;
        this.format = format;
        try {
            mkdirSync(this._logDir);
            this._logFileName = this._logDir + "/" + this._fileName + ".log";
        }catch{
            this._logFileName = this._logDir + "/" + this._fileName + ".log";
        }
    }
    log(log) {
        this.info.call(this, log);
    }
    warn(log) {
        try {
            appendFileSync(this._logFileName, `[warn] [${dayjs().format(this.format)}]: ` + `${this.prefix? [this.prefix]: ''}` + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
    }
    info(log) {
        try {
            appendFileSync(this._logFileName, `[info] [${dayjs().format(this.format)}]: ` + `${this.prefix? [this.prefix]: ''}` + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
    }
    error(log) {
        try {
            appendFileSync(this._logFileName, `[error] [${dayjs().format(this.format)}]: ` + `${this.prefix? [this.prefix]: ''}` + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
        
    }
    open() {
        try {
            spawnSync(process.platform === 'win32'?'explorer': 'open', [this._logDir]);
        }catch(err) {
            console.log(err);
        }
    }
}

module.exports = Log;