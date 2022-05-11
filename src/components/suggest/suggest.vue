<template>
    <scroll class='suggest' ref="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" @beforeScroll="listScroll"></scroll>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
export default {
    components: {
        Scroll
    },
    data() {
        return {

        };
    },
    computed: {},
}
</script>
<style lang='scss' scoped>

</style>