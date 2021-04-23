<template>
  <div />
</template>
<script>
import "./assets/lib/filerobot-image-editor.min.js";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // config parameters
      const options = this.config;
      options.finishButtonLabel = this.config.finishButtonLabel || "save";

      // Registering this.callbacks
      this.callbacks = {};
      console.log("open");
      const vm = this;
      // @error
      this.callbacks.onError = (error) => {
        vm.$emit("error", error);
      };
      // @close
      this.callbacks.onClose = (status) => {
        vm.$emit("close", status);
      };
      // @beforeComplete
      this.callbacks.onBeforeComplete = function (element) {
        vm.$emit("beforeComplete", element);
        console.error(element.canvas.toDataURL());
        return false;
      };
      // @complete
      this.callbacks.onComplete = (url, file) => {
        this.$emit("complete", url, file);
      };

      //onComplete
      this.imageEditor = new window.FilerobotImageEditor(
        options,
        this.callbacks
      );
      this.imageEditor.open(this.src);
      // console.log("open");
    },
  },
  destroy() {
    if (this.imageEditor) {
      this.imageEditor.unmounted();
    }
  },
};
</script>
