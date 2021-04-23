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
    tools: {
      type: Array,
      default: () => [
        "adjust",
        "effects",
        "filters",
        "rotate",
        "crop",
        "resize",
        "watermark",
        "shapes",
        "image",
        "text",
      ],
    },
    isLowQualityPreview: {
      type: Boolean,
      default: true,
    },
    language: {
      default: "en",
      type: String,
    },
    translations: {
      type: Object,
      default: () => ({}),
    },
    reduceBeforeEdit: {
      type: Object,
      default: () => ({
        mode: "manual",
        widthLimit: 2000,
        heightLimit: 2000,
      }),
    },
    watermark: {
      type: Object,
      default: null,
    },
    colorScheme: {
      type: String,
      default: "dark",
    },
    theme: {
      type: Object,
      default: null,
    },
    cropPresets: {
      type: Object,
      default: null,
    },
    resizePresets: {
      type: Object,
      default: null,
    },
    beginCropArea: {
      type: Number,
      default: 1,
    },
    minCropAreaWidth: {
      type: Number,
      default: undefined,
    },
    minCropAreaHeight: {
      type: Number,
      default: undefined,
    },
    showInModal: {
      type: Boolean,
      default: true,
    },
    noCapitalStrs: {
      type: Boolean,
      default: false,
    },
    replaceCloseWithBackButton: {
      type: Boolean,
      default: false,
    },
    finishButtonLabel: {
      type: String,
      default: "save",
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const callbacks = {};
      console.log("open");
      const vm = this;
      callbacks.onError = (error) => {
        vm.$emit("onError", error);
      }; // onError
      callbacks.onClose = (status) => {
        vm.$emit("onClose", status);
      };
      this.config = {};
      this.config.tools = this.tools;
      this.config.isLowQualityPreview = this.isLowQualityPreview;
      this.config.language = this.language;
      this.config.beginCropArea = this.beginCropArea;
      this.config.replaceCloseWithBackButton = this.replaceCloseWithBackButton;
      this.config.finishButtonLabel = this.finishButtonLabel;
      this.config.showInModal = this.showInModal;
      this.config.watermark = this.watermark;
      this.config.resizePresets = this.resizePresets;

      this.config.minCropAreaHeight = this.minCropAreaHeight;
      this.config.translations = this.translations;
      this.config.theme = this.theme;
      this.config.colorScheme = this.colorScheme;
      this.config.noCapitalStrs = this.noCapitalStrs;
      this.config.reduceBeforeEdit = this.reduceBeforeEdit;
      this.config.minCropAreaWidth = this.minCropAreaWidth;
      this.config.cropPresets = this.cropPresets;

      callbacks.onBeforeComplete = function (element) {
        vm.$emit("onBeforeComplete", element);
        console.error(element.canvas.toDataURL());
        return false;
      };
      callbacks.onComplete = (url, file) => {
        this.$emit("onComplete", url, file);
      }; //onComplete
      this.imageEditor = new window.FilerobotImageEditor(
        this.config,
        callbacks
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
