# react + babel + webpack + browser-synch

### getting started

In order to start the project we will be using npm scripts:

##### install

```sh
npm install
```



##### start

```sh
npm start
```



##### build (builds in dev mode and starts server) *TDB

```sh
npm run build
```



##### build development mode

```sh
npm run build:watch
```



##### build production mode

```sh
npm run build:prod
```



I'd preffer to not have to install webpack globally and have all the necessary dependencies stated in the package.json file. In this way, whenever the project is ported to another machine/VM/docker container, etc the project will be self sufficient to both: run in production mode and developer mode.



------

### project structure

- **src**: source code of the project itself
- **www**: destination folder (static front-end)


```basic
.
├── README.md
├── package.json
├── src
│   ├── favico.ico
│   ├── index.ejs
│   ├── index.js
│   └── style
│       ├── main.scss
│       └── style.css
├── webpack.config.js
└── www
    ├── all.css
    ├── all.js
    ├── favico.ico
    └── index.html
```



------

### dependencies

#### overall view

The best way to have an overall view is to check the [package.json](./package.json) file, here below commented:

``` javascript
{
  "dependencies": {
    "webpack",                      // webpack (core library) 
    "path",                         //  - tool: path resolving (@webpack.config.js)
    "css-loader",                   //  - loader: returns css code, resolves imports and url(...)
    "sass-loader",                  //  - loader: converts sass to css
    "node-sass",                    //  - dependecy: required by 'sass-loader'
    "extract-text-webpack-plugin",  //  - plugin: no need to include extensions on require/import
    "html-webpack-plugin"           //  - plugin: creates a new index.html
    "react",                        // react (core library)
    "react-dom",                    //   - glue between react and DOM
    "babel-core",                   // babel (core library)
    "babel-loader",                 //   - loader: so webpack can use babel
    "babel-preset-es2015",          //   - preset: ECMA Script 2015 compatibility
    "babel-preset-react",           //   - preset: for JSX compatibility
    "browser-synch",                // browser-synch (core library)
    "browser-synch-webpack-plugin", //   - plugin: so webpack can use browser-synch
  }
}
```

*NOTE: do not use the file above as package.json since strict JSON does not addmit comments.*



#### webpack.config.js

used for:

1. Bundle all js files into one ('all.js')
2. Bundle all css/scss files into one ('all.css')
3. Create index.html from an EJS template
4. Run a developer server using browser-synch

##### How?

Specify an entry point, and then webpack will calculate all the dependencies that this file requires (including css files: see loaders). Then specify an output point, where all the files will be bundled together to. See [webpack.config.js](/Users/juangreco/Documents/Projects/sites/cmed/webpack.config.js) here divided into parts:



##### basic config

```javascript
var config = {
  // NOT sure what this does??
  debug: true,
  
  // ENTRY point, in our case ./src/index.js 
  entry: [
    path.resolve( __dirname, 'src/index')
  ],
  
  // OUTPUT point, save all files into a dir "www" and bundle all JS code into "all.js"
  output: {
    path: path.resolve( __dirname, 'www'),
    filename: 'all.js'
  },
  ...
};
```



##### module-loaders:

##### - scss

```javascript
...
// Convert '.SCSS, .SASS, .CSS' files into '.CSS' and bundle
module: {
      loaders: [
          { test: /\.(scss|sass|css)$/, loader: ExtractTextPlugin.extract('css!sass') },
      ]
  },
...
```



##### - babel

```javascript
...
// preset 'react': Convert '.JSX, .JS' files into '.JS' and bundle
// preset 'es2015': Convert ES6 to ES5
module: {
      loaders: [
          { test: /\.(jsx|js)$/, loaders: ['babel'], exclude: /node_modules/ },
      ]
  },
...
```



##### plugins:

##### - [html](https://github.com/ampedandwired/html-webpack-plugin)

```javascript
// Creates an HTML page based on a .EJS template
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Title',
      favicon: 'src/favico.ico',
      template: 'src/index.ejs'
    }),
    ...
  ]
  ...
};
```

##### - [extract](https://github.com/webpack/extract-text-webpack-plugin)

```javascript
// Moves all css files into one
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  ...
  plugins: [
    new ExtractTextPlugin('all.css', {
      allChunks: true
    })
  ],
  ...
};
```

##### - [browsersynch](https://www.npmjs.com/package/browser-sync-webpack-plugin)

```javascript
// Web server for testing the production build on multiple, synched windows (also diff devs)
// Note: see port 3001 for browsersynch options
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var config = {
  ...
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['www'] }
    })
  ],
  ...
};
```



##### resolve

```javascript
// Makes possible to used `require('file')` without the extension being specified 
var config = {
  ...
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};
```



### TBD:

https://www.npmjs.com/package/image-webpack-loader

check image optimizations