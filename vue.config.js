module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  css: {
    sourceMap: true,
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/index.scss';`,
      },
      postcss: {
        plugins: [
          require('autoprefixer')({ grid: true }),
        ],
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/scada-blog/'
    : '/',
  transpileDependencies: [
    'vue-clamp',
    'resize-detector',
  ],
};
