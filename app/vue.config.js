const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src/')
            }
        }
    },
    devServer: {
      proxy: 'http://localhost:9000'
    },
    css: {
      loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/variables.scss";`
            }
        }
    }
}