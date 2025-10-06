import { Storage } from "expo-storage";
const ENV = {
  prod: {
    apiUrl: "https://fmf-api.onrender.com/api/",
  },
  dev: {
    apiUrl: "https://fmf-api.onrender.com/api/",
  },
};

const getEnvVars = async (key = false) => {
  const actEnv = await Storage.getItem({ key: "active-env" });

  let envVar;

  if (actEnv === "development") {
    envVar = ENV.dev;
  } else if (__DEV__) {
    envVar = ENV.dev;
  } else {
    envVar = ENV.prod;
  }

  if (key) {
    return envVar[key];
  } else {
    return envVar;
  }
};

export default getEnvVars;
