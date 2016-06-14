<template>
  <a id="go-top" @click="toTop" class="back-to-top" v-show="show" href="javascript:void(0)"></a>
</template>


<script>

export default {
  data() {
    return {
      goTopOldBottom: 0,
      adjustedBottom: 0,
      inited: false,
      show: false
    }
  },
  methods: {
    toTop() {
      window.smoothScrollTo(0);
    },
    bindEvents() {
      this.inited = true
      
      const $goTop = $(this.$el)
      const goTopOldBottom = parseInt($goTop.css('bottom'), 10)
      this.$set('goTopOldBottom', goTopOldBottom)

      const $footer = $('#footer-zone')
      const footerHeight = $footer.outerHeight()
      const adjustedBottom = goTopOldBottom + footerHeight
      this.$set('adjustedBottom', adjustedBottom)

      const adjustPosition = () => {

        let reachFooter = document.documentElement.clientHeight + window.pageYOffset > $footer[0].offsetTop
        // console.log('reachFooter', $footer[0].offsetTop, reachFooter)

        if (reachFooter) {
          $(this.$el).addClass('go-top-adjusted').css({
            position: 'absolute',
            bottom: this.adjustedBottom
          });
          return;
        }
        else {
          if ($(this.$el).hasClass('go-top-adjusted'))
            this.reset()

          else {
            // console.log('obj.offset().top', $(this.$el).offset().top, 900 < $(this.$el).offset().top ? true : false)
            this.$set('show', 900 < $(this.$el).offset().top ? true : false);

          }
        }
      }

      const $window = $(window)
      let resizeDelay = null
      let scrollDelay = null

      $window.on('scroll.back-to-top', () => {
        clearTimeout(scrollDelay);
        scrollDelay = setTimeout(adjustPosition, 0);
      });
    },
    reset() {
        // console.log('oldBottom', this.goTopOldBottom);
        this.$set('show', false)
        $(this.$el)
          .css({
            position: 'fixed',
            bottom: this.goTopOldBottom
          })
          .removeClass('go-top-adjusted');
    },
    init() {
      if(!this.inited)
        this.bindEvents()
    },
    destroy() {
      if(this.inited) {
        this.inited = false
        $(window).off('.back-to-top')
        this.reset()
      }
    }
  }
}

</script>

<style>

.back-to-top {
    background-image: url(./back-top.png);
    width: 54px;
    height: 54px;
    position: fixed;
    right: 50px;
    bottom: 72px;
}

</style>