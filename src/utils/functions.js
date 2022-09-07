export function getLocalStorage(name) {
  try {
    const value = localStorage.getItem(name);
    if (value) {
      return value;
    }
  } catch (error) {
    return "";
  }
  return "";
}

export function setLocalStorage(name, value) {
  try {
    if (!value) {
      localStorage.removeItem(name);
      return true;
    }
    localStorage.setItem(name, value);
    return true;
  } catch (error) {
    return false;
  }
}

export const getUserStorageName = () => {
  return getLocalStorage("user");
};


export const getOnlineStorageName = () => {
  return getLocalStorage("online");
};

export const setUserLoggedInfo = (value) => {
  if (!value) {
    setLocalStorage(getOnlineStorageName(), undefined);
  } else {
    const user = !value?.user
      ? null
      : {
          username: value.user.username,
          name: value.user.name,
          lastname: value.user.lastname,
          email: value.user.email,
          fullname:
            value.user.fullname ||
            value.user.name + " " + value.user.lastname,
        };

    setLocalStorage(getUserStorageName(), JSON.stringify(user));
    setLocalStorage(getOnlineStorageName(), JSON.stringify(value));
  }
};

export const getUserLoggedInfo = () => {
  try {
    const online = getLocalStorage(getOnlineStorageName());
    if (online) {
      const info = JSON.parse(online);
      if (info?.user) {
        return info;
      }
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};

export const getUserOfflineInfo = () => {
  try {
    return JSON.parse(getLocalStorage(getUserStorageName()));
  } catch (error) {
    return undefined;
  }
};

export const setRedirectUrl = (value) => {
  setLocalStorage("transportes.redirection", value === "" ? undefined : value);
};

export const getRedirectUrl = () => {
  return getLocalStorage("transportes.redirection");
};

export const validate = (objects, fields) => {
  let isValid = true;
  if (Array.isArray(fields)) {
    fields.forEach(field => {
      objects.forEach(obj => {
        if (Object.keys(obj).indexOf(field) < 0) {
          isValid = false;
          return
        };
      })
    })
  }
  return isValid;
}