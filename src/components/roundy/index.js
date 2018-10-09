import React, { Component } from 'react';
import styled from 'styled-components';
import { Wrapper } from './Style';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEGREE_IN_RADIANS = Math.PI / 180;
var classNamePrefix = 'RoundSlider';

var prevClick, prevEX, prevEY = 0;

var Roundy = function (_Component) {
  _inherits(Roundy, _Component);

  function Roundy(props) {
    _classCallCheck(this, Roundy);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.up = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this._svgElement.style.pointerEvents = 'none';
      _this.allowChange = false;
      _this.isDrag = false;
      _this.touches = []; // clear touches
      _this.props.onAfterChange && _this.props.onAfterChange(_this.value, _this.props);
    };

    _this.getTouchMove = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (_this.allowChange || _this.isDrag) {
        var idx = 0;
        for (var index = 0; index < e.changedTouches.length; index++) {
          var t = e.changedTouches[index];
          if (t.identifier >= 0) {
            _this.touches = [t];
            _this.updateValue(_this.touches[idx]);
          }
        }
      }
    };

    _this.down = function (e) {
      let arc = window.document.getElementById('arc');
      let rect = arc.children[1].getBoundingClientRect();
      let turnOn = false;

      _this._svgElement.style.pointerEvents = 'auto';
      e.stopPropagation();

      if(turnOn === true) {
        if ((prevEX > (rect.right + 30) || prevEX < (rect.right - 30)) || (prevEY > (rect.top + 30) || prevEY < (rect.top - 30))) {e.preventDefualt;return;}
      }  
        else {turnOn = true;}

      _this.isDrag = true;
      _this.allowChange = true;
      if (e.changedTouches) {
        var _this$touches;

        (_this$touches = _this.touches).push.apply(_this$touches, e.changedTouches);
        }
      };

    _this.valueToAngle = function (value) {
      var _this$props = _this.props,
          max = _this$props.max,
          min = _this$props.min;

      var angle = (value - min) / (max - min) * 359.9999;
      return angle;
    };

    _this.getArc = function (value) {
      var _this$props2 = _this.props,
          max = _this$props2.max,
          min = _this$props2.min,
          radius = _this$props2.radius,
          strokeWidth = _this$props2.strokeWidth;

      var angle = _this.valueToAngle(value);
      var pathRadius = radius - strokeWidth / 2;
      var start = _this.polarToCartesian({
        radius: radius,
        pathRadius: pathRadius,
        angle: angle
      });
      var end = _this.polarToCartesian({
        radius: radius,
        pathRadius: pathRadius,
        angle: 0
      });
      var arcSweep = angle <= 180 ? 0 : 1;

      return 'M ' + start + ' A ' + pathRadius + ' ' + pathRadius + ' 0 ' + arcSweep + ' 0 ' + end;
    };

    _this.limitValue = function (value) {
      var _this$props3 = _this.props,
          min = _this$props3.min,
          max = _this$props3.max;

      if (value < min) value = min;
      if (value > max) value = max;
      return value;
    };

    _this.angleToValue = function (angle) {
      var _this$props4 = _this.props,
          min = _this$props4.min,
          max = _this$props4.max;

      var v = angle / 360 * (max - min) + min;
      return v;
    };

    _this.valueToAngle = function (value) {
      var _this$props5 = _this.props,
          max = _this$props5.max,
          min = _this$props5.min;

      var angle = (value - min) / (max - min) * 359.9999;
      return angle;
    };

    _this.updateValue = function (event, forceSet) {
      let target = window.document.getElementById('inputReadout');
      let arc = window.document.getElementById('arc');
      let targetValue = target.getAttribute("value");

      let rect = arc.children[1].getBoundingClientRect();

      if (!_this.isDrag && !forceSet) return;

      var eX = 0,
          eY = 0;
      var clientX = event.clientX,
          clientY = event.clientY;

      eX = clientX;
      eY = clientY;

      if ((eX > (rect.right + 30) || eX < (rect.right - 30)) || (eY > (rect.top + 30) || eY < (rect.top - 30))) {return;}
      if ((targetValue >79 && prevEY < eY) || (targetValue < 61 && prevEX > eX)) {return;}

      prevEY = eY;
      prevEX = eX;

      var _this$getCenter = _this.getCenter(),
          left = _this$getCenter.left,
          top = _this$getCenter.top;

      var x = eX - left,
          y = eY - top;

      var _this$stepRounding = _this.stepRounding(_this.angle(y, x)),
          value = _this$stepRounding.value,
          angle = _this$stepRounding.angle;

      _this.setState({ value: value });
      _this.props.onChange && _this.props.onChange(value, _this.props);
    };

    _this.state = {
      value: props.value
    };
    _this.uniqueId = Math.floor(Math.random() * 100) + Date.now();
    _this.touches = [];
    _this.allowChange = false;
    _this.isDrag = false;
    return _this;
  }

  Roundy.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.state.value !== props.value) {
      this.setState({ value: props.value });
    }
  };

  Roundy.prototype.polarToCartesian = function polarToCartesian(_ref) {
    var pathRadius = _ref.pathRadius,
        angle = _ref.angle,
        radius = _ref.radius;

    var angleInRadians = (angle - 90) * DEGREE_IN_RADIANS;
    var x = radius + pathRadius * Math.cos(angleInRadians);
    var y = radius + pathRadius * Math.sin(angleInRadians);

    return x + ' ' + y;
  };

  Roundy.prototype.getCenter = function getCenter() {
    var rect = this._svgElement.getBoundingClientRect();
    return {
      top: rect.top + this.props.radius,
      left: rect.left + this.props.radius
    };
  };

  Roundy.prototype.radToDeg = function radToDeg(rad) {
    return rad * (180 / Math.PI);
  };

  Roundy.prototype.angle = function angle(y, x) {
    var angle = this.radToDeg(Math.atan2(y, x));
    if (angle < 0 && x < 0) angle += 360;
    return angle + 90;
  };

  Roundy.prototype.stepRounding = function stepRounding(degree) {
    var _props = this.props,
        step = _props.step,
        min = _props.min,
        max = _props.max;

    var value = this.angleToValue(degree);
    var remain = void 0,
        currVal = void 0,
        nextVal = void 0,
        preVal = void 0,
        val = void 0,
        ang = void 0;
    remain = (value - min) % step;
    currVal = value - remain;
    nextVal = this.limitValue(currVal + step);
    preVal = this.limitValue(currVal - step);

    if (value >= currVal) val = value - currVal < nextVal - value ? currVal : nextVal;else val = currVal - value > value - preVal ? currVal : preVal;
    val = Math.round(val);
    ang = this.valueToAngle(val);
    return { value: val, angle: ang };
  };

  Roundy.prototype.clamp = function clamp(angle) {
    return Math.max(0, Math.min(angle || 0, this.props.max));
  };

  // CODE THAT CAME WITH IMPORTED MODULE - APP WONT RUN IF IT'S ENABLED
  /* Roundy.prototype.calcOffset = function calcOffset() {
    var _RoundSlider$options = RoundSlider.options,
        max = _RoundSlider$options.max,
        radius = _RoundSlider$options.radius,
        strokeWidth = _RoundSlider$options.strokeWidth,
        value = _RoundSlider$options.value;

    var r = radius - strokeWidth;
    var c = Math.PI * r * 2;
    var offset = (1 - value / max) * c;
    return offset;
  };
  */

  Roundy.prototype.getMaskLine = function getMaskLine(_ref2) {
    var radius = _ref2.radius,
        segments = _ref2.segments,
        index = _ref2.index;

    return React.createElement('line', {
      key: index,
      x1: radius,
      y1: radius,
      x2: radius * 2,
      y2: radius,
      style: {
        stroke: 'rgb(0,0,0)',
        strokeWidth: 2,
        transform: 'rotate(' + (360 / segments * index - 90) + 'deg)',
        transformOrigin: '50% 50%'
      }
    });
  };

  Roundy.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        color = _props2.color,
        bgColor = _props2.bgColor,
        max = _props2.max,
        min = _props2.min,
        step = _props2.step,
        strokeWidth = _props2.strokeWidth,
        thumbSize = _props2.thumbSize,
        radius = _props2.radius,
        sliced = _props2.sliced,
        rest = _objectWithoutProperties(_props2, ['color', 'bgColor', 'max', 'min', 'step', 'strokeWidth', 'thumbSize', 'radius', 'sliced']);

    var value = this.state.value;

    var segments = Math.floor((max - min) / step);
    var maskName = classNamePrefix + '_' + this.uniqueId;
    return React.createElement(
      Wrapper,
      _extends({
        strokeWidth: strokeWidth,
        thumbSize: thumbSize,
        onMouseMove: function onMouseMove(e) {
          return _this2.allowChange && _this2.updateValue(e, true);
        },
        onMouseUp: this.up,
        onTouchMove: this.getTouchMove,
        onTouchEnd: this.up,
        onTouchCancel: this.up
      }, rest),
      React.createElement(
        'svg',
        {
          ref: function ref(el) {
            return _this2._svgElement = el;
          },
          width: radius * 2,
          height: radius * 2
        },
        sliced && React.createElement(
          'defs',
          null,
          React.createElement(
            'mask',
            { id: maskName },
            React.createElement('rect', {
              x: '0',
              y: '0',
              width: radius * 2,
              height: radius * 2,
              fill: 'white'
            }),
            step && Array(segments).fill().map(function (e, i) {
              return _this2.getMaskLine({ segments: segments, radius: radius, index: i });
            })
          )
        ),
        React.createElement('circle', {
          cx: radius,
          cy: radius,
          r: radius - strokeWidth / 2,
          fill: 'transparent',
          strokeDashoffset: '0',
          strokeWidth: strokeWidth,
          stroke: bgColor,
          mask: 'url(#' + maskName + ')'
        }),
        React.createElement('path', {
          fill: 'none',
          strokeWidth: strokeWidth,
          stroke: color,
          d: this.getArc(value)
        })
      ),
      React.createElement('div', {
        ref: function ref(el) {
          return _this2._handle = el;
        },
        className: 'sliderHandle',
        onMouseDown: this.down,
        onTouchStart: this.down,
        onMouseUp: this.up,
        style: {
          transform: 'rotate(' + (this.valueToAngle(value) - 90) + 'deg)'
        }
      })
    );
  };

  return Roundy;
}(Component);

Roundy.defaultProps = {
  color: 'purple',
  bgColor: '#ccc',
  max: 100,
  min: 0,
  step: 10,
  thumbSize: 20,
  sliced: true,
  strokeWidth: 35,
  value: 50, // so we can see some difference
  radius: 100
};
export default Roundy;