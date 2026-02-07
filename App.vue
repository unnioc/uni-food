<script>
import store from '@/store/index.js'

export default {
  onLaunch: function () {
    console.log('App Launch')
    // 应用启动时初始化全局数据（包括用户信息、购物车等）
    store.init()
  },
  onShow: function () {
    console.log('App Show')
    // 每次切回前台时，如果有用户登录，也可以刷新一下数据（可选）
    if (store.state.isLogin) {
      store.refreshUserData()
    }
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */

/* 图标通用大小 */
.icon {
  width: 40rpx;
  height: 40rpx;
}

.icon-l {
  width: 60rpx;
  height: 60rpx;
}
</style>