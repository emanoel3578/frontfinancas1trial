module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: 'Front Finanças'
        },
        preload: 'src/preload.js',
      }
    }
  }