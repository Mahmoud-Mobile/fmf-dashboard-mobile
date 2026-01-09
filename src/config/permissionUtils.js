/**
 * Permission utility functions
 * Centralized permission checking logic for the application
 */

/**
 * Check if user has a specific permission
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (userPermissions, permission) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return userPermissions.includes(permission);
};

/**
 * Check if user has all required permissions
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string[]} requiredPermissions - Array of required permissions
 * @returns {boolean}
 */
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

/**
 * Check if user has any of the required permissions
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string[]} requiredPermissions - Array of required permissions
 * @returns {boolean}
 */
export const hasAnyPermission = (userPermissions, requiredPermissions) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

export const createPermissionCheckers = (userPermissions) => {
  const check = (permission) => hasPermission(userPermissions, permission);
  const checkAll = (permissions) =>
    hasAllPermissions(userPermissions, permissions);
  const checkAny = (permissions) =>
    hasAnyPermission(userPermissions, permissions);

  return {
    hasTripsPermission: () => {
      const hasTripPermission = checkAny([
        "trips:create",
        "trips:delete",
        "trips:update",
        "trips:read",
      ]);
      const hasTransportationPermission = checkAny([
        "transportation:create",
        "transportation:read",
        "transportation:update",
        "transportation:delete",
        "transportation:manage",
      ]);
      return hasTripPermission || hasTransportationPermission;
    },

    // Hotels permissions
    hasHotelsPermission: () =>
      checkAny(["hotels:read", "accommodation:read"]) &&
      checkAny(["hotels:update", "accommodation:update"]),

    // Flights permissions
    hasFlightsPermission: () => checkAll(["flight:read", "flight:update"]),

    // Dashboard permissions
    hasDashboardRead: () => check("dashboard:read"),
    hasDashboardReadFlights: () => check("dashboard:read_flights"),
    hasDashboardReadTrips: () => check("dashboard:read_trips"),
    hasDashboardReadAccommodations: () =>
      check("dashboard:read_accommodations"),
    hasDashboardReadDataEntry: () => check("dashboard:read_data_entry"),
    hasDashboardReadSubevents: () => check("dashboard:read_subevents"),

    // Sub-events permissions
    hasSubEventsRead: () => check("sub-events:read"),
    hasSubEventsUpdate: () => check("sub-events:update"),
    hasSubEventsReadParticipants: () => check("sub-events:read_participants"),
    hasSubEventsUpdateParticipants: () =>
      check("sub-events:update_participants"),
    hasSubEventsPermission: () =>
      check("sub-events:read") && check("sub-events:update"),

    // Resources permissions
    hasResourcesRead: () => check("resources:read"),
    hasResourcesUpdate: () => check("resources:update"),
    hasResourcesPermission: () =>
      check("resources:read") && check("resources:update"),
  };
};

/**
 * Check if a tab is allowed based on permissions
 * @param {string} tabId - Tab identifier
 * @param {Object} permissions - Permission checkers object
 * @returns {boolean}
 */
export const isTabAllowed = (tabId, permissions) => {
  // Always allowed tabs (no permission checks)
  // Dashboard is always shown, but sections inside are filtered by permissions
  // CheckIn is always allowed for FMF environment
  const alwaysAllowedTabs = ["Dashboard", "CheckIn", "More", "DesignatedCars"];
  if (alwaysAllowedTabs.includes(tabId)) {
    return true;
  }

  // Permission-based tabs
  const tabPermissionMap = {
    Trips: () => permissions.hasTripsPermission(),
    Hotels: () => permissions.hasHotelsPermission(),
    Flights: () => permissions.hasFlightsPermission(),
  };

  const checkPermission = tabPermissionMap[tabId];
  return checkPermission ? checkPermission() : true;
};

/**
 * Check if a section has required permission
 * @param {string} requiredPermission - Required permission for the section
 * @param {Object} permissions - Permission checkers object
 * @returns {boolean}
 */
export const hasSectionPermission = (requiredPermission, permissions) => {
  if (!requiredPermission) return true; // No permission required

  const permissionMap = {
    "dashboard:read": () => permissions.hasDashboardRead(),
    "dashboard:read_flights": () => permissions.hasDashboardReadFlights(),
    "dashboard:read_trips": () => permissions.hasDashboardReadTrips(),
    "dashboard:read_accommodations": () =>
      permissions.hasDashboardReadAccommodations(),
    "dashboard:read_data_entry": () => permissions.hasDashboardReadDataEntry(),
    "dashboard:read_subevents": () => permissions.hasDashboardReadSubevents(),
  };

  const checkPermission = permissionMap[requiredPermission];
  return checkPermission ? checkPermission() : true;
};

/**
 * Check if an action button category is disabled
 * @param {string} category - Action button category
 * @param {Object} permissions - Permission checkers object
 * @returns {boolean}
 */
export const isActionButtonDisabled = (category, permissions) => {
  const categoryPermissionMap = {
    Trips: () => !permissions.hasTripsPermission(),
    Hotels: () => !permissions.hasHotelsPermission(),
    Flights: () => !permissions.hasFlightsPermission(),
  };

  const checkDisabled = categoryPermissionMap[category];
  return checkDisabled ? checkDisabled() : false;
};
