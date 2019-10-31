<template>
  <div class="read">
    <h1>{{data.id}}번 글</h1>
      <el-main>
        <el-tag>제목</el-tag>  : {{data.title}}
        <el-divider></el-divider>
        <br>
        <el-tag>이름</el-tag>  : {{data.name}}
        <el-divider direction="vertical"></el-divider>
        <el-tag>날짜</el-tag>  : {{data.date}}
        <el-divider direction="vertical"></el-divider>
        <el-tag>성별</el-tag>  : {{data.gender}}
        <el-divider></el-divider>
        <el-tag>내용이다</el-tag><br><br>
        {{data.comment}}
      </el-main>
      <br>
    <div class="button">
      <el-button @click="moveUpdate(data.id)" class="el-icon-setting"></el-button>
      <el-button @click="callDialog()" class="el-icon-delete"></el-button>
      <deleteDialog :visible="visibleDialog" @confirm="removeBoard" @cancel="hideDialog"></deleteDialog>&nbsp;
      <el-button @click="moveList()" class="el-icon-back"></el-button>&nbsp;
    </div>
  </div>
</template>

<script>
import deleteDialog from '@/components/deleteDialog.vue'

export default {
  name: 'read',
  data() {
    return{
      data: new boardData(),
      visibleDialog:false
    }
  },
  components:{
    deleteDialog
  },
  created() {
    this.init()
  },
  methods:{
    moveUpdate(id){
      this.$router.push({name:"boardForm",params:{"id":id}})
    },
    init(){
      this.$db.boards.where('id').equals(this.$route.params.id).first((board, index) => {
        this.data = new boardData(board.id,board.name,board.title,board.comment,board.gender,board.date);
      })
    },
    moveList(){
      this.$router.push('/board')
    },
    removeBoard(){
      this.$db.boards.where('id').equals(this.$route.params.id).delete().then(() => this.$router.push('/board'));
      this.visibleDialog=false
    },
    callDialog(){
      this.visibleDialog=true;
    },
    hideDialog(){
      this.visibleDialog=false;
    }
  }
}
</script>
