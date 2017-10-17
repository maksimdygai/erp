'use strict';

const
    webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    NODE_ENV = process.env.NODE_ENV || 'development',

    plugins = [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),

            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),

        new ExtractTextPlugin('/css/styles.css'),
        new webpack.ProvidePlugin({_: 'lodash'}),
        new webpack.ProvidePlugin({moment: 'moment'})
    ];

if (NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: {app: ['./client/app.jsx']},

    output: {
        filename  : 'js/build.js',
        path      : path.join(__dirname, './public'),
        publicPath: '/public'
    },

    module: {
        rules: [
            {
                test   : /\.jsx?$/,
                loader : 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(css|less)$/,

                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },

            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader?name=/img/[name].[ext]'
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            }
        ]
    },

    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' ? 'eval' : false,
    plugins: plugins,

    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './client')
        ],

        extensions: ['.js', '.jsx', '.less']
    }
};
