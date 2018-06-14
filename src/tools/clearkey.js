var clear = function (obj, keys, all) {
  if (all) {
    for (var name in obj) {
      delete obj[name];
    }
  } else {
    keys.forEach(function (item) {
      delete  obj[item];
    });
  }

};

export default clear;
