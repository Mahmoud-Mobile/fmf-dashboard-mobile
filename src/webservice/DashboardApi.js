import { Get } from "./Gate";

// Dashboard summary API
const getDashboardSummary = async (eventId, data = {}) => {
  return await Get(`mobile/ops/dashboard/summary`, { eventId, ...data });
};

export { getDashboardSummary };

