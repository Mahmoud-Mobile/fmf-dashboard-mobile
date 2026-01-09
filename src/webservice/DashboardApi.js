import { Get } from "./Gate";

// Dashboard summary API
const getDashboardSummary = async (eventId, data = {}) => {
  return await Get(`mobile/ops/dashboard/summary`, { eventId, ...data });
};

// Top countries API
const getTopCountries = async (eventId, limit = 20) => {
  return await Get(`events/${eventId}/dashboard/top-countries`, { limit });
};

// Event summary KPIs API
const getEventSummaryKPIs = async (eventId, data = {}) => {
  return await Get(`events/${eventId}/dashboard/event-summary-kpis`, data);
};

export { getDashboardSummary, getTopCountries, getEventSummaryKPIs };
