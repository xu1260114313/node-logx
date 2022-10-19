import { spawnSync } from 'child_process';
import { tmpdir } from 'os';
import { appendFileSync, mkdirSync } from 'fs';
import * as dayjs from 'dayjs';
import { join } from 'path';

/**
 * Log日志记录.
 * @constructor
 * @param {string} dirName - 文件夹名称(默认'logs').
 * @param {string} prefix - 前缀.
 * @param {string} subfix - 后缀.
 */
class Log {
    /** 
     * @private rootDir - 根文件夹
     */
    private rootDir: string = tmpdir();
    /** 
     * @private fileName - 文件名称
     */
    private fileName: string;
    /** 
     * @private logDir - log文件夹
     */
    private logDir: string;
    /** 
     * @private logFileName - log文件名称
     */
    private logFileName: string;
    constructor(public dirName: string = 'logs', public prefix = "", public subfix = "") {
        this.dirName = dirName;
        this.fileName = dayjs().format('YYYYMMDDHHmmss');
        this.logDir = join(this.rootDir, this.dirName);
        try {
            mkdirSync(this.logDir);
            this.logFileName = this.logDir + "/" + this.fileName + ".log";
        }catch{
            this.logFileName = this.logDir + "/" + this.fileName + ".log";
        }
    }
    log(log: string) {
        this.info.call(this, log);
    }
    warn(log: string) {
        try {
            appendFileSync(this.logFileName, '[warn]: ' + this.prefix + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
    }
    info(log: string) {
        try {
            appendFileSync(this.logFileName, '[info]: ' + this.prefix + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
    }
    error(log: string) {
        try {
            appendFileSync(this.logFileName, '[error]: ' + this.prefix + log + this.subfix + '\n');
        } catch (error) {
            console.log(error)
        }
        
    }
    open() {
        try {
            spawnSync(process.platform === 'win32'?'explorer': 'open', [this.logDir]);
        }catch(err) {
            console.log(err);
        }
    }
}

export default Log;