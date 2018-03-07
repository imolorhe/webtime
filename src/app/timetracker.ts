import * as parseUrl from 'parse-url';
import * as localforage from 'localforage';
import { getFocusedTab, getCurrentYYYYMMDD, domainStorageKey } from './utils';

export interface DomainItemData {
  /** 
   * Total time spent on domain (in seconds)
  */
  total_time: number;

  domain: string;
}

export interface DomainList {
  [date: string]: {
    [domain: string]: DomainItemData;
  }
}

export class TimeTracker {
  domainsStorageKey = domainStorageKey;
  currentDomain = '';
  lastTime = Date.now();
  isTracking = false;

  // Specifies if the time tracker is setup
  isReady = false;

  INITIAL_DOMAIN_DATA: DomainItemData = {
    total_time: 0,
    domain: ''
  };

  domains: DomainList = {};

  constructor() {
    localforage.getItem(this.domainsStorageKey).then((domains: DomainList) => {
      if (domains) {
        this.domains = domains;
      }
      this.isReady = true;
      this.startTracking();
    });
  }

  startTracking() {
    if (!this.isReady) {
      // If not ready, return
      return false;
    }
    getFocusedTab().then(tab => {
      const url = tab.url;
      if (url) {
        const parsedUrl = parseUrl(url);
        const domain = parsedUrl.resource;

        this.recordLastTracked();

        if (parsedUrl.protocol === 'chrome') {
          // Don't track chrome internal URLs
          return false;
        }

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
    if (!this.isReady) {
      // If not ready, return
      return false;
    }
    this.recordLastTracked();
    this.isTracking = false;
    console.log('Stopped tracking.');
    console.log('Last site stats', this.domains);
  }

  private recordLastTracked() {
    if (this.isTracking && this.currentDomain) {
      // If already tracking, store the time for the previous domain
      const date = getCurrentYYYYMMDD();
      if (!this.domains[date]) {
        // Initialise the date
        this.domains[date] = {};
      }
      if (!this.domains[date][this.currentDomain]) {
        // Initialise the domain
        this.domains[date][this.currentDomain] = { ...this.INITIAL_DOMAIN_DATA };
      }

      const curTime = Date.now();

      // Check that the time difference is up to 3 seconds before recording it
      if (Date.now() - this.lastTime >= 3000) {
        // Add the time difference to the total time (in seconds)
        this.domains[date][this.currentDomain].total_time += ((Date.now() - this.lastTime) / 1000);
        this.domains[date][this.currentDomain].domain = this.currentDomain;

        localforage.setItem(this.domainsStorageKey, this.domains);
      }

      // Reset the current domain after tracking it
      this.currentDomain = '';
    }
  }
}
