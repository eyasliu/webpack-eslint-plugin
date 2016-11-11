'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 异步执行eslint，不会阻塞webpack编译
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _eslint = require('eslint');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EslintPlugin = function () {
    function EslintPlugin(options) {
        _classCallCheck(this, EslintPlugin);

        this.engins = new _eslint.CLIEngine(options);
        this.options = Object.assign({
            format: 'stylish'
        }, options);
    }

    _createClass(EslintPlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.plugin('done', function (stats, cb) {
                var files = stats.compilation.fileDependencies.filter(function (item) {
                    return !~item.indexOf('node_modules') && ~['.js', '.jsx'].indexOf(_path2.default.parse(item).ext);
                });
                var results = _eslint.CLIEngine.getErrorResults(_this.engins.executeOnFiles(files).results);
                _this.printResults(results);
            });
        }
    }, {
        key: 'printResults',
        value: function printResults(results) {
            var formatter = void 0;
            try {
                formatter = this.engins.getFormatter(this.options.format);
            } catch (e) {
                console.log(e.message);
                return false;
            }
            console.log(formatter(results));
            return false;
        }
    }]);

    return EslintPlugin;
}();

exports.default = EslintPlugin;