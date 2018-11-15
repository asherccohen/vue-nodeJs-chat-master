<template>
<div class="comments-outside">
    <div class="comments-header">
        <div class="comments-stats">
            <span><i class="fa fa-thumbs-up fa-3x"></i>{{this.$store.state.likes}}</span>
            <span><i class="fa fa-comment fa-3x"></i> {{this.$store.state.comments.length}}</span>
        </div>
        <div class="project-owner">
            <div class="avatar">
                <img :src="this.$store.state.current_user.avatar" alt="" width="64px">
            </div>
            <div v-if= "this.$store.state.myName === false" class="username">
                <a href="#">{{creator.author}}</a>
            </div>
            <div v-else class="username">
                <a href="#">@{{this.$store.state.current_user.author}}</a>
            </div>
        </div>
    </div>
    <comments
        :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
        :current_user= this.$store.state.current_user
        :loader= this.$store.state.loader
        @submit-comment="submitComment"
    ></comments>

                <div class="reply">
                <div class="post--photo">
                    <img src="@/assets/photo.png" alt="" width="50px">
                </div>

                <input v-if= "this.$store.state.myName === false"
                    type="text" 
                    v-model.trim="reply" 
                    class="reply--text" 
                    placeholder="Your name..."
                    maxlength="250"
                    required
                    @keyup.enter="submitComment"
                />
                <input v-else
                    type="text" 
                    v-model.trim="reply" 
                    class="reply--text" 
                    placeholder="Leave a comment..."
                    maxlength="250"
                    required
                    @keyup.enter="submitComment"
                />
                <button 
                    class="reply--button" 
                    @click.prevent="submitComment">
                    SEND
                </button>
            </div>

</div>
</template>

<script>
import Comments from './Comments'

export default {
  name: 'CommentArea',
    components: {
    Comments
  },
    data() {
        return {
            photo: '@/assets/photo.png',
            //Info about the owner of the post
            creator: {
                avatar: '',
                author: ''
            },
    }
    }, methods: {
                //Tell the parent component(main app) that we have a new comment
        submitComment: function() {
            this.$store.dispatch('sendMessage')
        },
},
computed: {
  reply: {
    get () {
      return this.$store.state.reply
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
}
</script>

<style>
.comments-outside{
    max-width: 100%;
    width: 500px;
    grid-area: liveChat;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: 100px 550px 70px;
    grid-template-areas:
    "commentHeader"
    "comments"
    "reply";
}
.comments-outside a{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: grey;
    font-size: 24px;
    text-decoration: none;
}
.comments-header{
    grid-area: commentHeader;
    display:grid;
    grid-template-columns: 2fr 4fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas:
    "icons . owner";
    height: auto;
    background: #FB406C;
    color: #fff;
    border-radius: 32px 32px 0px 0px;
    font-size: 14px;
    padding: 0 8px;
}
.reply{
    grid-area: reply;
    height: 70px;
    background: #FB406C;
    border-radius: 0px 0px 32px 32px;
    color: #fff;
    padding: 0 8px;
    font-size: 24px;
}
.comments-stats{
    grid-area: icons;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    width: 120px;
    margin: -10px;
}

.project-owner{
    grid-area: owner;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.avatar{
    position: absolute;
    margin-left: -125px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 0px 3px 8px rgba(0,0,0,0.5);
}
.avatar:hover {
    box-shadow: 0px 3px 8px rgba(0,0,0,0.5);
}
.post--photo {
    position: absolute;
    width: 50px;
    height: 50px;
    margin-left: 2px;
    margin-top: 10px;
    border-radius: 50%;
}
.post--photo:hover {
    box-shadow: 0 3px 8px rgba(0,0,0,0.5);
}
.username a{
font-size: 25px;
letter-spacing: -1px;
word-spacing: 0px;
color: #282828;
font-weight: normal;
font-style: italic;
font-variant: normal;
text-transform: none;
}

.reply--button{
    float: right;
    margin-top: 14px;
    margin-right: 8px;
    height: 2.2em;
    border:none;
    border-radius: 22px;
    padding-left: 13px;
    padding-right: 17px;
    padding-top: 3px;
    color:#3C3C3C;
    box-shadow:0 3px 8px rgba(0,0,0,.1);
    background-image: linear-gradient(#FAE654, #F5D20B);
    text-align:center;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.reply--button:hover {
    background-image: linear-gradient(#FBED7F, #F9E33F);
    box-shadow: 0 3px 8px rgba(0,0,0,0.5);
}
.avatar img{
    border-radius: 100%;
    box-shadow: 0 5px 30px rgba(255, 255, 255, 0.1);
}
.reply--text{
    position: absolute;
    margin-left: 60px;
    margin-top: 12px;
    color: #3C3C3C;
    height: 1.5em;
    width: 19em;
    font-size: 15px;
    border-radius: 25px;
    font-family: 'Raleway', sans-serif;
    padding: 8px;
    word-wrap: break-word;
    display: flex;
    overflow: hidden;
}
</style>