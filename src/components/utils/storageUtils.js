// storageUtils.js
export const saveToLocalStorage = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
        console.log(`[LOCALSTORAGE] ---> Saved key ${key} with data ${JSON.stringify(data)}`);

    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadFromLocalStorage = (key) => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return null;
        }
        console.log(`[LOCALSTORAGE] ---> Loaded key ${key} with data ${JSON.stringify(serializedData)}`)
        return JSON.parse(serializedData);
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};

export const clearLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        console.log(`Cleared localStorage key: ${key}`);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};
window.clearLocalStorage = clearLocalStorage;