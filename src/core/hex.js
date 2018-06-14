var encrypt = function (content) {
  var toHex = function (str) {
    var arr = [];
    var len = str.length;
    for (let i = 0; i < len; i++) {
      arr.push(str.charCodeAt(i).toString(16));
    }
    return arr.join('');
  };
  const hex = toHex(JSON.stringify(content));
  var header = hex.slice(0, 15);
  header = header.split('').reverse().join('');
  const str1 = header.slice(0, 6);
  const str2 = header.slice(6, 10).split('').reverse().join('');
  const str3 = header.slice(10, 15);
  const meger = str1 + str2 + str3;
  const result = meger + hex.slice(15, hex.length) + '====';
  return result;
}
export default encrypt;
