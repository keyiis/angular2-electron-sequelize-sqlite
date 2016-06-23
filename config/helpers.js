var path = require('path');
var _root = path.resolve(__dirname, '..');
/**
 * 项目根目录
 * @param  {any} args 下级路径
 */
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
/**
 * angular应用源码根目录
 * @param  {any} args 下级路径
 */
function rootAngular(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['src/angular'].concat(args));
}
/**
 * electron应用源码根目录
 * @param  {any} args 下级路径
 */
function rootElectron(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['src/electron'].concat(args));
}
/**
 * electron编译及打包输出目录
 * @param  {any} args 下级路径
 */
function outputElectron(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['output/electron'].concat(args));
}
exports.root = root;
exports.rootAngular = rootAngular;
exports.rootElectron = rootElectron;
exports.outputElectron = outputElectron;
