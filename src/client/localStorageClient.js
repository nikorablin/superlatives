const setValue = (key, value) => {
  try {
    if (!value) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const getValue = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

const localStorageClient = { getValue, setValue };

export default localStorageClient;
