import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  publicRuntimeConfig: {
    version,
  },
};

export default nextConfig;
