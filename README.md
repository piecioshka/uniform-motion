uniform-motion
==============

Rectilinear Uniform Motion to object with `CSS3` transform: `translate()`.

API
===

For use this helper must add special attributes in `html` and `*.js`.

At first add attribute for item which has to moving.

```html
<span class="motion"
      data-move="-1"
      data-use-to-move="top"
      data-due-to="left"
      data-speed="1"></span>
```

Available attributes:
- `data-move` - what mean attr `data-use-to-move` will be grow (for `1`) otherwise decrease (for `-1`).
- `data-use-to-move` - direction and CSS property what is define. Available: `top`, `right`, `bottom`, `left`.
- `data-due-to` - CSS property along animation will be set
- `data-speed` - speedy of animation, range: `0` to `1` - you can use float.
- `data-limit-x` - offset before disappear with border in `X` axis.
- `data-limit-y` - offset before disappear with border in `Y` axis.

---

After that in JavaScript code you must create instance of `UniformMotion`.
Some options are available.

```javascript
new UniformMotion(/* HTMLElement, options */);
```

- `HTMLElement` - where tool should searching items with `.motion`.
- `options` - configuration:
 - `limit-x` - limit from on `X` axis ( *default:* window width )
 - `limit-y`  - limit from on `Y` axis ( *default:* window height )

License
=======

[The MIT License][1]


[1]: https://github.com/piecioshka/uniform-motion/blob/master/LICENSE