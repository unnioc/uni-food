"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "OrderPage",
  setup(__props) {
    const orderHistory = common_vendor.ref([{
      id: "1001",
      shopName: "The Uni Food",
      price: "18.50",
      date: "2023-10-24"
    }, {
      id: "1002",
      shopName: "The Uni Food",
      price: "12.00",
      date: "2023-10-22"
    }, {
      id: "1003",
      shopName: "The Uni Food",
      price: "24.15",
      date: "2023-10-21"
    }, {
      id: "1004",
      shopName: "The Uni Food",
      price: "15.40",
      date: "2023-10-10"
    }]);
    const goToDetails = (orderId) => {
      common_vendor.index.navigateTo({
        url: "/packageOrder/OrderDetailPage/OrderDetailPage"
        // url: `/pages/order-details/order-details?id=${orderId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderHistory.value, (order, index, i0) => {
          return {
            a: common_vendor.t(order.shopName),
            b: common_vendor.t(order.price),
            c: common_vendor.t(order.date),
            d: common_vendor.o(($event) => goToDetails(order.id), order.id),
            e: order.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/OrderPage/OrderPage.js.map
