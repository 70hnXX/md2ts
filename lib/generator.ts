import { InterfaceConf } from "./parser";

export interface outPutConfig {
  importMethod?: string;
  types?: string;
}
interface InterfaceConfig {
  [key: string]: string | Object;
}

const types: typeConfig[] = [];
interface typeConfig {
  name: string;
  isExtra: boolean;
  value: InterfaceConfig | any;
}

const getTypeByValue = (value: any) => {
  if (value === null) {
    return "any";
  }
  if (value === "0001-01-01T00:00:00Z") return "Date";
  return typeof value;
};

// 首字母转大写
function firstToUpper(str: string) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}

function generateInterface(data: any) {
  if (JSON.stringify(data) === "{}") return "any";
  if (data === null) return "any";
  const interfaceList: InterfaceConfig = {};
  for (const key in data) {
    // 判断是否时复杂数据类型
    if (key === null) return "any";
    if (typeof data[key] === "object" && !Array.isArray(data[key])) {
      interfaceList[key] = generateInterface(data[key]);
    } else if (Array.isArray(data[key])) {
      interfaceList[key] = `${key}Type[]`;
      // 简单数据类型
      if (typeof data[key][0] !== "object") {
        interfaceList[key] = `${typeof data[key][0]}[]`;
      } else {
        types.push({
          name: `${key}Type`,
          isExtra: true,
          value: generateInterface(data[key][0]),
        });
      }
    } else {
      interfaceList[key] = `${getTypeByValue(data[key])}`;
    }
  }
  return interfaceList;
}

// 根据type数组，去生成interface
function generateInterfaceStr(
  fileName: string,
  method: string,
  types: typeConfig[]
) {
  if (!types.length) return "";
  let returnStr: string = "";
  types.forEach((type: typeConfig) => {
    let typeStr = "";
    for (const key in type.value) {
      if (Object.prototype.hasOwnProperty.call(type.value, key)) {
        const isLast =
          key === Object.keys(type.value)[Object.keys(type.value).length - 1];
        const element = type.value[key];
        typeStr += isLast ? `  ${key}: ${element}` : `  ${key}: ${element};\n`;
      }
    }
    returnStr += type.isExtra
      ? `
/* ${fileName} */
export interface ${type.name} {
${typeStr}
}
        `
      : `
/* ${fileName} */
export interface ${method.toLowerCase()}${firstToUpper(fileName)}${firstToUpper(
          type.name
        )} {
${typeStr}
}
    `;
  });
  return returnStr;
}

export const generator = (config: InterfaceConf) => {
  const {
    title,
    fileName,
    method,
    url,
    functionName,
    reqParams,
    reqData,
    resBody,
  } = config;
  const isGet = method === "GET";
  // 解析req和res的结构，生成对应的type
  if (isGet) {
    types.push({
      name: "reqParamsTypes",
      isExtra: false,
      value: generateInterface(reqParams),
    });
  } else {
    types.push({
      name: "reqBodyTypes",
      isExtra: false,
      value: generateInterface(reqData),
    });
  }
  // 解析返回体
  types.push({
    name: "resBodyTypes",
    isExtra: false,
    value: generateInterface(resBody),
  });
  // 生成interface代码
  const typeConfig = generateInterfaceStr(fileName, method, types);
  // 请求的方法
  const importMethodRaw = `
/* ${title} */
export async function ${functionName}(${isGet ? "params" : "data"}) {
  return request({
    module: "erp",
    url: "/${url}",
    method: "${method}",
    ${isGet ? "params" : "data"}
  })
}
  `;
  console.log(typeConfig);
  const outPut: outPutConfig = {
    importMethod: importMethodRaw,
    types: typeConfig,
  };

  return outPut;
};
