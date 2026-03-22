import { onRequest as __api_sessions_js_onRequest } from "/Users/artjombecker/Documents/Arbeit/Kinopolis/kinopolis-automation/functions/api/sessions.js"

export const routes = [
    {
      routePath: "/api/sessions",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_sessions_js_onRequest],
    },
  ]