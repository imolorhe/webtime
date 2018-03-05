export const domainStorageKey = 'tt::domains';

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

/**
 * Gets the current date in YYYY-MM-DD format
*/
export const getCurrentYYYYMMDD = () => {
  const curDate = new Date();

  const yyyy = curDate.getFullYear().toString().padStart(4, '0');
  const mm = (curDate.getMonth() + 1).toString().padStart(2, '0');
  const dd = curDate.getDate().toString().padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};
