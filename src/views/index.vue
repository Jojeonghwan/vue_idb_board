<template>
  <div class="index">
  </div>
</template>

<script>
export default {
  name: 'index',
  created () {
    this.moveList();
  },
  methods: {
    moveList(){
      this.$router.push('board');
    },
  }
}
</script>
