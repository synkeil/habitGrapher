module.exports = {
  entry: {
    'bundle': __dirname+'/js/src/calendar.js',
  },
  output:{
    path: __dirname+'/js/dist/',
    filename: '[name].js'
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
