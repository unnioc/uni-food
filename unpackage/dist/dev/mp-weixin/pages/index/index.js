"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const banners = common_vendor.ref([
      {
        image: "/static/rectangle.jpg"
      },
      {
        image: "/static/rectangle.jpg"
      },
      {
        image: "/static/rectangle.jpg"
      }
    ]);
    const activeCat = common_vendor.ref(0);
    const categories = common_vendor.ref(
      [
        {
          name: "全部"
        },
        {
          name: "披萨"
        },
        {
          name: "汉堡"
        },
        {
          name: "饮品"
        },
        {
          name: "寿司"
        },
        {
          name: "甜点"
        }
      ]
    );
    const foodList = common_vendor.ref([{
      name: "经典芝士披萨",
      desc: "浓郁芝士，薄脆饼底",
      price: "48",
      image: "/static/square.jpg"
    }, {
      name: "双层牛堡",
      desc: "澳洲进口牛肉，鲜嫩多汁",
      price: "32",
      image: "/static/square.jpg"
    }, {
      name: "多肉葡萄",
      desc: "新鲜葡萄，清爽芝士",
      price: "22",
      image: "/static/square.jpg"
    }]);
    const addToCart = (food) => {
      common_vendor.index.showToast({
        title: `已加入购物车`,
        icon: "success"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banners.value, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        b: common_vendor.f(categories.value, (cat, index, i0) => {
          return {
            a: common_vendor.t(cat.name),
            b: index,
            c: activeCat.value === index ? 1 : "",
            d: common_vendor.o(($event) => activeCat.value = index, index)
          };
        }),
        c: common_vendor.f(foodList.value, (food, index, i0) => {
          return {
            a: food.image,
            b: common_vendor.t(food.name),
            c: common_vendor.t(food.desc),
            d: common_vendor.t(food.price),
            e: common_vendor.o(($event) => addToCart(), index),
            f: index
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
