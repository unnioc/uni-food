"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PaymentFailedPage",
  setup(__props) {
    const tryAgain = () => common_vendor.index.redirectTo({
      url: "/packageOrder/PaymentPage/PaymentPage"
    });
    const backToCart = () => common_vendor.index.switchTab({
      url: "/pages/CartPage/CartPage"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tryAgain),
        b: common_vendor.o(backToCart)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageOrder/PaymentFailedPage/PaymentFailedPage.js.map
