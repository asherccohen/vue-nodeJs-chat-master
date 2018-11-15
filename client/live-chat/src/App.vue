<template>
  <div id="app">
  <img src="https://muzmatch.com/images/header-logo.png?0ef5057d29ccc0df642a984d5bdc58c53b7afddc" class="header-logo">

    <VideoPlayer/>
    <transition name="bounce" appear>
       <CommentArea/>
  </transition>
  
    <transition
    name="custom-classes-transition"
    enter-active-class="animated infinite bounce"
    leave-active-class="animated infinite bounce"
    appear
  >
    <p class="social">
      <a href="https://facebook.com/muzmatch" target="_blank">
      <img src="https://muzmatch.com/images/facebook.png?0ef5057d29ccc0df642a984d5bdc58c53b7afddc" width="24" height="24"></a>
      <a href="https://instagram.com/muzmatch" target="_blank">
      <img src="https://muzmatch.com/images/instagram.png?0ef5057d29ccc0df642a984d5bdc58c53b7afddc" width="24" height="24"></a>
      <a href="https://twitter.com/muzmatch" target="_blank">
      <img src="https://muzmatch.com/images/twitter.png?0ef5057d29ccc0df642a984d5bdc58c53b7afddc" width="24" height="20"></a>
    </p>
    </transition>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer'
import CommentArea from './components/CommentArea'


export default {
  name: 'App',
  components: {
    VideoPlayer,
    CommentArea,
  },
  data(){
      return {

        }
      }
}
</script>

<style>
body{
  overflow-x: hidden;
  background: #D3CCE3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
}

 /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  #app {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    "social"
    "liveChat"
    "videoPlayer";
  grid-gap: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header-logo{
  display:none;
}
.video-list{
  grid-template-columns: 100%;
  grid-auto-rows: 100px;
} 
.video-player{
  grid-template-columns: 100%;
} 
.social{
  grid-area: social;
  display: flex;
  justify-content: space-between;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  #app {
   display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    "social"
    "liveChat"
    "videoPlayer";
  grid-gap: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.comments-outside{
  display:none;
}
.header-logo{
  display:none;
}
.social{
  grid-area: social;
  display: flex;
  justify-content: space-between;
}

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  #app {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto);
  grid-template-areas:
    "social"
    "videoPlayer";
  grid-gap: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.comments-outside{
  display:none;
}
.header-logo{
  display:none;
}
.video-list{
  grid-template-columns: 1fr;
  grid-auto-rows: 100px;
} 
.social{
  grid-area: social;
  display: flex;
  justify-content: space-between;
}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  #app {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(auto);
  grid-template-areas:
    "header social"
    "videoPlayer liveChat";
    grid-gap: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.comments-outside{
  display:block;
}
.header-logo{
  display:block;
}
.social{
  grid-area: social;
  /* display: flex; */
  justify-content: space-between;
}

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  #app {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(auto);
  grid-template-areas:
    "header social"
    "videoPlayer liveChat";
    grid-gap: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.comments-outside{
  display:block;
}
.header-logo{
  display:block;
}
.social{
  grid-area: social;
  display: flex;
  justify-content: space-between;
  align-self: center;
}

} 

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>