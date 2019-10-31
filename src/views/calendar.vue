<template>
  <div class="calendar">
    <h1>일정표</h1>
    <el-calendar v-model="value">
      <template
      slot="dateCell"
      slot-scope="{date, data}">
      {{ data.day }}
        <div v-for="(board, idx) in boards" :key="idx">
          <p v-if="data.day==board.date">
            <el-popover title="일정표" width="150" trigger="hover">
              <boardData v-bind="board"></boardData>
              <el-tag slot="reference">{{board.title}}</el-tag>
            </el-popover>
          </p>
        </div>
      </template>
    </el-calendar>
    <el-button @click="moveList()" class="button el-icon-back"></el-button>
  </div>
</template>

<script>
import boardData from '@/components/boardData.vue'

export default {
  name: 'calendar',
  components:{
    boardData
  },
  data() {
      return {
          value: new Date(),
          boards:[]
      }
  },
  created () {
    this.getList()
  },
  methods: {
    getList(){
      this.$db.boards.toArray((board,index) =>{this.boards=board});
    },
    moveList(){
      this.$router.push('/board');
    }
  }
}
</script>
