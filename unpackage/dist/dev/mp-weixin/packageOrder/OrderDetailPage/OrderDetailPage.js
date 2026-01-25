"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "OrderDetailPage",
  setup(__props) {
    const orderInfo = common_vendor.ref({
      orderId: "ORD-20231024-882",
      shopName: "The Garden Kitchen",
      time: "2026-01-21  11:12:13",
      address: "广东省深圳市龙岗区龙城街道龙翔大道2188号深圳信息职业技术大学",
      subtotal: 18.5,
      deliveryFee: 2,
      total: 20.5,
      items: [
        {
          name: "Classic Garden Salad",
          count: 1,
          price: 12.5
        },
        {
          name: "Fresh Orange Juice",
          count: 1,
          price: 6
        }
      ]
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.f(orderInfo.value.items, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.count),
            c: common_vendor.t(item.price.toFixed(2)),
            d: index
          };
        }),
        c: common_vendor.t(orderInfo.value.subtotal.toFixed(2)),
        d: common_vendor.t(orderInfo.value.deliveryFee.toFixed(2)),
        e: common_vendor.t(orderInfo.value.total.toFixed(2)),
        f: common_assets._imports_1$1,
        g: common_vendor.t(orderInfo.value.orderId),
        h: common_vendor.t(orderInfo.value.time),
        i: common_vendor.t(orderInfo.value.address)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageOrder/OrderDetailPage/OrderDetailPage.js.map
