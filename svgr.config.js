module.exports = {
  svgo: true,
  typescript: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
      },
      {
        name: "prefixIds",
        params: {
          prefixIds: true,
        },
      },
    ],
  },
  filenameCase: "kebab",
};
