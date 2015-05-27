module.exports = {
  entry: "./ionic/ionic.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, include: /ionic/, loader: "style!css" },
      { test: /\.es6$/, include: /ionic/, loader: "babel-loader?optional[]=es7.decorators&plugins[]=babel-plugin-angular2-annotations&compact=false&blacklist[]=strict"},
      { test: /\.js$/, include: /ionic/, loader: "babel-loader?optional[]=es7.decorators&plugins[]=babel-plugin-angular2-annotations&compact=false&blacklist[]=strict"}
    ]
  },
  resolve: {
    modulesDirectories: [
      'ionic2',
      'node_modules'
    ],

    extensions: ['', '.js', '.es6']
  }
};
