
<template>
<div class="app1-learn-detail">
    <div class="app1-learn-detail-content">
        <h1 class="app1-learn-detail-title" id="top">{{post.title}}</h1>
        <p class="app1-learn-detail-date ui-list-unstyled">
            <span v-if="post.categories"><B>Category: </B>{{post.categories}}&nbsp; &nbsp;</span>
            <span v-if="post.tags"><B>Tags: </B>{{post.tags}}&nbsp; &nbsp;</span>
            <span>{{post.date}}</span>
        </p>
        <post-detail-content :content="content"></post-detail-content>
    </div>
</div>
</template>
<script>
import lodash from 'lodash';
import PostDetailContent from './PostDetailContent.vue';

export default {
    components: {
        PostDetailContent
    },
    data() {
        return {
            post: {
                title: '',
                date: '',
                tags: [],
                categories: ''
            },
            content: ''
        }
    },
    route: {
        data({to}) {
            const Db = window.Store
            const id = this.$route.params.detailId
            console.log('id', id)
            const post = lodash.find(Db.posts, {fileName: id})
            // let postTitle = ''
            // let postDate = ''
            if(post) {
            //     postTitle = post.title ? post.title : ''
                if(post.date) {
                    const postdate = new Date(post.date)
                    post.date = postdate.getFullYear() + '-' + postdate.getMonth()
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
                    // console.log('post not found.')
                }

                if(!content) {
                    content = 'post not found.'
                }
            }
            return {
                post: post,
                // postTitle: postTitle,
                // postDate: postDate,
                content: content
            }
        }
    }
}
</script>
<style lang="less">
@import "../assets/less/lib-var.less";
@import "../assets/less/lib-mixins.less";
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

