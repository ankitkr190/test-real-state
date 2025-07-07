module.exports = {
  apps: [
    {
      name: "richy-group-poc",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 3003
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3006
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3007,
      },
    },
  ],
};
