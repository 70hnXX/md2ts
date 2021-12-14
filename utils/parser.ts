const MarkdownIt = require("markdown-it");
import Token from "markdown-it/lib/token";

export interface InterfaceConf {
  title?: string;
  fileName?: string;
  functionName?: string;
  method?: string;
  url?: string;
  reqParams?: any;
  reqData?: any;
  resBody?: any;
}

export const markdownParser = (mdStr: string) => {
  try {
    const md = new MarkdownIt();
    const tokens: Token[] = md
      .parse(mdStr, "distributed")
      .filter((item: Token) => item.type.indexOf("heading") === -1);
    const codes: Token[] = tokens.filter((item: Token) => item.tag === "code");
    const requestBody =
      codes[0] && codes[0].content
        ? JSON.parse(codes[0].content.replace(/#(.*?)\n|\*/g, ""))
        : null;
    const responseBody =
      codes[1] && codes[1].content
        ? JSON.parse(codes[1].content.replace(/#(.*?)\n|\*/g, ""))
        : null;
    const title = tokens[0].content.split("<br>")[0];
    const fileName = tokens[0].content.split("/")[1];
    const method =
      tokens && tokens[0]
        ? tokens[0].content.split("<br>")[1].split(" /")[0]
        : "";
    const url =
      tokens && tokens[0]
        ? tokens[0].content.split("<br>")[1].split(" /")[1]
        : "";
    const urlArr = url.split("/");
    const tailName = urlArr[urlArr.length - 1];
    const functionName = method.toLowerCase() + tailName.toUpperCase();

    // console.log('接口名称:', title);
    // console.log('接口method:', method);
    // console.log('接口url:', url);
    // console.log('请求体:', requestBody);
    // console.log('请求体注释:', codes[0].content.match(/#(.*?)\n|\*/g));
    // console.log('返回体:', responseBody);
    // console.log('返回体注释:', codes[1].content.match(/#(.*?)\n|\*/g));

    const config: InterfaceConf = {
      title, // 汉字标题
      fileName, // 模块名，用来做
      method,
      url,
      functionName,
      reqParams: method === "GET" ? requestBody : null,
      reqData: method !== "GET" ? requestBody : null,
      resBody: responseBody.data,
    };
    return config;
  } catch (e) {
    console.log(e);
    console.log(mdStr);
  }
};
