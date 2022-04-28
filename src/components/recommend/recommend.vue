<template>
    <div class='recommend' ref="recommend">
        推荐页面
    </div>
</template>

<script>
import { getRecommend } from '../../api/recommend'
import { ERR_OK } from '../../api/config' 
export default {
    components: {},
    data() {
        return {

        };
    },
    created() {
        this._getRecommend()
    },
    computed: {},
    methods: {
        _getRecommend() {
            getRecommend().then(res => {
                if(res.code === ERR_OK) {
                    console.log(res.data.slider);
                }
            })
        }
    }
}
</script>
<style lang='stylus' scoped>

</style>