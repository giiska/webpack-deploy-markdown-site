<template>
<markdown-content :content="content"></markdown-content>
</template>

<script>
import content from "./contact.md"
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
