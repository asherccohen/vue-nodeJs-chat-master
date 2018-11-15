import Vue from 'vue'
import Vuex from 'vuex'
import User1 from '@/assets/user.png'
import User2 from '@/assets/user2.png'
import User3 from '@/assets/user3.png'
import User4 from '@/assets/user4.png'
import User5 from '@/assets/user5.png'
import User6 from '@/assets/user6.png'
import User7 from '@/assets/user7.png'
import User8 from '@/assets/user8.png'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        current_user: {
            avatar: User1,
            author: ''
        },
        avatars: [{
                type: 'round',
                avatar: User2
            },
            {
                type: 'round',
                avatar: User3
            },
            {
                type: 'round',
                avatar: User4
            },
            {
                type: 'round',
                avatar: User5
            },
            {
                type: 'round',
                avatar: User6
            },
            {
                type: 'round',
                avatar: User7
            },
            {
                type: 'round',
                avatar: User8
            },
        ],
        //Comments that are under the post
        comments: [],
        json: {},
        reply: '',
        myName: false,
        msg: '',
        randomAvatar: '',
        likes: 0,
        history: 0,
        loader: false,
        errors: []
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
                //console.log(event)
        },
        SOCKET_ONCLOSE(state) {
            state.socket.isConnected = false
                //console.log(event)
        },
        SOCKET_ONERROR(state, event) {
            //console.error(state, event)
            state.loader = false
            state.errors.push({
                id: Vue.prototype.$uuid.v4(),
                author: "bot",
                avatar: User1,
                text: 'Sorry, but there\'s some problem with your ' +
                    'connection or the server is down.',
                time: new Date()
            });
            console.log('Sorry, but there\'s some problem with your ' +
                'connection or the server is down.' + state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, message) {
            state.loader = true
                // try to parse JSON message. Because we know that the server
                // always returns JSON this should work without any problem but
                // we should make sure that the massage is not chunked or
                // otherwise damaged.
                //Each message is JSON.parsed if there is a data(content) response.
            try {
                state.json = JSON.parse(JSON.stringify(message.data));
            } catch (e) {
                //console.log('Invalid JSON: ', message.data);
                return;
            }
            //}

            //function checkMessage() {
            if (Array.isArray(state.json)) {
                state.history = state.json.length - 1;
            }
            // first response from the server 
            if (message.type === 'name') {
                //set name of the user
                // from now user can start sending messages
            } else if (message.type === 'history') { // entire message history
                for (var i = 0; i < state.json.length; i++) {
                    state.comments.push({
                        id: state.json[i].id,
                        author: state.json[i].author,
                        avatar: state.avatars[Math.floor((Math.random() * 4))].avatar,
                        text: state.json[i].text,
                        time: state.json[i].time
                    });
                }
                // insert every single message to the chat window
                //}
            } else if (message.type === 'message') { // it's a single message
                if (state.json.author === state.current_user.author) {
                    //do not show my messages
                } else {
                    state.comments.push({
                        id: state.json.id,
                        author: state.json.author,
                        avatar: state.avatars[Math.floor((Math.random() * 4))].avatar,
                        text: state.json.text,
                        time: state.json.time
                    });
                }
                // let the user write another message
            } else {
                console.log('Invalid message:', message);
            }
            //}
        },
        // mutations for reconnect methods
        /*         SOCKET_RECONNECT(state, count) {
                    //console.info(state, count)
                }, */
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
        sendMessage(state) {
            if (state.reply != '') {
                state.comments.push({
                    id: Vue.prototype.$uuid.v4(),
                    author: state.current_user.author,
                    avatar: state.current_user.avatar,
                    text: state.reply,
                    time: new Date()
                });
                Vue.prototype.$socket.send(state.reply)
                state.reply = '';
            }

        },
        updateMessage(state, message) {
            state.reply = message
        },
        submittedName(state) {
            if (state.myName === false) {
                state.current_user.author = state.reply
                state.randomAvatar = state.avatars[Math.floor(Math.random() * state.avatars.length)];
                state.current_user.avatar = state.randomAvatar.avatar
            }
            state.myName = true
        },
        checkResponseTime(state) {
            setInterval(function() {
                if (Vue.prototype.$socket.readyState !== 1) {
                    state.loader = true
                        //console.log('Unable to communicate with the WebSocket server.');
                } else {
                    state.loader = false
                }
            }, 3000);
        },
        updateLikes(state, payload) {
            state.likes = payload.likes
        }
    },
    actions: {
        sendMessage(context) {
            context.commit('submittedName')
            context.commit('sendMessage')
            context.commit('checkResponseTime')
        },
        updateLikes(context, payload) {
            context.commit('updateLikes', payload)
        }
    }
})