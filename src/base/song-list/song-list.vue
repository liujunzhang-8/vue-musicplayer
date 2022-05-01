<template>
    <div class='song-list'>
        <ul>
            <li class="item" v-for="(song, index) in songs" :key="index" @click="selectItem(song, index)">
                <!-- <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
                </div> -->
                <div class="content">
                    <h2 class="name"></h2>
                    <p class="desc"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: () => {}
        }
    },
    components: {},
    data() {
        return {

        };
    },
    computed: {},
}
</script>
<style lang='scss' scoped>

</style>