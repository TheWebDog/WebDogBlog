<template slot="header">
  <el-input
    size="mini"
    placeholder="输入关键字搜索"
    @input="searchInput($event)"
  />
</template>

<script>
export default {
  name:'DebugSearch',
}
</script>