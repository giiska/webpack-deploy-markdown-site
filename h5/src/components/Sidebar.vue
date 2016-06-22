<template>
<div class="sidebar">
  <div class="">
    <ul class="post-list ui-list-unstyled">
      <li v-for="p in posts">
        <a @click="goItem(p)" v-link="{name: 'post-detail', params:{detailId: p.fileName}}">{{p.title}}</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import _lodash from 'lodash';

export default {
  props: {
      showCategoryPanel: {
          type: Boolean
      }
  },
  data() {
    return {
      posts: window.Store.posts
    }
  },
  watch: {
    showCategoryPanel: function(val) {
      this.toggleSidePanel(val)
    }
  },
  methods: {
    goItem(p) {
      this.$set('showCategoryPanel', false)
      // this.$route.router.go({name: 'post-detail', params:{detailId: p.fileName}})
    },
    toggleSidePanel(flag) {
        if(!window.Store.isResponsiveMax600px())
            return
        if(flag)
          this.$el.classList.add('s-open')
        else
          this.$el.classList.remove('s-open')
    }
  },
  ready() {
    window.eventBus.emit('stopPropagation', this.$el)
  }
}
</script>


<style lang="less">
.sidebar {
  position: absolute;
  left: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fafafa;
  border-right: 1px solid rgba(0,0,0,.07);
  transition: transform .1s ease-out;
  transform: translateX(-800px);
  width: 100%;
  z-index: 2;

  &.s-open {
    transform: translateX(0);
  }
}
.post-list li a {
  display: block;
  color: #444;
  padding: 10px;
}
.post-list li a.s-current {
  color: #aaa;
}
.post-list li a:hover {
  background-color: #eee;
}
</style>

