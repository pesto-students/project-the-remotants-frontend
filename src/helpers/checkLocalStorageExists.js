import store from 'store';

const checkIfLocalStorageKeyExists = (key) => {
  return !!store.get(key);
};

export default checkIfLocalStorageKeyExists;

