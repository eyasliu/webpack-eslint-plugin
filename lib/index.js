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

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EslintPlugin = function () {
    function EslintPlugin() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, EslintPlugin);

        if (options.include && typeof options.include === 'string') {
            options.include = [options.include];
        }
        this.options = Object.assign({
            format: 'stylish',
            include: ['**/*.js', '**/*.jsx']
        }, options);
        this.engins = new _eslint.CLIEngine(this.options);
    }

    _createClass(EslintPlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.plugin('done', function (stats) {
                var files = Array.prototype.concat.apply([], _this.options.include.map(function (item) {
                    return stats.compilation.fileDependencies.filter(_minimatch2.default.filter(item), { matchBase: true });
                }));
                files = function (files) {
                    var tmp = [];
                    files.forEach(function (i) {
                        return !~tmp.indexOf(i) && tmp.push(i);
                    });
                    return tmp;
                }(files);
                var results = _eslint.CLIEngine.getErrorResults(_this.engins.executeOnFiles(files).results);
                _this.options.beforeOutput && _this.options.beforeOutput(results);
                _this.printResults(results);
            });
        }
    }, {
        key: 'printResults',
        value: function printResults(results) {
            var formatter = void 0;
            try {
                formatter = typeof this.options.format !== 'function' ? this.engins.getFormatter(this.options.format) : this.options.format;
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