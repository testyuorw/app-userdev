/**
 * copy url query string to query params
 * */
var copy = function (from,to) {
  for (var name in from) {
      var val = from[name];
      to[name] = val;
  }
};
export default copy;
