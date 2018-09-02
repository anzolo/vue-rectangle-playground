module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    pathRewrite: {'^/api' : ''}
                    // ws: true,
                    // changeOrigin: true
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "\*"
            },
        }
    },

    baseUrl: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,

    css: {
      extract: false
    }
};