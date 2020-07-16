const date = "2020/4/12"
var d = new Date(date);
console.log(typeof d.getFullYear());
console.log(d);
console.log(d.getTime());
console.log(d.toLocaleDateString());
console.log(d.toString());
// console.log(toTimestamp(d));
console.log(Date.now()-d.getTime());