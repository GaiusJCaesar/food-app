import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  publicRuntimeConfig: {
    version,
  },
  env: {
    API_URL: "https://7m8fbvpb9a.execute-api.eu-west-2.amazonaws.com",
  },
};

export default nextConfig;
