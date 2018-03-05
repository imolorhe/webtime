<template>
  <div class="popup-wrapper">
    <div class="total-time">
      <div class="total-time__title">Total Time</div>
      <div class="total-time__time">
        <Timespent :total='totalTime' />
      </div>
    </div>
    <Doughnut :doughnutData='doughnutData' />
  </div>
</template>

<script>
import * as localforage from 'localforage';
import { domainStorageKey, getCurrentYYYYMMDD } from '../utils';

import Timespent from '../timespent/Timespent.vue';
import Doughnut from '../doughnut/Doughnut.vue';

export default {
  mounted() {
    this.getDomainData();
  },
  data() {
    return {
      totalTime: 0,
      doughnutData: []
    };
  },
  methods: {
    getDomainData() {
      localforage.getItem(domainStorageKey).then(domainsData => {
        const date = getCurrentYYYYMMDD();
        const domainsObj = domainsData[date];
        if (domainsObj) {
          this.totalTime = Object.values(domainsObj).reduce((acc, cur) => acc + cur.total_time, 0);

          this.doughnutData = Object.keys(domainsObj).map(domain => ({ key: domain, value: domainsObj[domain].total_time }));
        }
      });
    }
  },
  components: {
    Timespent,
    Doughnut
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: grayscale;
    min-width: 500px;
    min-height: 300px;
  }

  .popup-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .total-time__title {
    text-transform: uppercase;
  }
</style>
