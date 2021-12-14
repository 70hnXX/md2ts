var fs = require("fs");
var path = require("path"); //解析需要遍历的文件夹

/* 用于判断路径是否存在， 如果不存在，则创建一个 */
async function makeDictory(pathStr) {
  var projectPath = path.join(process.cwd());
  var tempDirArray = pathStr.split('\\');
  for (var i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath + '/' + tempDirArray[i];
    if (await isFileExisted(projectPath)) {
      var tempstats = fs.statSync(projectPath);
      if (!(tempstats.isDirectory())) {
        fs.unlinkSync(projectPath);
        fs.mkdirSync(projectPath);
      }
    }
    else {
      fs.mkdirSync(projectPath);
    }
  }
  return projectPath;
};

/**
 * 
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
function delDictory(path, reservePath) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let currentPath = path + "/" + file;
        if (fs.statSync(currentPath).isDirectory()) {
          delDictory(currentPath, reservePath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      if (path != reservePath) {
        fs.rmdirSync(path);
      }
    } else {
      fs.unlinkSync(path);
    }
  }
}
/**
 * 
 * @param {*} path_way 
 * @param {*} string 
 * @returns 
 */
function isFileExistedAndCreate(path_way, string) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        fs.appendFileSync(path_way, string, 'utf-8', (err) => {
          if (err) {
            return console.log('该文件不存在，重新创建失败！')
          }
          console.log("文件不存在，已新创建");
        });
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
};

/** 判断文件是否存在的函数
 * @param path_way, 文件路径
 */
function isFileExisted(path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        resolve(false);//"不存在"
      } else {
        resolve(true);//"存在"
      }
    })
  })
};

function fileDisplay(filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        resolve(err);//"不存在"
      } else {
        resolve(files);//"存在"
      }
    })
  })
};

// 判断路径是否是文件夹
function isDirectory(path) {
  return new Promise((resolve) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        throw err
      }
      if (stat.isFile()) {
        resolve(false)
      }
      if (stat.isDirectory()) {
        resolve(true)
      }
    })
  })
}
module.exports = {
  fileDisplay,
  isDirectory,
  makeDictory,
  delDictory,
  isFileExisted,
  isFileExistedAndCreate
}