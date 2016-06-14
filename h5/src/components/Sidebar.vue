<template>
<div class="sidebar">
  <div class="">
    <ul class="post-list ui-list-unstyled">
      <li v-for="p in posts">
        <a v-link="{name: 'post-detail', params:{detailId: p.fileName}}">{{p.title}}</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import _lodash from 'lodash';
import Db from 'clientData';
export default {
  data() {
    return {
      posts: Db
    }
  },
  methods: {
    scrollSidebar() {
      console.log('sdf')
    }
  },
  ready() {
    // this.$nextTick(() => {
    //   this.$el.addEventListener('scroll', this.scrollSidebar, false);
    // })
  }
}
</script>


<style lang="less">
.sidebar {
  position: absolute;
  width: 300px;
  left: 0;
  height: 100%;
  overflow-y: auto;
  background: #fafafa;
  border-right: 1px solid rgba(0,0,0,.07);
}
.post-list li {
  margin-bottom: 5px;
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

