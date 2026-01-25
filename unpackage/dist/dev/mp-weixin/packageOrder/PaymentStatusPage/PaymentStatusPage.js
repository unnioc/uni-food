"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PaymentStatusPage",
  setup(__props) {
    const goHome = () => common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
    const viewOrder = () => common_vendor.index.navigateTo({
      url: "/pages/order-details/order-details"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goHome),
        b: common_vendor.o(viewOrder)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageOrder/PaymentStatusPage/PaymentStatusPage.js.map
