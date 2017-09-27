<template>
<markdown-content :content="content"></markdown-content>
</template>

<script>
import content from "./about.md"
import MarkdownContent from '../components/PostDetailContent/index.vue';

export default {
    components: {
            MarkdownContent
    },
    data() {
        return {
            content: content
        }
    }
}
</script>
