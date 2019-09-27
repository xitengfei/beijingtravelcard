const { 
    override, 
    fixBabelImports, 
    addLessLoader,
    addWebpackAlias
} = require("customize-cra");
const path = require("path");

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: '[local]--[hash:base64:5]'
    }),
    addWebpackAlias({
        ['@'] : resolve("src")
    })
)