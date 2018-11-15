import Vue from 'vue'
import App from './App.vue'
import UUID from 'vue-uuid';
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import 'animate.css/animate.min.css'


Vue.config.productionTip = false
Vue.use(UUID);
Vue.use(VueNativeSock, 'ws://localhost:1337', {
    store: store,
    format: 'json'
}, {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

new Vue({
    store,
    methods: {},
    mounted: function() {
        // `this` points to the vm instance
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        // if browser doesn't support WebSocket, just show
        // some notification and exit
        if (!window.WebSocket) {
            alert('Sorry, but your browser doesn\'t support WebSocket.');
            return;
        } else {
            //console.log("Websockets Ok")
        }
    },
    render: h => h(App),

}).$mount('#app')