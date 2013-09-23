/**
 * @fileOverview Underscore.js client detection helper
 * @requires {@link http://underscorejs.org/|Underscore.js}
 * @see https://github.com/piecioshka/underscore-is
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @license The MIT License (MIT)
 * @example
 *   _.is().browser.chrome // under Chrome returns @type {boolean} 'true'
 *   _.is().engine.webkit // under Chrome & Safari returns @type {boolean} 'true'
 *   _.is().tv.sharp // under TV Sharp returns @type {boolean} 'true'
 *   _.is().os.linux // under Operating System Linux returns @type {boolean} 'true'
 */
/*jslint nomen: true, indent: 4 */
/*global _ */
(function (_) {
    'use strict';

    // default User-Agent
    var _ua = navigator.userAgent;
    // buffer with:
    // - `key` as User-Agent,
    // - `value` as API for that UA
    var cache = {};
    // regular expression for browsers
    var browsers = [
        ['chrome', /(chrome)/i],
        ['mozilla', /(firefox)/i],
        ['safari', /(safari)/i],
        ['msie', /(msie)/i],
        ['opera', /(opera)/i]
    ];
    // regulat expressions for engines
    var engines = [
        ['webkit', /(webkit)/i],
        ['gecko', /(gecko)/i],
        ['presto', /(presto)/i],
        ['trident', /(trident)/i]
    ];
    // helper outer interface
    var api = {
        _cache: cache,
        ua: null,
        browser: null,
        engine: null,
        tv: null,
        os: null
    };

    function update() {
        api.browser = (function () {
            var list = {}, i, len = browsers.length;
            for (i = 0; i < len; ++i) {
                browsers[i][1].test(api.ua) && (list[browsers[i][0]] = true);
            }
            return list;
        }());
        api.engine = (function () {
            var list = {}, i, len = engines.length;
            for (i = 0; i < len; ++i) {
                engines[i][1].test(api.ua) && (list[engines[i][0]] = true);
            }
            return list;
        }());
    }

    _.is = function (custom) {
        api.ua = (_.isString(custom)) ? custom : _ua;

        if (!_.has(cache, custom)) {
            update();
            if (!cache[api.ua]) {
                cache[api.ua] = api;
            }
            return cache[api.ua];
        } else {
            return cache[custom];
        }
    };
}(_));
