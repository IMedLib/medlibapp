/**
 * Created by zhangruofan on 2015/12/23.
 */
var path = require('path');
module.exports = {
    output:{
      filename:'[chunkhash].wp.js'
    },
    module: {
        loaders: [
            // required to write "require('./style.css')"
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'base64-font-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    alias: {
        jquery: path.join(__dirname, './public/dist/js/lib/jquery.min.js'),
        bootstrap:path.join(__dirname,'./public/dist/css/lib/bootstrap.css')
    }
};