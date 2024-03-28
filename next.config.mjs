/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
