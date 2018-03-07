import * as localforage from 'localforage';
import { domainStorageKey, getCurrentYYYYMMDD, getYYYYMMDD, addDays, getTotalTime } from '../utils';

import Clock from '../clock/Clock.vue';
import Timespent from '../timespent/Timespent.vue';
import Histogram from '../histogram/Histogram.vue';

export default {
  mounted() {
    const windowLoaded = () => {
      // Show the background when the image is loaded
      this.showBg = true;
      window.removeEventListener('load', windowLoaded);
    }
    window.addEventListener('load', windowLoaded);

    // Delay showApp to force CSS enter transitions depending on it to work
    setTimeout(() => this.showApp = true, 0);

    // Load the top domains
    this.getTopDomains();
  },
  data() {
    return {
      showApp: false,
      showBg: false,
      showDashboard: false,
      allDomains: [],
      topDomains: [],
      totalTime: 0,
      histogramData: []
    }
  },
  methods: {
    getTopDomains() {
      return localforage.getItem(domainStorageKey).then(domainData => {
        const date = getCurrentYYYYMMDD();
        const domainsObj = domainData[date];

        if (domainsObj) {
          const domains = Object.keys(domainsObj).map(domain => ({...domainsObj[domain], domain}));

          // Sort the domains in descending order based on their total time
          domains.sort((a, b) => b.total_time - a.total_time);

          // Get the first 6 domains
          this.allDomains = [ ...domains ];
          this.topDomains = domains.filter((v, i) => i < 6);

          this.totalTime = getTotalTime(domainsObj);
        }

        const histogramData = [];
        // Get total time for yesterday down to 12 days ago
        for(let i = 12; i > 0; i--) {
          const date = getYYYYMMDD(addDays(new Date(), -i));
          histogramData.push({
            date,
            value: getTotalTime(domainData[date])
          });
        }

        this.histogramData = histogramData;
      });
    }
  },
  components: {
    Clock,
    Timespent,
    Histogram
  }
};
