<template>
  <div class="header">
    <div class="header-inner app1-1080px ui-clearfix">
      <div class="ui-fl-l">
        <ul class="header-nav">
          <li class="header-list">
            <a class="header-link"
            v-link="{name: 'home', exact: true}"
            >
              首页
            </a>
          </li>
          <li class="header-list">
            <a class="header-link"
            href="javascript:void(0);"
            >
              搜索
            </a>
          </li>
          <li class="header-list">
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
<style lang="less">
  @import "../assets/less/lib-var.less";
  @import "../assets/less/lib-mixins.less";
  .header{
    position: relative;
    z-index: 100;
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
  .header-access{
    display: inline-block;
    margin-top: 37px;
    width: 120px;
    height: 35px;
    font-size: 14px;
    line-height: 33px;
    color: #00c800;
    text-align: center;
    border: 1px solid #00c800;
    border-radius: 4px;
    letter-spacing: 1px;
    .transition(.3s ease all);

    &:hover{
      background: #00c800;
      color: #fff;
     }
  }
  .header-nav{
    display: inline-block;
    font-size: 14px;
    list-style: none;
  }
  .header-list{
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
</style>

