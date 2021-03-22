module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "MilkCheque";
      return args;
    });
  },
  publicPath: "/" + (process.env.PUBLIC_PATH || "")
};
