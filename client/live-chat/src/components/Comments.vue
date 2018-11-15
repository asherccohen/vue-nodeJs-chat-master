<template>
        <div class="comments">
            <div :class="comments_wrapper_classes" v-if="loader === false">
            <img src="@/assets/Square.gif" class="loader">
                <single-comment
                    v-for="comment in this.$store.state.errors"
                    :comment="comment"
                    :key="comment.id"
                ></single-comment>
            </div>
            <div :class="comments_wrapper_classes" v-else>
<transition-group name="fade" appear>      
                <single-comment
                    v-for="comment in this.$store.state.comments"
                    :comment="comment"
                    :key="comment.id"
                ></single-comment>
</transition-group>
            </div>
        </div>
</template>

<script>
import SingleComment from './SingleComment'

export default {
  name: 'Comments',
    components: {
    SingleComment
  },
    data() {
        return {
        }
    },
    methods: {
    },  
    //What the component expects as parameters
    props: ['comments_wrapper_classes', 'loader']
}
</script>

<style>
.comments-wrapper{
    /* */
}
.custom-scrollbar{/* CHILD */
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    box-sizing: content-box;
    width:100%;
    height: 100%; 
}

 /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
.comments{/* PARENT */
    grid-area: comments;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFE9EF;
    overflow: hidden;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
.loader{
width: 200px;
position: relative;
top: 155px;
left: 145px;
}
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
.comments{/* PARENT */
    grid-area: comments;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFE9EF;
    overflow: hidden;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
.loader{
width: 200px;
position: relative;
top: 155px;
left: 145px;
}

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .comments{/* PARENT */
    grid-area: comments;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFE9EF;
    overflow: hidden;
}
.loader{
width: 200px;
position: relative;
top: 155px;
left: 145px;
}
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .comments{/* PARENT */
    grid-area: comments;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border-left: 10px solid #FB406C;
    border-right: 10px solid #FB406C;
    background-color: #FFE9EF;
    overflow: hidden;
}

.loader{
position: relative;
width: 200px;
top: 190px;
left: 140px;
}
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .comments{/* PARENT */
    grid-area: comments;
    max-height: 600px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border-left: 10px solid #FB406C;
    border-right: 10px solid #FB406C;
    background-color: #FFE9EF;
    overflow: hidden;
}
.loader{
position: relative;
width: 200px;
top: 190px;
left: 140px;
}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
} 
</style>