<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible =true">添加按钮</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="User" prop="username"></el-table-column>
      <el-table-column label="password" prop="password"></el-table-column>
      <el-table-column align="right">
        <template slot="header">操作</template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="total"
      @current-change="change"
    ></el-pagination>

    <!-- 弹框 -->

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
      pagenum: 1,
      limit: 5,
      total: 0,
      dialogFormVisible: false,
      form: {
        username: "",
        password: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.common();
  },
  methods: {
    // 修改
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form = {
        ...row
      };
    },

    // 封装
    common() {
      this.$axios
        .get("/api/fen", {
          params: { pagenum: this.pagenum, limit: this.limit }
        })
        .then(({ data }) => {
          // console.log(data);
          if (data.code === 1) {
            this.tableData = data.msg1;
            this.total = data.data1;
          } else {
            alert(data.msg);
          }
        });
    },

    // 删除
    handleDelete(row) {
      console.log(row.id);
      this.$axios
        .get("/api/del", { params: { id: row.id } })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 1) {
            // alert('删除成功')
            this.common();
          } else {
            alert("已删除");
          }
        });
    },
    // 添加
    add() {
      if (this.form.username && this.form.password) {
        let url = "";
        if (this.form.id) {
          url = "/api/change";
        } else {
          url = "/api/lss";
        }
        this.$axios.post(url, { ...this.form }).then(({ data }) => {
          if (data.code == 1) {
            alert(data.msg);
            this.common();
          } else {
            alert("添加失败");
          }
          this.dialogFormVisible = false;
          this.form = {
            username: "",
            password: "",
            id:""
          };
        });
      }
    },

    change(index) {
      // console.log(index)
      this.pagenum = index;
      this.common();
    }
  }
};
</script>

<style>
</style>