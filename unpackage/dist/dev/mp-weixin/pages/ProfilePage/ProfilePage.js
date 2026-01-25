"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "ProfilePage",
  setup(__props) {
    const menuItems = common_vendor.ref([{
      title: "我的订单",
      image: "/static/ic_orders.png",
      path: "/pages/OrderPage/OrderPage"
    }, {
      title: "收货地址",
      image: "/static/ic_address.png",
      path: "/pages/address/address"
    }, {
      title: "优惠券",
      image: "/static/ic_coupons.png",
      path: "/pages/coupons/coupons"
    }, {
      title: "设置",
      image: "/static/ic_settings.png",
      path: "/pages/settings/settings"
    }, {
      title: "帮助中心",
      image: "/static/ic_help.png",
      path: "/pages/help/help"
    }]);
    const navigateTo = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "	确定要登出账号吗?",
        confirmColor: "#ff5252",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "退出登录成功",
              icon: "success"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.f(menuItems.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => navigateTo(item.path), index)
          };
        }),
        c: common_assets._imports_1,
        d: common_vendor.o(handleLogout)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ProfilePage/ProfilePage.js.map
