// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // 位置 node_modules
import App from './App' // 導入組件時，後綴可以忽略不寫 app.vu

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App }, // 組件必須，先註冊後使用
    template: '<App/>'
})