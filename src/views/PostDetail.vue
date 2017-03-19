
<template>
<div class="app1-learn-detail">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="app1-learn-detail-content">
        <h1 class="app1-learn-detail-title" id="top">{{post.title}}</h1>
        <p class="app1-learn-detail-date ui-list-unstyled">
            <span v-if="post.categories"><B>Category: </B>{{post.categories.join(',')}}&nbsp; &nbsp;</span>
            <span v-if="post.tags"><B>Tags: </B>{{post.tags.join(',')}}&nbsp; &nbsp;</span>
            <span>{{post.renderDate}}</span>
        </p>
        <markdown-content :content="post.content"></markdown-content>
    </div>
</div>
</template>
<script>
import lodash from 'lodash';
import MarkdownContent from '../components/PostDetailContent/index.vue';

export default {
    components: {
        MarkdownContent
    },
    data() {
        return {
            loading: false,
            post: null,
            error: null
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.error = this.post = null
            this.loading = true
            this.getPost(this.$route.params.detailId, (err, post) => {
                this.loading = false
                if (err) {
                  this.error = err.toString()
                } else {
                  this.post = post
                }
            })
        },
        getPost(id, cb) {
            const Db = window.Store
            // console.log('id', id)
            const post = lodash.find(Db.posts, {fileName: id})
            // let postTitle = ''
            // let postDate = ''
            if(post) {
                // postTitle = post.title ? post.title : ''
                if(post.date) {
                    const postdate = new Date(post.date)
                    post.renderDate = postdate.getFullYear() + '-' + (postdate.getMonth() + 1)
                        + '-' + postdate.getDate() 
                        + ' ' + postdate.getHours()
                        + ':' + postdate.getMinutes()
                }
            }
            let content = ''
            if(id) {
                try {
                    content = require('markdownDir/' + id + '.md')
                } catch (err) {
                    cb(err, null)
                    // console.log('post not found.')
                }

                if(!content) {
                    content = 'post not found.'
                }
            }
            // console.log('content', content)
            post.content = content
            cb(null, post)
        }
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    }
}
</script>
<style lang="less">
@import "../less/lib-var.less";
@import "../less/lib-mixins.less";
// content
.app1-learn-detail{
   padding-bottom: 100px;
}
.app1-learn-detail-content {
    min-height: 440px;
    margin-bottom: 20px;
}

.app1-learn-detail-title {
    font-size: 32px;
    color: #333;
    margin-bottom: 15px;
    font-weight: 700;
    margin-left: 0;

    &::before {
            height: 0;
     }
}

.app1-learn-detail-date {
    color: #aaa;
    margin-bottom: 30px;
}
</style>

