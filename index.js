#!/usr/bin/env node
var fs = require("fs");
var path = require("path"); //解析需要遍历的文件夹
const program = require('commander');
const { markdownParser } = require("./utils/parser")
const { generator } = require("./utils/generator")
const {
  fileDisplay,
  isDirectory,
  makeDictory,
  delDictory,
  isFileExisted,
  isFileExistedAndCreate
} = require("./utils/fs")

// 获取自定义的输入输出文件夹路径
const inputPath = process.argv[process.argv.indexOf('--i') + 1] || './doc'
const outputPath = process.argv[process.argv.indexOf('--o') + 1] || './dist'

const whiteList = ['.DS_Store'] // 不需要解析的文件
var filePath = path.resolve(inputPath);

// 生成对应的文件
async function init() {
  const isInputDirectoryExisted = await isFileExisted(inputPath)
  if (!isInputDirectoryExisted) {
    console.log('没有找到需要转换的markdown文件')
    console.log('请配置存放markdown文件的目录')
    return
  }
  // 清除输出文件夹
  const isExisted = await isFileExisted(outputPath)
  if (isExisted) {
    delDictory(outputPath)
    makeDictory(outputPath)
  } else {
    makeDictory(outputPath)
  }
  // 获取输入文件夹内的文件
  const fileList = await fileDisplay(filePath);
  fileList.forEach(async function (filename) {
    var filedir = path.join(filePath, filename);
    // 如果是文件夹，获取文件夹下的文件
    const isisDirectory = await isDirectory(filedir)
    if (isisDirectory) {
      // 创建二级目录
      makeDictory(outputPath + '/' + filename)
      const dirFileList = await fileDisplay(filedir);
      const filtedFileList = dirFileList.filter(filename => whiteList.indexOf(filename) === -1)
      // 一个文件夹下的markdown,要归档到一个文件下
      let requestFile = `import request from "@/utils/request";
      `
      let reqTypeFile = ""
      let resTypeFile = ""
      filtedFileList.forEach(async function (subFileName) {
        var filedir = path.join(filePath, filename, subFileName);
        console.log('filedir:', filedir)
        var content = fs.readFileSync(filedir, "utf-8");
        const config = markdownParser(content);
        const outPutConf = generator(config);
        // console.log(outPutConf.importMethodRaw)
        requestFile += outPutConf.importMethodRaw
        reqTypeFile += outPutConf.reqTypesRaw
        resTypeFile += outPutConf.resTypesRaw
      })
      await isFileExistedAndCreate(`${outputPath}/${filename}/${filename}.ts`, requestFile)
      await isFileExistedAndCreate(`${outputPath}/${filename}/${filename}ReqTypes.ts`, reqTypeFile)
      await isFileExistedAndCreate(`${outputPath}/${filename}/${filename}ResTypes.ts`, resTypeFile)
    } else {
      var content = fs.readFileSync(filedir, "utf-8");
      const config = markdownParser(content);
      const outPutConf = generator(config);
      await isFileExistedAndCreate(`${outputPath}/${config.fileName}.ts`, outPutConf.importMethodRaw)
    }
  });
}

init()
//文件遍历方法
// function fileDisplay(filePath) {
//   //根据文件路径读取文件，返回文件列表
//   fs.readdir(filePath, function (err, files) {
//     if (err) {
//       console.warn(err);
//     } else {
//       //遍历读取到的文件列表
//       files.forEach(function (filename) {
//         //获取当前文件的绝对路径
//         var filedir = path.join(filePath, filename);
//         //根据文件路径获取文件信息，返回一个fs.Stats对象
//         fs.stat(filedir,async function (eror, stats) {
//           if (eror) {
//             console.warn("获取文件stats失败");
//           } else {
//             var isFile = stats.isFile(); //是文件
//             var isDir = stats.isDirectory(); //是文件夹
//             if (isFile) {
//               var content = fs.readFileSync(filedir, "utf-8");
//               const config = markdownParser(content);
//               const outPutConf = generator(config);
//               const isExisted = await isFileExisted('./dist')
//               if(isExisted) {
//                 delDictory('./dist')
//                 makeDictory('./dist')
//               } else {
//                 makeDictory('./dist')
//               }
//               await isFileExistedAndCreate('./dist/output.ts', outPutConf.importMethodRaw)
//             }
//             if (isDir) {
//               fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
//             }
//           }
//         });
//       });
//     }
//   });
// }



