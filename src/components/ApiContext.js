import React, { createContext, useContext, useState, useEffect } from "react";
import { UnitsApi } from "../webservice";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const master_data = async () => {
    await UnitsApi.masterData()
      .then((response) => {
        setApiData(response.result);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    master_data();
  }, []);

  return <ApiContext.Provider value={apiData}>{children}</ApiContext.Provider>;
};

export const useApiData = () => {
  return useContext(ApiContext);
};
