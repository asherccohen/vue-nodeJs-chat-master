<template>
  <div class="video-player">
  <div class="video-container">
      <iframe :src="this.activeVideo.youtubeURL" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<h3>{{this.activeVideo.title}}</h3>
<div class="row">
    <p>{{this.activeVideo.views}} views</p> 
    <p>{{this.activeVideo.likes}} <button @click="addLike">Like</button></p>
</div>
</div>
    <div class="video-list">
    <div @click="chooseVideo(video)" :key="video.id" v-for="video in videos" class="thumbnail">
        <div class="thumbnail-img">
          <img :src="video.thumbnail" />
        </div>
        <div class="thumbnail-info">
          <h3>{{video.title}}</h3>
          <p>{{video.creator}}</p>
          <p class="thumbnail-views">{{video.views}} Views</p>
        </div>
    </div>
</div>
  </div>
</template>

<script>
let videos = [
  {
    id: 1,
    title: "Sky New Live!",
    thumbnail:
      "https://img.youtube.com/vi/XOacA3RYrXk/maxresdefault.jpg",
    youtubeURL: "https://www.youtube.com/embed/XOacA3RYrXk",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 2,
    title: "Dope Tech: Camera Trains!",
    thumbnail:
      "https://img.youtube.com/vi/uTpDWzfRMg8/hqdefault.jpg",
    youtubeURL: "https://www.youtube.com/embed/uTpDWzfRMg8",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 3,
    title: "Let's Talk About Tesla Roadster 2020!",
    thumbnail:
      "https://img.youtube.com/vi/ctx4YBEdOxo/hqdefault.jpg",
    youtubeURL: "https://www.youtube.com/embed/ctx4YBEdOxo",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 4,
    title: "Talking Tech with Neil deGrasse Tyson!",
    thumbnail:
      "https://img.youtube.com/vi/pqQrL1K0Z5g/hqdefault.jpg",
    youtubeURL: "https://www.youtube.com/embed/pqQrL1K0Z5g",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 5,
    title: "The Apple Ecosystem: Explained!",
    thumbnail:
      "https://img.youtube.com/vi/KB4_WIPE7vo/hqdefault.jpg",
    youtubeURL: "https://www.youtube.com/embed/KB4_WIPE7vo",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  }
];
export default {
  name: 'VideoPlayer',
  data () {
    return {
        videos,
        activeVideo: videos[0]
    }
  },
  methods:{
  chooseVideo(video){
      //SET VIDEO AS ACTIVE VIDEO
      this.activeVideo = video;
      //INCREASE THE VIDEOS VIEWS BY 1
      video.views += 1;
      this.$store.dispatch('updateLikes', {likes: this.activeVideo.likes})
  },
  addLike(){
  this.activeVideo.likes += 1;
  this.$store.dispatch('updateLikes', {likes: this.activeVideo.likes})
}
}
}
</script>

<style scoped>
.video-player{
  grid-area: videoPlayer;
  display:grid;
  grid-template-columns: 100%;
  grid-template-rows: 3fr auto;
  grid-template-areas:
    "videoPlayer"
    "videoSelection";
  grid-gap: 70px;
}

@media only screen and (min-width: 600px) {
.video-list{
  display:grid;
  grid-template-columns: 1fr;
} 
}

.video-container {
  height: 640px;
  width: 100%;
}

.video-container iframe{
  height: 100%;
  width: 100%;
  margin-right:40px;
}

.row{
    display:flex;
    justify-content:space-between;
}
  .thumbnail{
    display:flex;
    width:auto;
  }
  .thumbnail img{
    width:168px;
}

.thumbnail-info{
    margin-left:20px;
}

.thumbnail h3{
    font-size:16px;
}

h3,
p{
    margin:0;
    padding:0;
}

.thumbnail-views{
    font-size:14px;
}

button{
    background:#D0021B;
    color:white;
    border:none;
    padding:10px 20px;
}

 /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .video-list{
  grid-area: videoSelection;
  display:grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
} 
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {} 
</style>