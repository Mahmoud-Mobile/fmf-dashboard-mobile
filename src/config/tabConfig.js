import Dashboard from "../screens/Dashboard";
import Flights from "../screens/Flights";
import CheckIn from "../screens/CheckIn";
import Trips from "../screens/Trips";
import More from "../screens/More";
import Hotels from "../screens/Hotels";
import DesignatedCars from "../screens/DesignatedCars";
import CheckInOfferHome from "../screens/OfferHome/CheckInOfferHome";
import DashboardOfferHome from "../screens/OfferHome/Dashboard";

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
      defaultVisible: true,
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
      defaultVisible: false,
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
      alwaysVisible: true,
    },
    {
      route: "CheckInOfferHome",
      component: CheckInOfferHome,
      icon: "CheckIn_Icon",
      headerShown: false,
      titleText: "Check-in",
      priority: 2,
      defaultVisible: true,
    },
    {
      route: "More",
      component: More,
      icon: "More_Tab",
      headerShown: false,
      titleText: "More",
      priority: 3,
      defaultVisible: true,
      alwaysVisible: true,
    },
  ],
};

export const getTabsForEnvironment = (environment) => {
  return ENVIRONMENT_TABS[environment] || ENVIRONMENT_TABS.fmf;
};

export const getDefaultTabVisibility = (environment) => {
  const tabs = getTabsForEnvironment(environment);
  return tabs.reduce((acc, tab) => {
    acc[tab.route] = tab.defaultVisible ?? true;
    return acc;
  }, {});
};
