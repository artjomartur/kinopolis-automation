import { onRequest as __api_locations_js_onRequest } from "/Users/artjombecker/Documents/Arbeit/Kinopolis/kinopolis-automation/functions/api/locations.js"
import { onRequest as __api_sessions_js_onRequest } from "/Users/artjombecker/Documents/Arbeit/Kinopolis/kinopolis-automation/functions/api/sessions.js"

export const routes = [
    {
      routePath: "/api/locations",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_locations_js_onRequest],
    },
  {
      routePath: "/api/sessions",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_sessions_js_onRequest],
    },
  ]