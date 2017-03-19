<template>
<div class="app1-learn-detail-markdown" v-html="content">{{content}}</div>
</template>

<script>
import loadAllImages from 'bm-load-image';
import eventBus from '../../eventBus'
import './index.scss'
const windowHref = location.href
const windowHrefWithoutHash = windowHref.replace(location.hash, '')
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    methods: {
        onLoadImgs(cb) {
            const imgList = this.$el.querySelectorAll('img')
            let imgurlList = []
            let imgLength = imgList.length;

            if(!imgLength) {
                cb()
            }
            while (imgLength--){
                imgurlList.push(imgList[imgLength].getAttribute('src'))
            }

            loadAllImages(imgurlList, null, () => {
                cb()
            })
        },
        gotoHashTitle(hashTitle) {
            const titleMin = 2
            const titleMax = 6
            const testHashTitle = (titleType) => {
                const headers = this.$el.querySelectorAll(titleType)
                let headerLength = headers.length

                while (headerLength--) {
                    if(headers[headerLength].textContent === hashTitle){
                        this.onLoadImgs(() => {
                            console.log('headers[headerLength].offsetTop', headers[headerLength].offsetTop)
                            eventBus.emit('resetScrollTop', headers[headerLength].offsetTop)
                        })
                        break;
                    }
                }
            }
            for (var i = titleMax; i >= titleMin; i--) {
                testHashTitle('h' + i)
            }
        }
    },
    watch: {
        content() {
            // bind event to anchor
            const links = this.$el.querySelectorAll('a');
            const _this = this
            links.forEach((link) => {
                const thisHref = link.href.replace(windowHrefWithoutHash, '')
                if(thisHref && thisHref.indexOf('http') > -1) {
                    link.setAttribute('target', '_blank');
                }
                link.addEventListener('click', (e) => {
                    if(thisHref.indexOf('http') > -1) {
                        // if(thisHref.match(/https*:\/\/mp\.weixin\.qq\.com.*/)) {
                        // }
                    }
                    // goto hash
                    else {
                        const hash = link.hash.slice(1)
                        if(hash) {
                            // check name link first
                            const target = _this.$el.querySelector('a[name=' + hash + ']')
                            if(target)
                                target.scrollIntoView()
                            // otherwise, check h2-h6 title
                            else {
                                const hashText = decodeURIComponent(hash)
                                console.log('hashText', hashText)
                                this.gotoHashTitle(hashText)
                            }
                        }
                        e.stopPropagation()
                        e.preventDefault()
                    }
                })
            })

            this.$nextTick(function () {
                var Prism = require("prismjs")
                require("prismjs/components/prism-json");
                require("prismjs/components/prism-bash");
                Prism.highlightAll()
                // this.$root.initBackTop()
            })
        }
    }
    // ,
    // beforeDestroy() {
    //     this.$root.destroyBackTop()
    // }

}
</script>
<style lang="less">
.page-title {
    margin: 0 0 1.8em 0;
    font-size: 20px;
    line-height: 59px;
    color: #8d8d8d;
    border-bottom: 1px solid #e7e7eb;
}

.menu_primary_link {
    padding-top: 10px;
    border-top: 1px solid #e7e7eb;
}

.page_title_secondary {
    strong {
        color: #222;
    }

    margin-left: 20px;
    padding-top: 0;
    border-top: none;
}

.app1-learn-detail-markdown {
    margin-bottom: 50px;
    font: 400 14px/1.62 "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "微软雅黑", sans-serif;
    color: #444;
}
</style>

