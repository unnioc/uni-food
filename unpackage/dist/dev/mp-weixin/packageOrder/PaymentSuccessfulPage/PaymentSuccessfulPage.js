"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PaymentSuccessfulPage",
  setup(__props) {
    const goHome = () => common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
    const viewOrder = () => common_vendor.index.navigateTo({
      url: "/packageOrder/OrderDetailPage/OrderDetailPage"
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageOrder/PaymentSuccessfulPage/PaymentSuccessfulPage.js.map
