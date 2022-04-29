<template>
  <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
  </div>
</template>

<script>
import ListView from '../../base/listview/listview'
import { getSingerList } from "../../api/singer";
import { ERR_OK } from "../../api/config";
export default {
  components: {
      ListView
  },
  data() {
    return {
      singers: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      const data = Object.assign({
        area: -100,
        genre: -100,
        index: -100,
        sex: -100,
        pageNo: 1,
      });
      getSingerList(data)
        .then((res) => {
          if (res.result === ERR_OK) {
            console.log(res.data);
            this.singers = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectSinger() {
        console.log('选择歌手');
    }
  },
};
</script>
<style lang="stylus" scoped></style>
