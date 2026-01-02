import {
  getDashboardSummary,
  getTopCountries,
} from "../../webservice/DashboardApi";
import {
  setDashboardSummary,
  setDashboardLoading,
  setDashboardError,
  setTopCountries,
  setTopCountriesLoading,
  setTopCountriesError,
} from "../reducers/dashboardReducer";

// Fetch dashboard summary
export const fetchDashboardSummary =
  (eventId, params = {}) =>
  async (dispatch) => {
    dispatch(setDashboardLoading());
    try {
      const response = await getDashboardSummary(eventId, params);
      if (response) {
        dispatch(setDashboardSummary(response));
      }
    } catch (error) {
      dispatch(setDashboardError("Error fetching dashboard summary"));
      console.log("Error fetching dashboard summary: ", error);
    } finally {
      dispatch(setDashboardLoading(false));
    }
  };

// Fetch top countries
export const fetchTopCountries =
  (eventId, limit = 20) =>
  async (dispatch) => {
    dispatch(setTopCountriesLoading());
    try {
      const response = await getTopCountries(eventId, limit);

      // Transform the response data to match our table structure
      let dataArray = [];
      if (response && Array.isArray(response)) {
        dataArray = response;
      } else if (response?.data && Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response?.countries && Array.isArray(response.countries)) {
        dataArray = response.countries;
      }

      if (dataArray.length > 0) {
        const formattedData = dataArray.map((item, index) => ({
          id: item.id || item.countryId || index,
          rank: index + 1,
          country: item.country || item.name || item.countryName || "N/A",
          registration:
            item.registration || item.count || item.registrations || 0,
          change:
            item.change !== undefined
              ? item.change
              : item.changePercentage !== undefined
              ? item.changePercentage
              : 0,
        }));
        dispatch(setTopCountries(formattedData));
      } else {
        dispatch(setTopCountries([]));
      }
    } catch (error) {
      dispatch(setTopCountriesError("Error fetching top countries"));
      console.log("Error fetching top countries: ", error);
    } finally {
      dispatch(setTopCountriesLoading(false));
    }
  };
