$(function() {
  
  // 效果插件, IFR.scrollTo 依赖
  $.extend($.easing, {
    easeInOutExpo: function (a, c, d, b, e) {
      if (c === 0) return d;
      if (c === e) return d + b;
      if ((c /= e / 2) < 1) return b / 2 * Math.pow(2, 10 * (c - 1)) + d;
      return b / 2 * (-Math.pow(2, - 10 * --c) + 2) + d
    }
  });

  // scroll to position or particular elenment
  window.scrollTo = function(to, typeOrSpeed, callback) {
    var scrollParam;
    // if jquery object
    if (to.jquery && to.length) {
      to = to.offset().top;
    } else if ($(to).length) {
      to = $(to).offset().top;
    }
    if (typeof to !== 'number') {
      return false;
    }

    if (typeOrSpeed == 'smooth') {
      scrollParam = {
        queue: !1,
        duration: 800,
        easing: "easeInOutExpo",
        complete: callback
      }
    }
    if (typeof typeOrSpeed === 'number') {
      scrollParam = typeOrSpeed;
    }
    if (!scrollParam)
      scrollParam = 0;

    $('html,body').animate({
      scrollTop: to
    }, scrollParam);
  },

  window.smoothScrollTo = function(to, cb) {
    window.scrollTo(to, 'smooth', cb);
  }

})