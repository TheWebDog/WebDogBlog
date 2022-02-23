<template>
  <div class="articleManage_div">
    <el-table
      class="articleManage_el_table"
      
      :data="get_ArticleManageData.filter((data) =>!table_search ||data.title.toLowerCase().includes(table_search.toLowerCase()))"
      stripe
      style="width: 600px; min-width: 630px"
    >
      <el-table-column type="expand" width="60" label="展开">
        <template slot-scope="props">
          <div class="articleManage_template_div_el_form">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="分类：">
                <el-tag size="medium">{{ props.row.category }}</el-tag>
              </el-form-item>
              <br />
              <el-form-item label="简介：">
                <p>{{ props.row.synopsis }}</p>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable prop="date" label="日期" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="150"> </el-table-column>

      <el-table-column prop="category" label="分类" width="120">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot="header">
          <el-input
            size="mini"
            v-model="table_search"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :pager-count="5"
      :total="500"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "articleManagement",
  data () {
    return {
      table_search: '',
    }
  },
  computed: {
    ...mapGetters(['get_ArticleManageData']),
  },
  methods: {
    ...mapActions(['action_getArticleManageData', 'action_REMOVE_DATA']),
    // searchInput (e) {
    //   console.log(e)
    //   this.table_search=e
    //   this.$forceUpdate()
    // },
    handleDelete (index, row) {
      // 删除数据
      this.action_REMOVE_DATA(row._id)
      this.$router.go(0)
    }
  },
  created () {
    this.action_getArticleManageData()
  },
}
</script>

<style>
.articleManage_el_table {
  margin: auto;
}
.articleManage_template_div_el_form {
  padding: 5px 20px;
}
.articleManage_template_div_el_form > form > div {
  margin: 0 !important;
}
.articleManage_el_table > div > table > thead > tr > th {
  border-left: 1px solid #e3e3e3;
}
</style>