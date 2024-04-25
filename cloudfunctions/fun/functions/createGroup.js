module.exports = async (args, db, openId, ctx) => {
  try {
    // 防止加入两个小组
    let exist = await db.collection("form").where({
        _openid: openId,
      }).get();
       
    if (exist && exist.data[0] && exist.data[0].groupId) {
      return {
        success: false,
        errorMessage: "已有小组",
      };
    }
    // 想要递增小组id怎么办
    let res = await db.collection("group").count();
    let groupId = parseInt(res.total) + 1;

    // 严格项目需要事务功能，可以自行搜索并查看文档
    await db.collection("group").add({
      data: {
        leader: args.nickname,
        region: args.region,
        code: args.code,
        age: args.age,
        info: args.info,
        member: 1,
        _openid: openId,
        groupId,
      },
    });

    await db.collection("form").add({
      data: {
        nickname: args.nickname,
        gender: args.gender === "female",
        region: args.region,
        code: args.code,
        age: args.age,
        info: args.info,
        isLeader: true,
        _openid: openId,
        groupId,
      },
    });
    return {
      success: true,
      groupId,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};