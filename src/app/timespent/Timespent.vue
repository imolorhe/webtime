<template>
  <div class="timespent">
    <template v-if="hours">
      <div class="timespent__count">{{ hours }}</div>
      <div class="timespent__unit">h</div>
    </template>
    <template v-if="minutes">
      <div class="timespent__count">{{ minutes }}</div>
      <div class="timespent__unit">m</div>
    </template>
    <template v-if="seconds">
      <div class="timespent__count">{{ seconds }}</div>
      <div class="timespent__unit">s</div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['total'],
  computed: {
    hours() {
      return Math.floor(this.total / (60 * 60), 10);
    },
    minutes() {
      return Math.floor(this.total / 60) % 60;
    },
    seconds() {
      return parseInt(this.total, 10) % 60;
    }
  }
}
</script>

<style>
.timespent__count {
  display: inline-block;
  font-size: 32px;
  font-weight: 300;
}
.timespent__unit {
  display: inline-block;
  font-size: 16px;
  text-transform: uppercase;
}
</style>
