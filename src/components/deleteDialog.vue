<template>
    <div class="dialog">
        <el-dialog
            title="Warning"
            :visible="visible"
            width="30%"
            center>
            <span>진짜로 삭제 하시겠습니까?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">취소</el-button>
                <el-button type="primary" @click="confirm()">확인</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'deleteDialog',
  props: {
      visible: Boolean
  },
  methods:{
    cancel(){
        this.$emit('cancel');
    },
    confirm(){
        this.$emit('confirm');
    }
  }
}
</script>