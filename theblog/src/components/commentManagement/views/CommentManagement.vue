<template>
  <div class="CommentManage_div">
    <el-table
      class="CommentManage_el_table"
      :data="
        get_CommentManageData.filter(
          (data) =>
            !comment_search ||
            data.userComment
              .toLowerCase()
              .includes(comment_search.toLowerCase())
        )
      "
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
              <br />
              <el-form-item label="子评论：">
                <ul class="CommentManage_childrenComment_ul">
                  <li
                    class="CommentManage_childrenComment_li"
                    v-for="(childrenItem, childrenIndex) in props.row
                      .childrenComment"
                    :key="childrenIndex"
                  >
                    <div class="CommentManage_childrenComment">
                      <div class="CommentManage_childrenComment_container">
                        <div>用户名:</div>
                        <div class="">
                          {{ childrenItem.userName }}
                        </div>
                      </div>
                      <div class="CommentManage_childrenComment_container">
                        <div>用户评论:</div>
                        <div class="">
                          {{ childrenItem.userComment }}
                        </div>
                      </div>
                      <div class="CommentManage_childrenComment_container">
                        <el-link
                          :underline="false"
                          class="children_delete"
                          icon="el-icon-delete"
                          @click="
                            handleCommentChildrenDelete(
                              childrenItem.userComment,
                              props.row._id
                            )
                          "
                          >删除</el-link
                        >
                      </div>
                    </div>
                  </li>
                </ul>
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
        <template slot="header">
          <input
            class="articleManage_search"
            type="text"
            placeholder="输入关键字搜索"
            v-model="comment_search"
          />
        </template>
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
      comment_search: '',
    }
  },
  computed: {
    ...mapGetters(['get_CommentManageData']),
  },
  methods: {
    ...mapActions(['action_getCommentManageData', 'action_remove_comment', 'action_remove_children']),
    handleCommentDelete (index, row) {
      // 删除数据
      this.action_remove_comment(row._id)
      this.$router.go(0)
    },
    handleCommentChildrenDelete (userComment, id) {
      // 删除数据
      this.action_remove_children({ userComment, id })
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
  margin-bottom: 20px;
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
.children_delete > i,
.children_delete > span {
  /* font-weight: 900; */
  color: #be002f;
}
.children_delete:hover {
  font-weight: 900;
  /* color: #be002f; */
}

.CommentManage_el_table
  > .el-table__body-wrapper
  > table
  > tbody
  > tr
  > .el-table_1_column_3
  > div {
  /* background-color: black !important; */
  /* 文本溢出 显示为省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.CommentManage_childrenComment_ul {
  margin-top: 10px;
  list-style: none;
}
.CommentManage_childrenComment_li {
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 10px;
}
.CommentManage_childrenComment_container {
  display: flex;
}
.CommentManage_childrenComment_container > div {
  font-size: 16px;
  height: 20px;
  line-height: 20px;
}
.CommentManage_childrenComment_container > .el-link {
  font-size: 16px;
  height: 20px;
  line-height: 20px;
}
</style>