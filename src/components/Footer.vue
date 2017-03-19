<template>
    <div id="footer-zone" class="footer">
    </div>
</template>
<script>
    export default {
        components: {
        }
        ,
        methods: {
        },
        data() {
            return {
                // search: this.$route.query.search
            }
        }
    }
</script>
<style lang="less">
    .footer{
        background: #28292b;
        color: #6E6F73;
    }
    .footer-wrapper{
        margin: 0 auto;
        &.s-upper {
             border-right: 1px solid #3a3b3d;
         }
    }
    .footer-upper {
        font-size: 0;
        border-bottom: 1px solid #3a3b3d;
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .footer-item {
        list-style: none;
        font-size: 14px;
        display: inline-block;
        vertical-align: top;
        &.s-first {
            width: 350px;
        }
        &.s-second {
            width: 355px;
            border-right: 1px solid #3a3b3d;
         }
        &.s-third {
             margin-left: 140px;

            .info {
                margin-bottom: 0;
            }
            .info-title {
                height: 22px;
                margin-bottom: 5px;
                overflow: hidden;
                text-align: justify;

                &::after{
                     content: "";
                     display: inline-block;
                     width: 100%;
                     height: 0;
                     line-height: 0;
                 }
            }
            .info-desc {
                text-indent: 0;
            }
         }
    }
    .footer-lower{
        font-size: 14px;
        line-height: 70px;
        text-align: left;
        color: #6E6F73;
        letter-spacing: 1px;
    }
    .footer-link{
        color: #6E6F73;
        margin-right: 50px;

        &:hover {
             color: #6B6B6D;
         }
    }


    .info {
        &:first-child {
             margin-bottom: 40px;
         }
    }
    .info-title {
        /*min-height: 24px;*/
        letter-spacing: 1px;
    }
    .info-desc {
        font-size: 16px;
        color: #979aa2;
        text-indent: 3em;

        .footer-link {
            color: inherit;
        }
    }

    .ui-fl-r {
        float: right;
    }

</style>

