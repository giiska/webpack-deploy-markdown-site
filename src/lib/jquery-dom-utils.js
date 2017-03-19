
// 魅族不支持 requestAnimationFrame
// 必须在某些用到 requestAnimationFrame 的插件加载前加载
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame || function fakeRequestAnimationFrame(cb, t) {
  setTimeout(cb, t || 1)
}

+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  $.fn.removeClassPrefix = function (prefix) {
      this.each( function ( i, it ) {
          var classes = it.className.split(" ").map(function (item) {
             return item.indexOf(prefix) === 0 ? "" : item;
          });
          it.className = classes.join(" ");
      });

      return this;
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.transitionEnd = function (cb, duration) {
    var called = false
      , el = this
      ;

    cb && (cb = $.proxy(cb, el));

    $(this).one($.support.transition.end, function () {
      called = true;
      cb && cb();
    })
    var callback = function () { if (!called) $(el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $.fn.classAnimoEnd = function(cls, cb, lastItemCb) {
    var el = this;

    cb && (cb = $.proxy(cb, el));

    var count = $(el).length;

    $(el)
      .removeClass(cls)
      .one($.support.animate.end, function () {
        // console.log('end');
        cb && cb();
        // $(el).removeClass('animated');

        if(count > 1) {
          count --;
          // console.log(count);
          if(count === 0)
            lastItemCb && lastItemCb();
        }
      })

    // 必须延迟一点才有效
    requestAnimationFrame(function() {
      $(el)
        .addClass(cls)

      if(el.length) {
        var elo = el[0];
        if(elo.style.display === 'none')
          elo.style.display = 'block';
      }
    })


    return this;
  }

  $.support.transition = transitionEnd()
  $.support.animate = {
    end: 'webkitAnimationEnd animationend'
  }


  $.fn.isDisNone = function () {
    return  this.style.display === 'none';
  }

  $.fn.disBlock = function () {
      this.each( function ( i, it ) {
          it.style.display = 'block';
      });

      return this;
  }
  $.fn.disNone = function () {
      this.each( function ( i, it ) {
          it.style.display = 'none';
      });

      return this;
  }
  $.fn.clsShow = function () {
      $(this).removeClass('hide')
      return this;
  }
  $.fn.clsHide = function () {
      $(this).addClass('hide')

      return this;
  }
  $.fn.sWidth = function (n) {

      this.each( function ( i, it ) {
          it.style.width = n + 'px';
      });
      return this;
  }
  $.fn.sHeight = function (n) {

      this.each( function ( i, it ) {
          it.style.height = n + 'px';
      });
      return this;
  }
  $.fn.sWTransX = function (n) {

      this.each( function ( i, it ) {
          it.style.webkitTransform = 'translateX(' + n + 'px)';
      });
      return this;
  }
  $.fn.sWTransY = function (n) {

      this.each( function ( i, it ) {
          it.style.webkitTransform = 'translateY(' + n + 'px)';
      });
      return this;
  }
  $.fn.sWTransDuration = function (n) {
    n = n ? (n + 'ms') : ''
      this.each( function ( i, it ) {
          it.style.webkitTransitionDuration = n
      });
      return this;
  }
  $.fn.sScaleY = function (n) {

      this.each( function ( i, it ) {
          it.style.webkitTransform = 'scaleY(' + n + ')';
      });
      return this;
  }
  $.fn.sRotate = function (n) {

      this.each( function ( i, it ) {
          it.style.webkitTransform = 'rotateZ(' + n + 'deg)';
      });
      return this;
  }
  $.fn.sHtml = function (n) {

      this.each( function ( i, it ) {
          it.innerHTML = n
      });
      return this;
  }

}(window.$);