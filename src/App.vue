<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <img v-if="!openEditor" :src="url" @click="handleOpenEditor" />
    <FilerobotImageEditor
      v-if="openEditor"
      :src="url"
      @onClose="handleClose"
      @onComplete="handleComplete"
      @onError="handleError"
      @onBeforeComplete="onBeforeComplete"
    />
  </div>
</template>

<script>
/* eslint-disable */
import FilerobotImageEditor from "./index";
export default {
  name: "App",
  components: {
    FilerobotImageEditor,
  },
  data() {
    return {
      url:
        "https://my-ykmail-bucket.s3.eu-west-3.amazonaws.com/nestorgrass-1107003_150.jpg",
      openEditor: false,
    };
  },
  mounted() {},
  methods: {
    handleOpenEditor() {
      this.openEditor = true;
    },
     handleCloseEditor() {
      this.openEditor = false;
    },
    handleClose(status) {
      console.error('Close'+status)
      this.handleCloseEditor();
    },
    onBeforeComplete(element){
      console.error(element.canvas.toDataURL())
    },
    handleComplete(element, file) {
      // console.log(url )
      this.url=element.canvas.toDataURL();
      
      this.handleCloseEditor();
    },
    handleError(error) {
      this.handleCloseEditor();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
