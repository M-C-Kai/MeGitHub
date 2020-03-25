// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false


// 公共url

//配置axios
//原型链
Vue.prototype.$axios = Axios;
//使用全局自定义css
import '../static/css/overall.css'
//使用全局组件
import Server from '@/components/Common/Server'
Vue.component(Server.name,Server);
import Coment from '@/components/Common/Coment'
Vue.component(Coment.name,Coment);

//使用mint-ui 引入组件及css样式
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';

//引入视频播放控件
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
