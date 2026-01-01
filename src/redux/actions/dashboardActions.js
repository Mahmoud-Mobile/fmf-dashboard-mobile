import { getDashboardSummary } from "../../webservice/DashboardApi";
import {
  setDashboardSummary,
  setDashboardLoading,
  setDashboardError,
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
