module.exports = {
  entry: {
    'source': __dirname+'/js/src/app.js',
  },
  output:{
    path: __dirname+'/js/dist/',
    filename: 'bundle.js'
  }
  ,
  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
