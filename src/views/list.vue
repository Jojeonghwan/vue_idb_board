<template>
  <div class="list">
    <h1>게시판 목록</h1>
    <el-button class="button el-icon-date" @click="moveCalendar()"></el-button>
    <br><br><br>
    <el-table
    :data="boards">
      <el-table-column
        fixed
        prop="id"
        label="번호"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="이름"
        width="200">
      </el-table-column>
      <el-table-column
        prop="title"
        label="제목"
        width="200">
      </el-table-column>
      <el-table-column
        label="내용"
        width="400">
        <template slot-scope="props">
          <el-button @click="moveRead(props.row.id)" type="text" >{{props.row.comment}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="성별"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="날짜"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="옵션"
        width="120">
        <template slot-scope="props">
          <el-button type="text" class="el-icon-delete" @click="callDialog(props.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table> 
    <br>
    <el-button @click="moveForm()" class="button el-icon-edit-outline"></el-button>
    <deleteDialog :visible="visibleDialog" @confirm="removeBoard" @cancel="hideDialog"></deleteDialog>&nbsp;
  </div>
</template>

<script>
import deleteDialog from '@/components/deleteDialog.vue'

export default {
  name: 'list',
  data(){
    return{
      boards: [],
      id: "",
      visibleDialog:false
    }
  },
  components:{
    deleteDialog
  },
  created () {
    this.getList()
  },
  methods: {
    getList(){
      this.$db.boards.orderBy('id').reverse().toArray().then( boards => this.boards = boards )
    },
    removeBoard(id){
      this.$db.boards.where('id').equals(this.id).delete().then(() => this.getList())
      this.visibleDialog=false
    },
    moveRead(id){
      this.$router.push({name:"read",params:{"id":id}})
    },
    moveForm(){
      this.$router.push('/board/form')
    },
    moveCalendar(){
      this.$router.push('/board/calendar')
    },
    callDialog(id){
      this.id=id;
      this.visibleDialog=true;
    },
    hideDialog(){
      this.visibleDialog=false;
    }
  }
}
</script>
