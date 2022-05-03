<template>
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
      >
        <!-- <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
                </div> -->
        <div class="content">
          <h2 class="name">{{ song.album_name }}</h2>
          <p class="desc">{{ song.desc.substr(0, 20) }}</p>
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
      default: () => {},
    },
    rank: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
  },
  computed: {},
  methods: {
    selectItem(item, index) {
      console.log(item, '获取歌单列表之');
      item.image = `https://y.qq.com/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`
      item.url = `http://dl.stream.qqmusic.qq.com/RS02060tZKLF4Jux2z.mp3?guid=1630613491&vkey=4329DCB81024B8B3BAE180D4C2F05D31A241F056D3C6F6D3B5B8107B45957F14B3C4877878769DC1AFDB5F1F892324B523E76D112E79F0D8&uin=&fromtag=120002`
      item.duration = '60'
      this.$emit("select", item, index);
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return "text";
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixin.scss";

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        // &.icon0 {
        //   bg-image: ("first");
        // }
        // &.icon1 {
        //   bg-image: ("second");
        // }
        // &.icon2 {
        //   bg-image: ("third");
        // }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        color: $color-text;
      }
      .desc {
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
