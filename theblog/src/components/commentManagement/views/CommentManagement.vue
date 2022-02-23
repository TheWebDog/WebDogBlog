<template>
  <div class="CommentManage_div">
    <el-table
      class="CommentManage_el_table"
      
      :data="get_CommentManageData"
      stripe
      style="width: 600px; min-width: 630px"
    >
      <el-table-column type="expand" width="60" label="展开">
        <template slot-scope="props">
          <div class="CommentManage_template_div_el_form">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="评论的文章：">
                <div size="medium">{{ props.row.articleTitle }}</div>
              </el-form-item>
              <br />
              <el-form-item label="评论人：">
                <div size="medium">{{ props.row.userName }}</div>
              </el-form-item>
              <br />
              <el-form-item label="评论详情：">
                <p>{{ props.row.userComment }}</p>
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

      <el-table-column prop="userComment" label="评论内容" width="150">
      </el-table-column>

      <el-table-column prop="articleTitle" label="文章" width="120">
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleCommentDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
  name: "CommentManagement",
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['get_CommentManageData']),
  },
  methods: {
    ...mapActions(['action_getCommentManageData', 'action_remove_comment']),
    handleCommentDelete (index, row) {
      // 删除数据
      this.action_remove_comment(row._id)
      this.$router.go(0)
    }
  },
  created () {
    this.action_getCommentManageData()
  },
}
</script>

<style>
.CommentManage_el_table {
  margin: auto;
}
.CommentManage_template_div_el_form {
  padding: 5px 20px;
}
.CommentManage_template_div_el_form > form > div {
  margin: 0 !important;
}
.CommentManage_el_table > div > table > thead > tr > th {
  border-left: 1px solid #e3e3e3;
}

.CommentManage_el_table>.el-table__body-wrapper>table>tbody>tr>.el-table_1_column_3>div{
  /* background-color: black !important; */
  /* 文本溢出 显示为省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>