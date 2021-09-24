const config = {
  baseUrl() {
    const { environment, isDeployment } = this.get('app');
    return isDeployment
      ? `http://api.false`
      : `http://api.false.${environment}`;
  },
};

export type HelloWorldConfig = typeof config;
export default config;
