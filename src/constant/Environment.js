import { Storage } from "expo-storage";
const ENV = {
  prod: {
    fmf: {
      apiUrl: "https://fmf-api.lead-360.co/api/v1/",
    },
    offerHome: {
      apiUrl: "https://api.lead-360.co/api/v1/",
    },
  },
  dev: {
    fmf: {
      apiUrl: "https://fmf-api.lead-360.co/api/v1/",
    },
    offerHome: {
      apiUrl: "https://api.lead-360.co/api/v1/",
    },
  },
};

const getEnvVars = async (key = false) => {
  const actEnv = await Storage.getItem({ key: "active-env" });
  const selectedCategory = await Storage.getItem({ key: "selected-category" });

  // Default to "fmf" if no category is selected
  const category = selectedCategory || "fmf";

  let envVar;

  if (actEnv === "development") {
    envVar = ENV.dev[category] || ENV.dev.fmf;
  } else if (__DEV__) {
    envVar = ENV.dev[category] || ENV.dev.fmf;
  } else {
    envVar = ENV.prod[category] || ENV.prod.fmf;
  }

  if (key) {
    return envVar[key];
  } else {
    return envVar;
  }
};

export default getEnvVars;
