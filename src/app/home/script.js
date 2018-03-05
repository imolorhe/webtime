export default {
  mounted() {
    const windowLoaded = () => {
      // Show the background when the image is loaded
      this.showBg = true;
      window.removeEventListener('load', windowLoaded);
    }
    window.addEventListener('load', windowLoaded);
  },
  data() {
    return {
      showBg: false,
      msg: 'Hello world!'
    }
  }
};
