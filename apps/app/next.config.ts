import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      protocol:'https',
      hostname:'lh3.googleusercontent.com',
    },{
      protocol:'https',
      hostname:'utfs.io'
    }]
  },
  reactStrictMode:false,
  /* config options here */
  experimental:{
    viewTransition:true,
    reactCompiler:true
  }
};

export default nextConfig;
