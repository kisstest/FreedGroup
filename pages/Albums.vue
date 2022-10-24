<template>
<b-container fluid>
  <h1>Albums</h1>
  <b-row class="mt-3">
    <b-col v-for="(item, index) in albumlist" :key="index">
    <!-- <div class="col" v-for="(item, index) in albumlist" :key="index"> -->
       <b-card
        :title="item.title"
        :img-src="'https://placeimg.com/320/100/any'"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-button size="sm" @click="openModifyAblumModal(item)">수정</b-button>
        <b-button size="sm" @click="deleteAlbum(item.id)" href="#" variant="primary">삭제하기</b-button>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <paginate
      :page-count="datapage"
      :page-range="3"
      :margin-pages="2"
      :click-handler="changePage"
      :prev-text="'prev'"
      :next-text="'next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </b-row>
  <b-row>    
    <b-modal id="modal" title="수정" @ok="modifyAlbum">
      <b-form-input v-model="modifyAlbumTitle" placeholder="Enter your album title"></b-form-input>
    </b-modal>
    <b-button v-b-modal.modal-1>Add album</b-button>
    <b-modal id="modal-1" title="Add album" @ok="addAlbum">
      <b-form-input v-model="albumTitle" placeholder="Enter your album title"></b-form-input>
    </b-modal>
    <nuxt-link to="/" class="button--grey">Home</nuxt-link>
  </b-row>
</b-container>
</template>

<script>
import axios from "axios";
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';

export default {
  name: "Albums",
  data () {
    return {
      albumlist : [],
      curpagenum : 1,
      datapage : 5,
      albumTitle: '',       // 추가시 
      modifyAlbumTitle: '', // 수정시
      tempAlbum: {},         // 수정시 임시보관
    }
  },
  methods: {
    test() {
      console.log(test);
    },
    async getAlbums () {
      await axios.get(albumsUrl, {
        params: {
          _limit: this.datapage,
          _page: this.curpagenum
        }
      })
      .then((res) => {
          console.log(res);
          this.albumlist = res.data // 데이터 배열 저장
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 백엔드 네트워크나 피드백 없이 UI에 일시적으로만 표시할 수 있어야 합니다.
    deleteAlbum(id) {
      const index = this.albumlist.findIndex(item => item.id == id);
      this.albumlist.splice(index, 1);
    },
    openModifyAblumModal(item) {
      this.$bvModal.show('modal');
      console.log('this.tempAlbum', this.tempAlbum);
      Object.assign(this.tempAlbum, item);
      this.modifyAlbumTitle = item.title;
    },
    modifyAlbum() {
      const index = this.albumlist.findIndex(item => item.id === this.tempAlbum.id);
      const newAlbum = {
        id: this.tempAlbum.id,
        userId: this.tempAlbum.userId,
        title: this.modifyAlbumTitle
      }
      this.albumlist.splice(index, 1, newAlbum);
    },
    addAlbum() {
      const newAlbum = {
        id: null,
        title: this.albumTitle
      };
      this.albumlist.unshift(newAlbum);
    },
    changePage(pageNum) {
      this.curpagenum = pageNum;
      this.getAlbums();
    },
  },
  mounted () {
    this.getAlbums();
  }
}
</script>

<style lang="css">
.pagination {
    margin:24px;
}
.pagination li {
  display: inline-block;
  min-width:32px;
  padding:2px 6px;
  text-align:center;
  margin:0 3px;
  border-radius: 6px;
  border:1px solid #eee;
  color:#666;
}
.pagination li:hover {
    background: #E4DBD6;
}
.page-item a {
  display: inline-block;
  color:#666;
  text-decoration: none;
}
.pagination li.active {
  background-color : #E7AA8D;
  color:#fff;
}
.pagination li.active a {
  color:#fff;
}
</style>