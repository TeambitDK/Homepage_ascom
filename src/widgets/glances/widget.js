import credentialedProxyHandler from "utils/proxy/handlers/credentialed";

const widget = {
  api: "{url}/api/4/{endpoint}",
  proxyHandler: credentialedProxyHandler,
};

export default widget;
