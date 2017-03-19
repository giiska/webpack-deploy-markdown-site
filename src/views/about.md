（这篇文章的内容是在 About.vue 中加载 about.md 文件渲染出来）

请先阅读[使用 Webpack 为单页面应用发布新版本](http://zaishanda.com/post/3)

以前折腾 Wordpress，后来用过一段时间 Hexo，结合 BitTorrent Sync 同步 + MWeb 写东西真顺畅。兴奋到还为 Hexo 写过插件。


后来遇到，Hexo 也实现不了一些功能，比如我使用了一些插件在 markdown 中插入特殊标记，写完后想发到 Segmentfault.com 上，居然发现没法把特殊标记转化成普通的 markdown，不得不一个一个手动地把特殊标记处理完，得到可以用来转载的 markdown 内容。


今年刚好用 Vue + Webpack + markdown 重构了[微信广告官网](http://ad.weixin.qq.com/)，里面的架构做成一个博客也是非常适合的。于是修改了一些代码变成这个博客的架构，里面针对性做了一些优化。再加入了借鉴来的一些 gitbook 的体验，以及补充了 mobile 上的体验，现在可以算是一个体验比较优秀的 responsive 网站了。


这个博客的 markdown 遵循 Hexo 的风格，比如 front-matter 处理。这是为了直接把以前 Hexo markdown 内容拷贝过来，也为了以后把这个博客的框架推广给其他小伙伴玩。


[本站源码在这里](https://github.com/bammoo/webpack-deploy-markdown-site)