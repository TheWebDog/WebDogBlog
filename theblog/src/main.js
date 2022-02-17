import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'


// 代码高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/googlecode.css'
Vue.directive('highlight', function (el) {
  var blocks = el.querySelectorAll('code');
  blocks.forEach((item) => {
    hljs.highlightBlock(item)
  })
})



Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false

router.afterEach(() => {
  window.scrollTo(0,0);
  });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
