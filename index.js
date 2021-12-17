#!/usr/bin/env node
var fs = require("fs");
var path = require("path"); //解析需要遍历的文件夹
// const program = require('commander');
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
      filtedFileList.forEach(async function (subFileName) {
        var filedir = path.join(filePath, filename, subFileName);
        var content = fs.readFileSync(filedir, "utf-8");
        const config = markdownParser(content);
        const outPutConf = generator(config);
        // console.log(outPutConf.importMethodRaw)
        requestFile += outPutConf.importMethod
        reqTypeFile += outPutConf.types
      })
      await isFileExistedAndCreate(`${outputPath}/${filename}/${filename}.ts`, requestFile)
      await isFileExistedAndCreate(`${outputPath}/${filename}/${filename}Types.ts`, reqTypeFile)
    } else {
      var content = fs.readFileSync(filedir, "utf-8");
      const config = markdownParser(content);
      const outPutConf = generator(config);
      await isFileExistedAndCreate(`${outputPath}/${config.fileName}.ts`, outPutConf.importMethod)
      await isFileExistedAndCreate(`${outputPath}/${config.fileName}Types.ts`, outPutConf.types)
    }
  });
}

init()