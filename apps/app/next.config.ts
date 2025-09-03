import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:['lh3.googleusercontent.com']
  },
  reactStrictMode:false,
  /* config options here */
  experimental:{
    viewTransition:true,
    reactCompiler:true
  }
};

export default nextConfig;
