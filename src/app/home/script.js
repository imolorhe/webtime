import * as localforage from 'localforage';
import { domainStorageKey, getCurrentYYYYMMDD } from '../utils';

import Clock from '../clock/Clock.vue';
import Timespent from '../timespent/Timespent.vue';

export default {
  mounted() {
    const windowLoaded = () => {
      // Show the background when the image is loaded
      this.showBg = true;
      window.removeEventListener('load', windowLoaded);
    }
    window.addEventListener('load', windowLoaded);

    // Load the top domains
    this.getTopDomains();
  },
  data() {
    return {
      showBg: false,
      topDomains: []
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

          // Get the first 5 domains
          this.topDomains = domains.filter((v, i) => i < 5);
        }
      });
    }
  },
  components: {
    Clock,
    Timespent
  }
};
