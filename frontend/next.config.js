/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "2VrAjU7NUS14mDKICeTwEO3S2Gad8jtlHqQobDz69Io=",
  },
};

module.exports = nextConfig;
