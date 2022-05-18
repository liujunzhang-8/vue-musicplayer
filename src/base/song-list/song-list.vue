<template>
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
      >
        <div class="rank" v-show="rank">
            <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{ song.album_name }}</h2>
          <p class="desc">{{ song.desc }}</p>
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
      item.image = `https://y.qq.com/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`
      if(item.singer_name === '薛之谦') {
          item.url = `http://dl.stream.qqmusic.qq.com/C400001lsRQA4aX07f.m4a?guid=7002942716&vkey=232769C0EB211F0D2C6F684C8B44D3141C30247C68093EF58BED97D992935A6B8FB64E4E26CDD4B725DC72120F71C5F369FDA79154CE2D18&uin=&fromtag=120002`
          item.duration = '240'
      } else {
          item.url = `http://dl.stream.qqmusic.qq.com/C400000An6OI4ScInL.m4a?guid=2097669609&vkey=3FBF3708F7726DA4A89CC265AACA699E4EFADEE0C690559142ECA02F85E61572D8EC7A20E179E634F20B73F87E0A5A9E87041F624503D4F5&uin=&fromtag=120002`
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
