import * as parseUrl from 'parse-url';
import { getFocusedTab } from './utils';

interface DomainItemData {
  /** 
   * Total time spent on domain (in seconds)
  */
  total_time: number;
}

interface DomainList {
  [index: string]: DomainItemData;
}

export class TimeTracker {
  currentDomain = '';
  lastTime = Date.now();
  isTracking = false;

  INITIAL_DOMAIN_DATA: DomainItemData = {
    total_time: 0
  };

  domains: DomainList = {};

  constructor() {
    this.startTracking();
  }

  startTracking() {
    getFocusedTab().then(tab => {
      const url = tab.url;
      if (url) {
        const domain = parseUrl(url).resource;

        this.recordLastTracked();

        // Start tracking the time for the domain
        this.lastTime = Date.now();
        this.isTracking = true;
        this.currentDomain = domain;

        console.log('Started tracking..', domain);
      } else {
        // If there is no focused tab URL, then don't track anything
        this.stopTracking();
      }
    });
  }

  stopTracking() {
    this.recordLastTracked();
    this.isTracking = false;
    this.currentDomain = '';
    console.log('Stopped tracking.');
    console.log('Last site stats', this.domains);
  }

  private recordLastTracked() {
    if (this.isTracking && this.currentDomain) {
      // If already tracking, store the time for the previous domain
      if (!this.domains[this.currentDomain]) {
        // Initialise the domain
        this.domains[this.currentDomain] = { ...this.INITIAL_DOMAIN_DATA };
      }
      // Add the time difference to the total time (in seconds)
      this.domains[this.currentDomain].total_time += ((Date.now() - this.lastTime) / 1000);
    }
  }
}
