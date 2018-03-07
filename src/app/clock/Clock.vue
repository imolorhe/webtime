<template>
  <div class="wall-clock">
    <div class="wall-clock__content">
      <span class="wall-clock__hour">{{ hr }}</span><span class="wall-clock__sep">:</span><span class="wall-clock__minute">{{ min }}</span>
    </div>
  </div>
</template>

<style>
  .wall-clock {
    text-align: center;
  }
  .wall-clock__content {
    display: inline-block;
    font-size: 100px;
    font-weight: 100;
    color: #ffffff;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, .2);
  }
</style>

<script>
  export default {
    mounted() {
      this.updateTime();
      this.clockInterval = setInterval(() => this.updateTime(), 1000);
    },
    data() {
      return {
        hr: '00',
        min: '00'
      }
    },
    methods: {
      updateTime() {
        const now = new Date();
        this.hr = now.getHours().toString().padStart(2, '0');
        this.min = now.getMinutes().toString().padStart(2, '0');
      }
    }
  };
</script>
