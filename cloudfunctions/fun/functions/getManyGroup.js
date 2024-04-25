module.exports = async (args, db, openId, ctx) => {
  const _ = db.command;
  let res = await db
    .collection("group")
    .where({
      member: _.lt(6), //where查询成员数量小于6人的数据
    })
    .orderBy("groupId", "asc") // asc表示正序排列
    .get();
  return {
    success: true,
    groupList: res.data,
  };
};