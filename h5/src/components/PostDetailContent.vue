<template>
<div class="app1-learn-detail-markdown">
    {{{content}}}
</div>
</template>

<script>
import _lodash from 'lodash';
import loadAllImages from 'bm-load-image';
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
                            window.eventBus.emit('resetScrollTop', headers[headerLength].offsetTop)
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
            _lodash.forEach(links, (link) => {
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
@import "../assets/less/lib-var.less";
@import "../assets/less/lib-mixins.less";

.app1-learn-detail-markdown {
    margin-bottom: 50px;
}

.app1-learn-detail-markdown {
    font: 400 14px/1.62 "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "微软雅黑", sans-serif;
    color: #444;
}

.app1-learn-detail-markdown ::-moz-selection {
    background-color: rgba(0, 0, 0, 0.2);
}

.app1-learn-detail-markdown ::selection {
    background-color: rgba(0, 0, 0, 0.2);
}

.app1-learn-detail-markdown h1,
.app1-learn-detail-markdown h2,
.app1-learn-detail-markdown h3,
.app1-learn-detail-markdown h4,
.app1-learn-detail-markdown h5,
.app1-learn-detail-markdown h6 {
    font-family: "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "SimSun", sans-serif;
    color: #222;
}
.app1-learn-detail-markdown h4{
    font-weight: bold;
}
.page-title {
    margin: 0 0 1.8em 0;
    font-size: 20px;
    line-height: 59px;
    color: #8d8d8d;
    border-bottom: 1px solid #e7e7eb;
}
.menu_primary_link{
    padding-top: 10px;
    border-top: 1px solid #e7e7eb;
}
.page_title_secondary{
strong{
    color: #222;
}
margin-left: 20px;
padding-top: 0;
border-top: none;
}
.app1-learn-detail-markdown h2 {
    font-size: 1.5em;
    margin: 0.83em 0;
}

.app1-learn-detail-markdown h3 {
    font-size: 1.3em;
    line-height: 1.15em;
    height: 1.1em;
    margin: 40px 0 20px;
    font-weight: normal;
    border-left: 4px solid #44B549;
    padding-left: 10px;
}

.app1-learn-detail-markdown h4,
.app1-learn-detail-markdown h5,
.app1-learn-detail-markdown h6 {
    font-size: 1em;
    margin: 1.6em 0 1em 0;
}
.app1-learn-detail-markdown h4{
    margin: 1.6em 0 0 0;
}

.app1-learn-detail-markdown h6 {
    font-weight: 500;
}

.app1-learn-detail-markdown p {
    margin-top: 0;
    margin-bottom: 20px;
}

.app1-learn-detail-markdown a {
    word-wrap: break-word;
    -moz-text-decoration-color: rgba(0, 0, 0, 0.4);
    text-decoration-color: rgba(0, 0, 0, 0.4);
    text-decoration: underline;
}

.app1-learn-detail-markdown a:hover {
    color: #555;
    -moz-text-decoration-color: rgba(0, 0, 0, 0.6);
    text-decoration-color: rgba(0, 0, 0, 0.6);
}

.app1-learn-detail-markdown strong,
.app1-learn-detail-markdown b {
    font-weight: 600;
    color: #555;
}

.app1-learn-detail-markdown em,
.app1-learn-detail-markdown i {
    font-style: normal;
    color: gray;
}

.app1-learn-detail-markdown img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 24px;
}

.app1-learn-detail-markdown a img {
    /* Remove border on IE */
    border: none;
}

.app1-learn-detail-markdown figure {
    position: relative;
    clear: both;
    outline: 0;
    margin: 10px 0 30px;
    padding: 0;
}

.app1-learn-detail-markdown figure img {
    display: block;
    max-width: 100%;
    margin: auto auto 4px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.app1-learn-detail-markdown figure figcaption {
    position: relative;
    width: 100%;
    text-align: center;
    left: 0;
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    color: #666665;
}

.app1-learn-detail-markdown figure figcaption a {
    text-decoration: none;
    color: #666665;
}

.app1-learn-detail-markdown hr {
    display: block;
    width: 14%;
    margin: 40px auto 34px;
    border: 0 none;
    border-top: 3px solid #dededc;
}

.app1-learn-detail-markdown blockquote {
    margin: 0 0 1.64em 0;
    border-left: 3px solid #dadada;
    padding-left: 12px;
    color: #666664;
}
.app1-learn-detail-markdown ul,
.app1-learn-detail-markdown ol {
    margin: 0 0 24px 0;
    padding-left: 15px;
}

.app1-learn-detail-markdown ul {
    list-style-type: square;
}

.app1-learn-detail-markdown ol {
    list-style-type: decimal;
}

.app1-learn-detail-markdown li {
    margin-bottom: .6em;
}

.app1-learn-detail-markdown li ul,
.app1-learn-detail-markdown li ol {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 14px;
}

.app1-learn-detail-markdown li ul {
    list-style-type: disc;
}

.app1-learn-detail-markdown li ul ul {
    list-style-type: circle;
}

.app1-learn-detail-markdown li p {
    margin: 0.4em 0 0;
}

.app1-learn-detail-markdown .unstyled {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.app1-learn-detail-markdown code,
.app1-learn-detail-markdown tt {
    color: #808080;
    font-size: 0.96em;
    background-color: #f9f9f7;
    padding: 1px 2px;
    border: 1px solid #dadada;
    border-radius: 3px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    word-wrap: break-word;
}

.app1-learn-detail-markdown pre {
    margin: 0;
    padding: 7px 7px 7px 10px;
    border: none;
    overflow: auto;
    line-height: 1.5;
    font-size: 14px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace, "Microsoft YaHei";
    color: #4c4c4c;
    background: #f7f7f7;
    border-radius: 3px;
}

.app1-learn-detail-markdown pre code,
.app1-learn-detail-markdown pre tt {
    color: #4c4c4c;
    border: none;
    background: none;
    padding: 0;
}

.app1-learn-detail-markdown table {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 1.5em;
    font-size: 0.96em;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.app1-learn-detail-markdown th,
.app1-learn-detail-markdown td {
    text-align: left;
    padding: 4px 8px 4px 10px;
    border: 1px solid #dadada;
}

.app1-learn-detail-markdown td {
    vertical-align: top;
}

.app1-learn-detail-markdown iframe {
    display: block;
    max-width: 100%;
    margin-bottom: 30px;
}

.app1-learn-detail-markdown figure iframe {
    margin: auto;
}

.app1-learn-detail-markdown .highlight {
    overflow-x: auto;
}

.app1-learn-detail-markdown .highlight td {
    border: none;
    padding: 0;
}
.app1-learn-detail-markdown ol ol,
.app1-learn-detail-markdown ul ol{
    list-style-type: lower-roman;
}

.app1-learn-detail-markdown .highlight table {
    margin: 0;
}
.app1-learn-detail-markdown pre code {
    display: block;
    color: #4d4d4c;
    font-family: Menlo, Monaco, Consolas, monospace;
    line-height: 1.5;
    padding: 10px;
}
.app1-learn-detail-markdown {

    code[class*="language-"],
    pre[class*="language-"] {
        color: black;
        text-shadow: 0 1px white;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
        text-shadow: none;
    }

    pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
    code[class*="language-"]::selection, code[class*="language-"] ::selection {
        text-shadow: none;
    }

    @media print {
        code[class*="language-"],
        pre[class*="language-"] {
            text-shadow: none;
        }
    }

    /* Code blocks */
    pre {
        padding: 1em;
        margin-bottom: 20px;
        overflow: auto;
    }

    /* Inline code */
    :not(pre) > code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
        white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: slategray;
    }

    .token.punctuation {
        color: #999;
    }

    .namespace {
        opacity: .7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #905;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: #690;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: #a67f59;
        background: hsla(0, 0%, 100%, .5);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: #07a;
    }

    .token.function {
        color: #DD4A68;
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: #e90;
    }

    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

}
</style>

