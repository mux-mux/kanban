const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Set local storage item', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('data is added into local storage', () => {
    const mockKey = ['Column 1', 'Column 2'];
    const mockJson = ['First item', 'Second item'];
    setLocalStorage(mockKey, mockJson);
    expect(localStorage.getItem(mockKey)).toEqual(JSON.stringify(mockJson));
  });

  test('data in local storage which is overwritten', () => {
    const mockKey = ['Column 1', 'Column 2'];
    const mockOldData = ['First item', 'Second item'];
    const mockNewData = ['First item', 'Second item', 'Third item'];

    window.localStorage.setItem(mockKey, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockKey)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockKey, mockNewData);
    window.localStorage.setItem(mockKey, JSON.stringify(mockNewData));
  });

  test('only one key is in localStorage', () => {
    const mockKey = ['Column 1', 'Column 2'];
    const mockOldData = ['First item', 'Second item'];
    const mockNewData = ['First item', 'Second item', 'Third item'];

    window.localStorage.setItem(mockKey, JSON.stringify(mockOldData));
    setLocalStorage(mockKey, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});
