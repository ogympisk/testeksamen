const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/database.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    }
};