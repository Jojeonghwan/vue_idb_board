<template>
  <div class="boardForm">
    <h1>{{divisionText}}페이지</h1>
    <el-main>
      <el-input class="ftitle" placeholder="제목" v-model="data.title"></el-input>
      <el-divider></el-divider>
      <el-row>
      <el-input class="fname" placeholder="이름" v-model="data.name"></el-input>
      </el-row>
      <el-divider direction="vertical"></el-divider>
      <el-select id="fgender" v-model="data.gender" placeholder="성별" change="남">
        <template slot="prefix"></template>
        <el-option
          v-for="item in options"
          :key="item.gender"
          :label="item.label"
          :value="item.gender">
        </el-option>
      </el-select>
      <el-divider direction="vertical"></el-divider>
      <el-date-picker
        id="fdate"
        v-model="data.date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="날짜를 선택하시오">
      </el-date-picker>
      <el-divider></el-divider>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="내용을 입력하시오"
        v-model="data.comment"
        id="fcomment"
        resize="none">
      </el-input>
      <br><br>
      <div class="button">
      <el-button @click="register()" class="el-icon-edit"></el-button>&nbsp;
      <span v-show="checkEdit"><el-button class="el-icon-delete" @click="callDialog()"></el-button></span>&nbsp;
      <el-button @click="moveList()" class="el-icon-back"></el-button>&nbsp;&nbsp;
      <deleteDialog :visible="visibleDialog" @confirm="removeBoard" @cancel="hideDialog"></deleteDialog>&nbsp;
      </div>
    </el-main>
  </div>
</template>

<script>
import deleteDialog from '@/components/deleteDialog.vue'


export default {
  name: 'boardForm',
  data() {
    return{
      options: [{
          gender: '여자',
          label: '여자'
        }, {
          gender: '남자',
          label: '남자'
        }
      ],
      data: new boardData(),
      divisionText:'',
      identity:0,
      checkEdit:false,
      visibleDialog:false
      }
    },
  components:{
    deleteDialog
  },
  created(){
    this.init()
  },
  methods: {  
    register (){
      if(this.checks(
        this.data.name, '이름을 올바르게 공백없이 입력해주세요.',
        this.data.title, '제목에는 공백이 없어야 합니다.',
        this.data.comment, '내용에는 공백이 없어야 합니다.',
        this.data.gender, '성별을 선택해 주세요.',
        this.data.date, '날짜를 선택해 주세요.')){
        if(this.$route.params.id){
          this.$db.boards.update(
            this.$route.params.id,this.data)
          this.$notify.success(new notifyForm("성공","게시글 수정이 성공하였습니다."))
        }
        else{
            this.$db.boards.add(new boardData(this.identity,this.data.name,this.data.title,this.data.comment,this.data.gender,this.data.date))
            this.$notify.success(new notifyForm("성공","게시글 생성이 성공하였습니다."))
        }
        this.$router.push('/board')
      }
    },
    init(){
      if(this.$route.params.id){
      this.$db.boards.where('id').equals(this.$route.params.id).first((board, index) => {
        this.data = new boardData(board.id,board.name,board.title,board.comment,board.gender,board.date);
        this.divisionText = "수정";
        this.checkEdit = true;
      })
      }else{
        this.$db.boards.toArray((board,index) =>{this.identity=parseInt(board.length)+1;})
        this.divisionText = "생성";
      }
    },
    checks(){      
      var getName= RegExp(/^[가-힣]+$/);
      for (let i=0; i<arguments.length/2; i++) {
        let index = i * 2
        if(!this.check(arguments[index], arguments[index+1],arguments[index]==this.data.name? getName:false)){return false}
      }
      return true
    },
    check(what, message, re){
      if(re && !re.test(what)) {
        this.$notify.error(new notifyForm("실패",message));
        return false;
      }
      if(what!=''){
        return true;
      }
      this.$notify.error(new notifyForm("실패",message));
    },
    moveList(){
      this.$router.push('/board')
    },
    removeBoard(){
      this.$db.boards.where('id').equals(this.$route.params.id).delete().then(() => this.$router.push('/board'));
      this.visibleDialog=false;
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
