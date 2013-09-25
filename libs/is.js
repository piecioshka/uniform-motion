/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @fileOverview Underscore.js client detection helper
 * @license The MIT License
 * @see https://github.com/piecioshka/is
 * @example
 *   is().browser.chrome // under Chrome returns @type {boolean} 'true'
 *   is().engine.webkit // under Chrome & Safari returns @type {boolean} 'true'
 *   is().tv.sharp // under TV Sharp returns @type {boolean} 'true'
 *   is().os.linux // under Operating System Linux returns @type {boolean} 'true'
 *   is().mobile.iphone // under Mobile iPhone returns @type {boolean} 'true'
 */
/*jslint indent: 4, nomen: true, plusplus: true, vars: true */
/*global navigator */
(function (global) {
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
        os: null,
        mobile: null
    };

    function update() {
        api.browser = (function () {
            var list = {}, i, len = browsers.length;
            for (i = 0; i < len; ++i) {
                if (browsers[i][1].test(api.ua)) {
                    list[browsers[i][0]] = true;
                }
            }
            return list;
        }());
        api.engine = (function () {
            var list = {}, i, len = engines.length;
            for (i = 0; i < len; ++i) {
                if (engines[i][1].test(api.ua)) {
                    list[engines[i][0]] = true;
                }
            }
            return list;
        }());
    }

    // exports
    global.is = function (custom) {
        var app = cache[custom];
        api.ua = (typeof custom === 'string') ? custom : _ua;

        if (!cache.hasOwnProperty(custom)) {
            update();
            if (!cache[api.ua]) {
                cache[api.ua] = api;
            }
            app = cache[api.ua];
        }
        return app;
    };
}(this));
