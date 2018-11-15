<template>
 <div class="comment">
        <div v-if="comment.author === this.$store.state.current_user.author" class="bubble me">
            <div class="avatar-message avatar-me">
                <img :src="comment.avatar" alt="" width="50px" >
            </div>
            <div class="text">
                <a class="username" href="#">
                    @{{ comment.author}}
                </a> 
                <span>{{comment.text}}</span>
            </div>

        </div>
        <div v-else class="bubble you">
            <div class="avatar-message avatar-you">
                <img :src="comment.avatar" alt="" width="50px" class="avatar-you" :key="comment.id">
            </div>
            <div class="text">
                <a class="username" href="#">
                    @{{ comment.author}}
                </a> 
                <span>{{comment.text}}</span>
            </div>
        </div>
</div>
</template>

<script>

export default {
  name: 'SingleComment',
    data() {
        return {
        }
    },
    //What the component expects as parameters
    props: ['comment']
}
</script>

<style>
.comment{
    width: 100px;
}

.avatar-message{
    grid-area: avatar;
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: 3px;
    border-radius: 50%;
}
.avatar-message:hover {
    box-shadow: 0 3px 8px rgba(0,0,0,0.5);
}
.avatar-message img{
    border-radius: 100%;
    box-shadow: 0 5px 30px rgba(255, 255, 255, 0.1);
}
.text{
    grid-area: text;
    color: #000;
    clear: both;
    width: 100%;
    line-height: 18px;
    font-size: 15px;
    word-wrap: break-word;
}
.text a{
    grid-area: username;
}
.bubble{
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 6px rgb(143, 143, 143);
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    vertical-align: top;
    height: auto;
    width: 280px;
}
.bubble::before {
    background-color: #ffffff;
    content: "\00a0";
    display: block;
    height: 16px;
    position: absolute;
    top: 10px;
    transform: rotate( 29deg ) skew( -35deg );
    -moz-transform: rotate( 29deg ) skew( -35deg );
    -ms-transform: rotate( 29deg ) skew( -35deg );
    -o-transform: rotate( 29deg ) skew( -35deg );
    -webkit-transform: rotate( 29deg ) skew( -35deg );
    width: 20px;
}
.you {
    float: left; 
    left: 60px; 
    margin: 5px 45px 5px 20px;       
}
.avatar-you {
    float: left;   
    left: -75px;
    top: -2px; 
}
.you::before {
    box-shadow: -2px 2px 2px 0 rgba( 178, 178, 178, .4 );
    left: -9px;           
}
.me {
    float: right;   
    left: 275px; 
    margin: 5px 20px 5px 45px;
}
.avatar-me {
    float: right; 
    right: -120px;
    top: -2px;       
}
.me::before {
    box-shadow: 2px -2px 2px 0 rgba( 178, 178, 178, .4 );
    right: -9px;    
}
</style>