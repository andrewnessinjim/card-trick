module.exports = {
  svgo: true,
  typescript: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
      },
      {
        name: "removeDimensions",
        params: {
          removeWidth: true,
          removeHeight: true,
        },
      },
      {
        name: "prefixIds",
        params: {
          prefixIds: true,
        },
      },
    ],
  },
  svgProps: {
    height: "100%",
  },
  filenameCase: "kebab",
};
