/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @fileOverview Tool for set objects rectilinear uniform motion.
 * @license The MIT License (MIT)
 * @requires {@link http://underscorejs.org/|Underscore.js} or {@link http://lodash.com/|Lo-Dash}
 * @requires {@link http://jquery.com/|jQuery.js} or {@link http://zeptojs.com/|Zepto.js}
 */
/*jslint nomen: true, indent: 4, vars: true, white: true */
/*global _, $, requestAnimationFrame */
(function (global) {
    'use strict';

    /**
     * @class UniformMotion
     * @constructor
     * @param {HTMLElement} wrapper
     * @param {Object} options
     * @type {Function}
     */
    function UniformMotion(wrapper, options) {
        this._elms = {};
        this._options = _.extend({
            'limit-x': global.innerWidth,
            'limit-y': global.innerHeight
        }, options);
        this.initialize(wrapper);
    }

    /**
     * @memberOf UniformMotion
     * @method
     */
    UniformMotion.prototype.initialize = function (wrapper) {
        var self = this;
        $(wrapper).find('.motion').each(function () {
            var uid = _.uniqueId('item_');
            var $this = $(this);
            var attributes = {
                'height': $this.height(),
                'width': $this.width(),
                'dir': +$this.attr('data-move'),
                'speed': +$this.attr('data-speed'),
                'limit-x': +$this.attr('data-limit-x') || 0,
                'limit-y': +$this.attr('data-limit-y') || 0,
                'use-to-move': {},
                'due-to': {}
            };

            var _$useToMove = $this.attr('data-use-to-move');
            var _$dueTo = $this.attr('data-due-to');

            attributes['use-to-move'][_$useToMove] = parseInt($this.css(_$useToMove), 10);
            attributes['due-to'][_$dueTo] = parseInt($this.css(_$dueTo), 10);

            self._setMotion(self._elms[uid] = {
                _id: uid,
                node: this,
                attributes: attributes
            });
        });
    };

    /**
     * @memberOf UniformMotion
     * @method
     * @param {Object} item
     */
    UniformMotion.prototype._setMotion = function (item) {
        var self = this;

        var _style = item.node.style;
        var _attrs = item.attributes;

        var dir = _attrs.dir;
        var speed = _attrs.speed;
        var useToMove = _attrs['use-to-move'];
        var useToMoveKey = _.first(_.keys(useToMove));

        var dueTo = _attrs['due-to'];
        var dueToKey = _.first(_.keys(dueTo));
        var dueToVal = _.first(_.values(dueTo));

        _style[useToMoveKey] = 'auto';
        _style[dueToKey] = 'auto';

        var render = function () {
            // get movable value
            var useToMoveVal = _.first(_.values(useToMove));
            // calculate
            var transformOptions = [(useToMoveVal) + 'px', dueToVal + 'px'];
            if (useToMoveKey === 'top') {
                transformOptions = transformOptions.reverse();
            }
            var transformValue = 'translate(' + transformOptions.join(', ') + ')';
            // apply
            _style.webkitTransform = transformValue;
            _style.mozTransform = transformValue;
            _style.msTransform = transformValue;
            _style.oTransform = transformValue;
            _style.transform = transformValue;
            // append speed
            _attrs['use-to-move'][useToMoveKey] = useToMoveVal + (dir * speed);

            self._checkLimits(item);
        };

        (function loop() {
            requestAnimationFrame(loop);
            render();
        }());
    };

    /**
     * @memberOf UniformMotion
     * @method
     * @param {Object} item
     * @private
     */
    UniformMotion.prototype._checkLimits = function (item) {
        var _attrs = item.attributes;

        var dir = _attrs.dir;
        var _localLimitX = _attrs['limit-x'];
        var _localLimitY = _attrs['limit-y'];

        var useToMove = _attrs['use-to-move'];
        var useToMoveKey = _.first(_.keys(useToMove));
        var useToMoveVal = _.first(_.values(useToMove));

        var width = _attrs.width;
        var height = _attrs.height;
        var isRunningRight = (dir === 1 && useToMoveKey === 'left');
        var isRunningLeft = (dir === -1 && useToMoveKey === 'left');
        var isRunningTop = (dir === -1 && useToMoveKey === 'top');
        var isRunningBottom = (dir === 1 && useToMoveKey === 'top');

        // running to right
        if (isRunningRight) {
            if (this._options['limit-x'] - _localLimitX < useToMoveVal) {
                _attrs['use-to-move'][useToMoveKey] = (-1) * width;
            }
        } else

        // running to left
        if (isRunningLeft) {
            if ((-1) * width > useToMoveVal - _localLimitX) {
                _attrs['use-to-move'][useToMoveKey] = this._options['limit-x'];
            }
        } else

        // running to top
        if (isRunningTop) {
            if (useToMoveVal - _localLimitY < (-1) * height) {
                _attrs['use-to-move'][useToMoveKey] = this._options['limit-y'];
            }
        } else

        // running to bottom
        if (isRunningBottom) {
            if (useToMoveVal > this._options['limit-y']- _localLimitY) {
                _attrs['use-to-move'][useToMoveKey] = (-1) * height;
            }
        } else {
            throw new Error('unexpected direction');
        }
    };

    // exports
    global.UniformMotion = UniformMotion;

}(this));
