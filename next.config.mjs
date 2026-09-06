/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The waitlist is retired; old shared /early-access links go to signup.
    return [{ source: "/early-access", destination: "/signup", permanent: true }];
  },
};

export default nextConfig;
