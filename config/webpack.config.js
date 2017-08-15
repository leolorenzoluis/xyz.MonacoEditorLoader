/**
 * Adapted from angular2-webpack-starter
 */

const helpers = require('./helpers');
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

function ngExternal(ns) {
    var ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
}

var outputDirectory = 'bundles';
if(process.env.NODE_ENV === 'demo') {
    outputDirectory = 'sample/node_modules/@abc.xyz/xyz-monaco-editor-loader/bundles';
}

module.exports = {
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: helpers.root('./index.ts'),

    output: {
        path: helpers.root(outputDirectory),
        publicPath: '/',
        filename: 'xyz-monaco-editor-loader.umd.js',
        libraryTarget: 'umd',
        library: 'xyz-monaco-editor-loader'
    },

    // require those dependencies but don't bundle them
    externals: {
        '@angular/core': ngExternal('core')
    },

    module: {
        rules: [
            /*
            * Typescript loader support for .ts
            *
            * Component Template/Style integration using `angular2-template-loader`
            * Angular 2 lazy loading (async routes) via `ng-router-loader`
            *
            * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
            * order of the loader matter.
            *
            * See: https://github.com/s-panferov/awesome-typescript-loader
            * See: https://github.com/TheLarkInn/angular2-template-loader
            * See: https://github.com/shlomiassaf/ng-router-loader
            */
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.webpack.json'
                        }
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.json$/,
                use: 'json-loader'
            },

            /*
             * to string and css loader support for *.css files (from Angular components)
             * Returns file content as string
             *
             */
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [helpers.root('src', 'styles')]
            },

            /*
             * to string and sass loader support for *.scss files (from Angular components)
             * Returns compiled css content as string
             *
             */
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [helpers.root('src', 'styles')]
            },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.html$/,
                use: 'raw-loader'
            },

            /* 
             * File loader for supporting images, for example, in CSS files.
             */
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            },

            /* File loader for supporting fonts, for example, in CSS files.
            */
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src')
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        })
    ]
};