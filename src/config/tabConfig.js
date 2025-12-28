import Dashboard from "../screens/Dashboard";
import Flights from "../screens/Flights";
import CheckIn from "../screens/CheckIn";
import Trips from "../screens/Trips";
import More from "../screens/More";
import Hotels from "../screens/Hotels";
import DesignatedCars from "../screens/DesignatedCars";
import VendorOfferHome from "../screens/OfferHome/VendorOfferHome";
import DashboardOfferHome from "../screens/OfferHome/DashboardOfferHome";
import SelectYourArea from "../screens/OfferHome/SelectYourArea";
import store from "../redux/store";
export const ENVIRONMENT_TABS = {
  fmf: [
    {
      route: "Dashboard",
      component: Dashboard,
      icon: "Home_Tab",
      headerShown: false,
      titleText: "Dashboard",
      priority: 1,
      defaultVisible: true,
    },
    {
      route: "Flights",
      component: Flights,
      icon: "Flights_Icon",
      headerShown: false,
      titleText: "Flights",
      priority: 2,
      defaultVisible: true,
    },
    {
      route: "CheckIn",
      component: CheckIn,
      icon: "CheckIn_Icon",
      headerShown: false,
      titleText: "Check In",
      priority: 3,
      defaultVisible: true,
    },

    {
      route: "Trips",
      component: Trips,
      icon: "DesignatedCar_Icon",
      headerShown: false,
      titleText: "Trips",
      priority: 4,
      defaultVisible: false,
    },
    {
      route: "DesignatedCars",
      component: DesignatedCars,
      icon: "DesignatedCar_Icon",
      headerShown: false,
      titleText: "D. Cars",
      priority: 5,
      defaultVisible: false,
    },
    {
      route: "Hotels",
      component: Hotels,
      icon: "Hotels_Icon",
      headerShown: false,
      titleText: "Hotels",
      priority: 6,
      defaultVisible: true,
    },
    {
      route: "More",
      component: More,
      icon: "More_Tab",
      headerShown: false,
      titleText: "More",
      priority: 7,
      defaultVisible: true,
      alwaysVisible: true,
    },
  ],
  offerHome: [
    {
      route: "DashboardOfferHome",
      component: DashboardOfferHome,
      icon: "Home_Tab",
      headerShown: false,
      titleText: "Dashboard",
      priority: 1,
      defaultVisible: true,
    },
    {
      route: "CheckIn",
      component: CheckIn,
      icon: "CheckIn_Icon",
      headerShown: false,
      titleText: "Check In",
      priority: 2,
      defaultVisible: true,
    },
    {
      route: "VendorOfferHome",
      component: VendorOfferHome,
      icon: "Vendor_Icon",
      headerShown: false,
      titleText: "Vendor",
      priority: 3,
      defaultVisible: true,
    },
    {
      route: "SelectYourArea",
      component: SelectYourArea,
      icon: "CheckIn_Icon",
      headerShown: false,
      titleText: "Check In",
      priority: 4,
      defaultVisible: true,
    },
    {
      route: "More",
      component: More,
      icon: "More_Tab",
      headerShown: false,
      titleText: "More",
      priority: 5,
      defaultVisible: true,
      alwaysVisible: true,
    },
  ],
};

export const getTabsForEnvironment = (environment, role = null) => {
  const tabs = ENVIRONMENT_TABS[environment] || ENVIRONMENT_TABS.fmf;

  // Get role from Redux store if not provided
  // const rolePermission = role || store.getState()?.auth?.user?.user;
  const rolePermission = "organizer";

  if (environment === "offerHome" && rolePermission) {
    const allowedRoutes = {
      organizer: ["DashboardOfferHome", "SelectYourArea", "More"],
      vendor: ["DashboardOfferHome", "VendorOfferHome", "More"],
      admin: ["DashboardOfferHome", "VendorOfferHome", "More"],
    };

    const routesForRole = allowedRoutes[rolePermission] || allowedRoutes.vendor;
    return tabs.filter((tab) => routesForRole.includes(tab.route));
  }

  return tabs;
};

export const getDefaultTabVisibility = (environment, role = null) => {
  // Get role from Redux store if not provided
  // const rolePermission = role || store.getState()?.auth?.user?.user;
  const rolePermission = "organizer";
  const tabs = getTabsForEnvironment(environment, rolePermission);
  return tabs.reduce((acc, tab) => {
    acc[tab.route] = tab.defaultVisible ?? true;
    return acc;
  }, {});
};
