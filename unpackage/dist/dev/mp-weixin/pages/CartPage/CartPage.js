"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "CartPage",
  setup(__props) {
    const cartList = common_vendor.ref([{
      id: 1,
      name: "Organic Avocados",
      price: 4.5,
      count: 2,
      checked: true
    }, {
      id: 2,
      name: "Fresh Strawberries",
      price: 3,
      count: 1,
      checked: true
    }, {
      id: 3,
      name: "Whole Grain Bread",
      price: 2.5,
      count: 1,
      checked: true
    }, {
      id: 4,
      name: "Greek Yogurt",
      price: 1.2,
      count: 1,
      checked: false
    }, {
      id: 5,
      name: "Greek Salad",
      price: 1.2,
      count: 5,
      checked: false
    }, {
      id: 2,
      name: "Fresh Strawberries",
      price: 3,
      count: 1,
      checked: true
    }, {
      id: 3,
      name: "Whole Grain Bread",
      price: 2.5,
      count: 1,
      checked: true
    }, {
      id: 4,
      name: "Greek Yogurt",
      price: 1.2,
      count: 1,
      checked: false
    }, {
      id: 2,
      name: "Fresh Strawberries",
      price: 3,
      count: 1,
      checked: true
    }, {
      id: 3,
      name: "Whole Grain Bread",
      price: 2.5,
      count: 1,
      checked: true
    }, {
      id: 4,
      name: "Greek Yogurt",
      price: 1.2,
      count: 1,
      checked: false
    }]);
    const totalPrice = common_vendor.computed(() => {
      return cartList.value.reduce((total, item) => {
        return item.checked ? total + item.price * item.count : total;
      }, 0);
    });
    const changeCount = (index, delta) => {
      const item = cartList.value[index];
      if (item.count + delta > 0) {
        item.count += delta;
      } else {
        common_vendor.index.showModal({
          title: "Tip",
          content: "Remove this item?",
          success: (res) => {
            if (res.confirm)
              cartList.value.splice(index, 1);
          }
        });
      }
    };
    const toggleCheck = (index) => {
      cartList.value[index].checked = !cartList.value[index].checked;
    };
    const selectAllCart = () => {
      const isAllChecked = cartList.value.every((item) => item.checked);
      cartList.value.forEach((item) => {
        item.checked = !isAllChecked;
      });
    };
    const clearCart = () => {
      common_vendor.index.showModal({
        title: "清空购物车",
        content: "您确定要清空购物车吗?",
        success: (res) => {
          if (res.confirm)
            cartList.value = [];
        }
      });
    };
    const goCheckout = () => {
      if (totalPrice.value === 0) {
        common_vendor.index.showToast({
          title: "请先选择菜品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/packageOrder/PaymentPage/PaymentPage"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(selectAllCart),
        b: common_vendor.o(clearCart),
        c: common_vendor.f(cartList.value, (item, index, i0) => {
          return {
            a: item.checked,
            b: common_vendor.o(($event) => toggleCheck(index), item.id),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.price.toFixed(2)),
            e: common_vendor.o(($event) => changeCount(index, -1), item.id),
            f: common_vendor.t(item.count),
            g: common_vendor.o(($event) => changeCount(index, 1), item.id),
            h: item.id
          };
        }),
        d: cartList.value.length === 0
      }, cartList.value.length === 0 ? {
        e: common_assets._imports_0
      } : {}, {
        f: common_vendor.t(totalPrice.value.toFixed(2)),
        g: common_vendor.o(goCheckout)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/CartPage/CartPage.js.map
