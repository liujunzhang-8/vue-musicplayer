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
      if(item.singer_name === '薛之谦') {
          item.url = `https://dl.stream.qqmusic.qq.com/C400001lsRQA4aX07f.m4a?guid=9234340882&vkey=456FED8977642F563D975262ADEF53D5142EE996A2CC3ACA064532FC32CA6058463CD0131247B5235EA08F0FA20C478C793C6144421CBA5D&uin=&fromtag=120002`
          item.duration = '240'
      } else {
          item.url = `http://dl.stream.qqmusic.qq.com/C400000An6OI4ScInL.m4a?guid=7296396650&vkey=9F09E9EFA152A30A8FD7611E10FDEAAB4F2DB73AF9BCB189F628C58FBB4CECD921C98B5B222370475E93EDCFC3FC0F8DD63B744375825462&uin=&fromtag=120002`
          item.duration = '180'
      }
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
