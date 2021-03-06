import colours from 'colors/safe';
import moment from 'moment';
import fs from 'fs';

let LogLevel = 1;
let Dialect = 'SQLITE';
let logPath = 'logs.log';
let dateFormat = 'DD-MM-YY HH:mm:ss'

export class Logger {
    static init(path) {
        if (path) logPath = path;

        if (!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, '');
        }
        fs.appendFileSync(logPath, '[SYSTEM STARTING UP] \n');


        console.log(colours.rainbow(
        '\t             _ _       _              \n' +       
        '\t            | | |     | |             \n' +
        '\t _ __  _   _| | |_ __ | |_ _ __       \n' +
        '\t| \'_ \\| | | | | | \'_ \\| __| \'__| \n' +
        '\t| | | | |_| | | | |_) | |_| |         \n' +
        '\t|_| |_|\\__,_|_|_| .__/ \\__|_|       \n' +
        '\t                 | |                  \n' +
        '\t                 |_|                  \n'));
    }

    static SetLevel(level) {
        LogLevel = level;
    }

    static SetDialect(dialect) {
        Dialect = dialect;
    }

    static SetDateFormat(format) {
        dateFormat = format;
    }

    static get VERBOSE_LOGS() {return 0;}
    static get DEBUG_LOGS() {return 1;}
    static get INFO_LOGS() {return 2;}
    static get WARN_LOGS() {return 3;}

    static database(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [${Dialect}] ${message} \n`);
        if (LogLevel > 0) return; 
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.magenta(Dialect) + '] ' + message);
    }

    static middleware(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [MIDDLEWARE] ${message} \n`);
        if (LogLevel > 0) return; 
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.blue('MIDDLEWARE') + '] ' + message);
    }

    static debug(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [DEBUG] ${message} \n`);
        if (LogLevel > 1) return; 
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.cyan('DEBUG') + '] ' + message);
    }

    static ready() {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [READY] \n`);
        console.log('[' + d.toLocaleString() + '] ['
            + colours.rainbow('READY') + ']');
    }
    
    static info(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [INFO] ${message} \n`);
        if (LogLevel > 2) return; 
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.green('INFO') + '] ' + message);
    }

    static warn(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [WARN] ${message} \n`);
        if (LogLevel > 3) return; 
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.yellow('WARN') + '] ' + message);
    }

    static error(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [ERROR] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('ERROR') + '] ' + message);
    }

    static panic(message) {
        let d = moment().format(dateFormat);
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [PANIC] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('PANIC') + '] ' + message);
        process.exit();
    }
}
