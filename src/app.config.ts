const config = {
  environment: process.env?.ENV,
  isDeployment: process.env?.ENV === 'prd',
};

export type AppConfig = typeof config;
export default config;
