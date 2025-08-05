module.exports = {
  apps: [
    {
      name: "apk-group-prod",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 3008
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3009
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};
