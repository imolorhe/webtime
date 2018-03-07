import { DomainItemData } from './timetracker';

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

export const getTotalTime = (domainData: DomainItemData): number => {
  return domainData ? Object.values(domainData).reduce((acc, cur) => acc + cur.total_time, 0) : 0;
}

/**
 * Gets the current date in YYYY-MM-DD format
*/
export const getCurrentYYYYMMDD = () => getYYYYMMDD(new Date());

/**
 * Returns the specified date in YYYY-MM-DD format
 * @param date
 */
export const getYYYYMMDD = date => {
  const d = new Date(date);

  const yyyy = d.getFullYear().toString().padStart(4, '0');
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Add the specified number of days to the date
 * @param date original date
 * @param diff number of days to add
 */
export const addDays = (date, diff: number) => {
  const d = new Date(date);

  return d.setDate(d.getDate() + diff);
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