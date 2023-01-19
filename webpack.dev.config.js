const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        historyApiFallback: true,
    },
};
