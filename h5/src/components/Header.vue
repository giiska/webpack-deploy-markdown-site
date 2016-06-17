<template>
  <div class="header">
    <div class="header-inner app1-1080px ui-clearfix">
      <div class="ui-fl-l">
        <ul class="header-nav">
          <li class="">
            <a class="app1-option"
                @click="openCategoryPanel"
                :class="{
                    's-show': showOptionBtn
                }"
                >选项</a>
          </li>
          <li class="">
            <a class="header-link"
            v-link="{name: 'home', exact: true}"
            >
              首页
            </a>
          </li>
          <li class="">
            <a class="header-link"
            href="javascript:void(0);"
            >
              搜索
            </a>
          </li>
          <li class="">
            <a class="header-link"
            v-link="{name: 'contact', exact: true}"
            >
              联系我
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import Search from './Search.vue';

export default {
    // components: {
    //     Search
    // },
    props: {
        showOptionBtn: {
            type: Boolean
        }
    },
    methods: {
        openCategoryPanel() {
            window.eventBus.emit('toggleSidePanel', true)
        }
    }
}
</script>

<style lang="less">
  @import "../assets/less/lib-var.less";
  @import "../assets/less/lib-mixins.less";
  .header{
    position: relative;
    z-index: 1;
    width: 100%;
    height: @app1-header-height;
    line-height: @app1-header-height;

    &.s-fixed{
      position: fixed;
      top: 0;
      left: 0;
      height: 110px;
      line-height: 110px;
      background: #fff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      border-bottom: 1px solid #eee;

      .header-inner{
        h1{
          margin-top: 37px;
        }
      }

      .header-link{
        &:hover{
           color: #505050;
         }
        &.s-current{
           color: #aaa;
         }
      }
    }
  }

  /* home view header no background */
  .header.s-home {
    background: none
  }

  .header-inner{
    height: 100%;

    h1{
      float: left;
      margin-top: 49px;
      width: 157px;
      height: 35px;
      overflow: hidden;

      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .header-nav{
    display: inline-block;
    font-size: 14px;
    list-style: none;
  }
  .header-nav li {
    display: inline-block;
    color: #979aa2;

  }
  .header-link{
    padding-right: 36px;
    display: inline-block;
    color: inherit;
    .transition(.3s ease all);

    &:hover{
       color: #d8d8d8;
     }
    &.s-current{
       color: #aaa;
       font-weight: bold;
     }
  }


.app1-option {
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: url('data:image/svg+xml;charset=utf-8,<svg width="32" height="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.03125, 0.03125)"><path d="M64.271816 895.910717l0-83.948971 895.456369 0 0 83.948971L64.271816 895.910717zM64.271816 470.025003l895.456369 0 0 83.948971L64.271816 553.973974 64.271816 470.025003zM64.271816 128.089283l895.456369 0 0 83.948971L64.271816 212.038254 64.271816 128.089283z" fill="#a9b7b7"></path></g></g></svg>');
    // background-image: url(../assets/images/option.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    text-indent: -9000em;
    z-index: 9;
    position: fixed;
    top: 10px;
    right: 10px;
    // background-image: url(../assets/images/icon-close.png);
    background-size: 17px 17px;
    background-color: #e0e1e4;
    display: none;

    &.s-show {
        display: block;
    }
}
</style>

