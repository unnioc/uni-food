"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "PaymentPage",
  setup(__props) {
    const orderItems = common_vendor.ref([{
      name: "Organic Avocados",
      count: 2,
      price: 4.5
    }, {
      name: "Fresh Strawberries",
      count: 1,
      price: 3
    }]);
    const selectedPay = common_vendor.ref("wechatPay");
    const paymentMethods = common_vendor.ref([{
      id: "wechatPay",
      name: "微信支付",
      image: "/static/ic_wechat_pay.png"
    }, {
      id: "alipay",
      name: "支付宝",
      image: "/static/ic_ali_pay.png"
    }, {
      id: "unionPay",
      name: "云闪付",
      image: "/static/ic_union_pay.png"
    }, {
      id: "eCNYPay",
      name: "数字人民币",
      image: "/static/ic_e_cny_pay.png"
    }]);
    const handlePay = () => {
      common_vendor.index.showLoading({
        title: "支付中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        const success = Math.random() > 0.2;
        common_vendor.index.navigateTo({
          url: success ? "/packageOrder/PaymentSuccessfulPage/PaymentSuccessfulPage" : "/packageOrder/PaymentFailedPage/PaymentFailedPage"
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_assets._imports_1$2,
        c: common_vendor.f(orderItems.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.count),
            c: common_vendor.t((item.price * item.count).toFixed(2)),
            d: index
          };
        }),
        d: common_assets._imports_2,
        e: common_vendor.f(paymentMethods.value, (pay, index, i0) => {
          return common_vendor.e({
            a: pay.image,
            b: common_vendor.t(pay.name),
            c: selectedPay.value === pay.id
          }, selectedPay.value === pay.id ? {} : {}, {
            d: pay.id,
            e: selectedPay.value === pay.id ? 1 : "",
            f: common_vendor.o(($event) => selectedPay.value = pay.id, pay.id)
          });
        }),
        f: common_vendor.o(handlePay)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageOrder/PaymentPage/PaymentPage.js.map
