// 该脚本用于在api.js文件中自动记录

const fs = require("fs"); //file system文件系统函数，用于操控电脑文件

// 通过readdir读取目录，sync表示同步该路径下所有文件名，__dirname为当前文件所在路径
let files = fs.readdirSync(__dirname + "/cloudfunctions/fun/functions");

// writeFileSync函数中第一个参数时路径和文件名，第二个参数是具体写入的内容，必须是string 格式
// 将前面读取的函数目录导出，从而可以内index入口处引入
fs.writeFileSync(
    __dirname + "/cloudfunctions/fun/apis.js",
    "module.exports = " + JSON.stringify(files)
)
