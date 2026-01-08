export const hasPermission = (userPermissions, permission) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return userPermissions.includes(permission);
};

export const hasAllPermissions = (userPermissions, requiredPermissions) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

export const hasAnyPermission = (userPermissions, requiredPermissions) => {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

export const createPermissionCheckersOffer = (userPermissions) => {
  const check = (permission) => hasPermission(userPermissions, permission);
  const checkAll = (permissions) =>
    hasAllPermissions(userPermissions, permissions);
  const checkAny = (permissions) =>
    hasAnyPermission(userPermissions, permissions);

  return {
    // Exhibitor permissions
    hasExhibitorRead: () => check("exhibitor:read"),
    hasExhibitorUpdate: () => check("exhibitor:update"),
    hasExhibitorAnalyticsRead: () => check("exhibitor:analytics:read"),
    hasExhibitorExportRead: () => check("exhibitor:export:read"),
    hasExhibitorUserAssign: () => check("exhibitor:user:assign"),
    hasExhibitorUserRemove: () => check("exhibitor:user:remove"),
    hasExhibitorUserRead: () => check("exhibitor:user:read"),
    hasExhibitorProductCreate: () => check("exhibitor:product:create"),
    hasExhibitorProductRead: () => check("exhibitor:product:read"),
    hasExhibitorProductUpdate: () => check("exhibitor:product:update"),
    hasExhibitorProductDelete: () => check("exhibitor:product:delete"),
    hasExhibitorVisitCreate: () => check("exhibitor:visit:create"),
    hasExhibitorVisitRead: () => check("exhibitor:visit:read"),
    hasExhibitorPurchaseCreate: () => check("exhibitor:purchase:create"),
    hasExhibitorPurchaseRead: () => check("exhibitor:purchase:read"),
    hasExhibitorPurchaseCancel: () => check("exhibitor:purchase:cancel"),
    hasEventRead: () => check("event:read"),

    // Check if user has any exhibitor permissions
    hasAnyExhibitorPermission: () =>
      checkAny([
        "event:read",
        "exhibitor:read",
        "exhibitor:analytics:read",
        "exhibitor:export:read",
        "exhibitor:update",
        "exhibitor:user:assign",
        "exhibitor:user:remove",
        "exhibitor:user:read",
        "exhibitor:product:create",
        "exhibitor:product:read",
        "exhibitor:product:update",
        "exhibitor:product:delete",
        "exhibitor:visit:create",
        "exhibitor:visit:read",
        "exhibitor:purchase:create",
        "exhibitor:purchase:read",
        "exhibitor:purchase:cancel",
      ]),

    // Resources permissions
    hasResourcesRead: () => check("resources:read"),
    hasResourcesCreate: () => check("resources:create"),
    hasResourcesUpdate: () => check("resources:update"),
    hasResourcesDelete: () => check("resources:delete"),
    hasResourcesFullPermission: () =>
      check("resources:read") &&
      check("resources:create") &&
      check("resources:update") &&
      check("resources:delete"),

    // Check if user should see Vendors tab
    // Requires any exhibitor permission
    hasVendorsPermission: () => {
      return checkAny([
        "event:read",
        "exhibitor:read",
        "exhibitor:analytics:read",
        "exhibitor:export:read",
        "exhibitor:update",
        "exhibitor:user:assign",
        "exhibitor:user:remove",
        "exhibitor:user:read",
        "exhibitor:product:create",
        "exhibitor:product:read",
        "exhibitor:product:update",
        "exhibitor:product:delete",
        "exhibitor:visit:create",
        "exhibitor:visit:read",
        "exhibitor:purchase:create",
        "exhibitor:purchase:read",
        "exhibitor:purchase:cancel",
      ]);
    },

    // Check if user should see CheckIn tab
    // Requires resources:read, resources:create, resources:update, resources:delete
    // AND any exhibitor permission
    hasCheckInPermission: () => {
      const hasResourcesFull =
        check("resources:read") &&
        check("resources:create") &&
        check("resources:update") &&
        check("resources:delete");
      const hasExhibitor = checkAny([
        "event:read",
        "exhibitor:read",
        "exhibitor:analytics:read",
        "exhibitor:export:read",
        "exhibitor:update",
        "exhibitor:user:assign",
        "exhibitor:user:remove",
        "exhibitor:user:read",
        "exhibitor:product:create",
        "exhibitor:product:read",
        "exhibitor:product:update",
        "exhibitor:product:delete",
        "exhibitor:visit:create",
        "exhibitor:visit:read",
        "exhibitor:purchase:create",
        "exhibitor:purchase:read",
      ]);
      return hasResourcesFull && hasExhibitor;
    },
  };
};

export const isTabAllowedOffer = (tabId, permissions) => {
  const alwaysAllowedTabs = ["DashboardOfferHome", "More"];
  if (alwaysAllowedTabs.includes(tabId)) {
    return true;
  }

  const tabPermissionMap = {
    Vendors: () => permissions.hasVendorsPermission(),
    CheckIn: () => permissions.hasCheckInPermission(),
    SelectYourArea: () => permissions.hasCheckInPermission(),
  };

  const checkPermission = tabPermissionMap[tabId];
  return checkPermission ? checkPermission() : true;
};
