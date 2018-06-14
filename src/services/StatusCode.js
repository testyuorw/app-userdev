const StatusCode = {};
StatusCode.order = {
  0: "已取消",
  1: "等待接单",
  2: "已接单",
  3: "等待付款",
  7: "施工中",
  8: "等待验收",
  9: "待确认完工",
  10: "待评价",
  11: "已完工",
  '-1': "订单已取消"
};
StatusCode.orderdetail = {
  0: "订单已取消",
  1: "已预约工友",
  2: "工友已接单",
  3: "去付款",
  7: "施工中",
  8: "等待验收",
  9: "确认完工",
  10: "待评价",
  11: "已完工",
  '-1': "订单已取消"
};
export default  StatusCode;