export const getFocusedTab = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.windows.getAll((windows) => {
        const focusedWindows = windows.filter(window => window.focused);

        if (focusedWindows.length) {
          chrome.tabs.query({
            highlighted: true,
            active: true,
            windowId: focusedWindows[0].id
          }, (tabs) => {
            // Ideally this should only return one tab at most
            resolve(tabs[0]);
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
