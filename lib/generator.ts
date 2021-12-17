import { InterfaceConf } from "./parser";

export interface outPutConfig {
  importMethod?: string;
  reqTypes?: string;
  resTypes?: string;
  importMethodRaw?: string;
  reqTypesRaw?: string;
  resTypesRaw?: string;
}

const getTypeByValue = (value: any) => {
  if (value === null) {
    return "any";
  }
  return typeof value;
};

export const generator = (config: InterfaceConf) => {
  const { title, method, url, functionName, reqParams, reqData, resBody } =
    config;
  const isGet = method === "GET";
  let reqParamsInterface = "";
  let reqDataInterface = "";
  let resBodyDataInterface = "";
  // 解析req和res的结构，生成对应的type
  if (isGet) {
    for (const key in reqParams) {
      const isLast =
        key === Object.keys(reqParams)[Object.keys(reqParams).length - 1];
      reqParamsInterface += isLast
        ? `  ${key}?: ${getTypeByValue(reqParams[key])}`
        : `  ${key}?: ${getTypeByValue(reqParams[key])};\n`;
    }
  } else {
    for (const key in reqData) {
      const isLast =
        key === Object.keys(reqData)[Object.keys(reqData).length - 1];
      reqDataInterface += isLast
        ? `  ${key}?: ${getTypeByValue(reqData[key])}`
        : `  ${key}?: ${getTypeByValue(reqData[key])};\n`;
    }
  }

  for (const key in resBody) {
    const isLast =
      key === Object.keys(resBody)[Object.keys(resBody).length - 1];
    resBodyDataInterface += isLast
      ? `  ${key}: ${getTypeByValue(resBody[key])}`
      : `  ${key}: ${getTypeByValue(resBody[key])};\n`;
  }

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
  const importMethod = "```" + importMethodRaw + "```";

  // 请求体types
  const reqTypesRaw = `
/* ${title} */
export interface ${functionName}ReqInterface {
${isGet ? reqParamsInterface : reqDataInterface}
}
`;
  const reqTypes = "```" + reqTypesRaw + "```";

  // 返回体types
  const resTypesRaw = `
/* ${title} */
export interface ${functionName}ResInterface {
${resBodyDataInterface}
}
`;
  const resTypes = "```" + resTypesRaw + "```";

  const outPut: outPutConfig = {
    importMethod,
    reqTypes: reqTypes,
    resTypes: resTypes,
    importMethodRaw,
    reqTypesRaw,
    resTypesRaw,
  };

  return outPut;
};
