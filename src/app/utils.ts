export const domainStorageKey = 'tt::domains';

export const colors = [
  '#5628B4',
  '#D80E70',
  '#E7455F',
  '#F7B236',
  '#EF3E36',
  '#550527',
  '#FFAE03',
  '#E67F0D',
  '#FE4E00',
  '#586BA4',
  '#324376',
  '#F5DD90',
  '#93B5C6',
  '#DDEDAA',
  '#F0CF65',
  '#03CEA4',
  '#972D07'
];

/**
 * Gets the currently focused tab
*/
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

/**
 * Gets an array of size `num` of colors
 * @param num The number of colors to generate
 */
export const getColors = num => {
  let colorList = [];
  for (let i = 0; i < num; i++) {
    colorList.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return colorList;
};