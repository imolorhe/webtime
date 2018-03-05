import { TimeTracker } from './timetracker';

const timeTracker = new TimeTracker();

// Called when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if tab is focused
  // Check the URL of the tab
  // console.log('tab updated...');
  // console.log(tabId, changeInfo, tab);
  if (tab.highlighted && tab.active && tab.url) {
    // console.log('... tab', tab.url);
    timeTracker.startTracking();
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  // Get the tab ID
  // Check the URL of the tab
  // console.log('tab focused...');
  // console.log(activeInfo);
  timeTracker.startTracking();
});

chrome.tabs.onHighlighted.addListener((highlightInfo) => {
  // console.log('tab highlighted...');
  // console.log(highlightInfo);
  timeTracker.startTracking();
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // console.log(tabId, removeInfo);
  timeTracker.startTracking();
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  // console.log('window focused...', windowId);
  // If the browser is out of focus, stop all timers
  if(windowId === chrome.windows.WINDOW_ID_NONE) {
    // console.log('Browser blurred.');
    timeTracker.stopTracking();
  } else {
    // Check the currently focused window and monitor it
    timeTracker.startTracking();
  }
});