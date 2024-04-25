let cloud = require("wx-server-sdk"); //引入微信云开发sdk
let files = require("./apis.js");
let Fun = {}; //创建一个Fun对象，将所有函数放入方便下面调用

// 设置循环目录数组，去掉文件名作为对象名称设置为属性名，值value代表对应函数
files.map((filename) => {
  let name = filename.replace(".js", "");
  // 静态方法Object.defineProperty()直接在一个对象上定义一个新的属性，或者修改其现有属性，并返回此对象
  // 此处应用是修改Fun对象属性
  Object.defineProperty(Fun, name, {
    value: require("./functions" + filename),
  });
});
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, //初始化云开发环境
});

let db = cloud.database(); // 云开发数据库对象


// 云函数入口函数，severless后端接收到请求后调用该main函数，传入前端参数
exports.main = async (event, context) => {
  try {
    let wxContext = cloud.getWXContext(); //获取发送请求用户的openid信息
     // 判断Fun对象的api名的属性类型是否为函数，若不是，说明没有该api，则报错
     if (typeof Fun[event.api] !== "function") {
      throw Error("no api");
     }
     // 由于所有函数均为异步函数，因此统一使用await调用Fun中api名称的函数，第一个参数为前端传来的数据
     return await Fun[event.api](event.args, db, wxContext.OPENID, {
      cloud,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
     });

  } catch (error) {
    console.error(error); // try中所有的错误信息将在这里被catch并打印
    return {
      success: false,
      errorMessage: error.Message,
    };
    
  }
};
        
