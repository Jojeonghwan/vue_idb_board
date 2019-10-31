<template>
    <div class="data">
        <div>
            이름 : {{ name }}<br>
            제목 : {{ title }}<br>
            내용 : {{ comment }}<br>
            성별 : {{ gender }}<br>
            날짜 : {{ date }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'boardData',
  props: new boardData
}
</script>