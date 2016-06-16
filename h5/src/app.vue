
<template>
    <div class="app1">
        <sidebar v-ref:sidebar v-el:sidebar></sidebar>
        <div class="page-body" v-el:body>
            <page-header
                v-ref:header-bar
                :show-category-panel.sync="showCategoryPanel">    
            </page-header>
            <div class="app1-router-view">
                <router-view></router-view>
            </div>
            <page-footer></page-footer>
        </div>
        <!-- <back-to-top v-ref:backtop></back-to-top> -->
    </div>

</template>


<script>
import Sidebar from './components/Sidebar.vue';
import PageHeader from './components/Header.vue';
import PageFooter from './components/Footer.vue';
// import BackToTop from "./lib/back-to-top/BackToTop.vue";
import Db from 'clientData';

// 放到所有 .vue 文件后面，防止 .vue 文件提取出来的样式影响全局样式
import "./assets/less/app1.less";

export default {
    components: {
         Sidebar,
         PageHeader,
         PageFooter
         // ,
         // BackToTop
    },
    data() {
        return {
            showCategoryPanel: true
        }
    },
    methods: {
        bodyScrollTop(value) {
            this.$els.body.scrollTop = value
        }
    },
    watch: {
        '$route'() {
            this.bodyScrollTop(0)
            // console.log('route change')
        }
    },
    ready() {
        window.eventBus.on('resetScrollTop', this.bodyScrollTop)
        // setTimeout(() => {
        //     this.$refs.backtop.init()
        // }, 0)
    }
}
</script>

<style lang="less">
.app1 {
    position: relative;
    height: 100%;
}
.app1.s-bgcolor_f2f3f5 {
    background-color: #f2f3f5;
}
/* 全局统一加 padding */
.app1.s-fixed-header {
    padding-top: 133px;
}
.app1-router-view {
    min-height: 400px;
    margin: 30px;
}
.app1-view {
    margin-top: 50px;
    transition: all .1s ease;
}
.app1-view.s-no-show-header-bar {
    margin-top: 0;
}
.app1-layout-enter, .app1-layout-leave {
    opacity: 0;
    transform: translate3d(10px, 0, 0);
}
.app1-1080px {
    margin: 0 30px;
}

.page-body {
    position: absolute;
    left: 300px;
    right: 0;
    bottom: 0;
    height: 100%;
    overflow-y: auto;
}
</style>