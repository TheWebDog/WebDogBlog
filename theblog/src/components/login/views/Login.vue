<template>
  <div class="login_div">
    <div class="container" onclick="onclick">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        <div class="login_submit thesubmitdiv" :hidden="ishiden">
          <div class="the_icon"><i class="el-icon-user-solid"></i>登录</div>
          <el-input
            maxlength="10"
            show-word-limit
            placeholder="账户"
            v-model="Username"
            clearable
          >
          </el-input>
          <el-input
            maxlength="20"
            placeholder="密码"
            v-model="Password"
            show-password
          ></el-input>
          <div class="login_btn">
            <el-button
              type="primary"
              icon="el-icon-user-solid"
              @click="submitLogin"
              plain
              >登录
            </el-button>
            <el-button
              type="success"
              icon="el-icon-user"
              @click="toRegister"
              plain
              >去注册
            </el-button>
            <el-button
              icon="el-icon-house"
              circle
              plain
              @click="to_home"
            ></el-button>
          </div>
        </div>
        <div class="register_submit thesubmitdiv" :hidden="!ishiden">
          <div class="the_icon"><i class="el-icon-user"></i>注册</div>
          <el-input
            maxlength="10"
            show-word-limit
            placeholder="名称不可超过10个字符"
            v-model="Username"
            clearable
          >
          </el-input>
          <el-input
            maxlength="20"
            placeholder="密码要求20个字符以内"
            v-model="Password"
            show-password
          ></el-input>
          <div class="login_btn">
            <el-button
              type="primary"
              icon="el-icon-user-solid"
              @click="toLogin"
              plain
              >去登录
            </el-button>
            <el-button
              type="success"
              icon="el-icon-user"
              @click="submitRegister"
              plain
              >注册
            </el-button>
            <el-button
              icon="el-icon-house"
              circle
              plain
              @click="to_home"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Login",
  data () {
    return {
      Username: '',
      Password: '',
      ishiden: false,
    }
  },
  computed: {
    // ...mapGetters([]),
  },
  methods: {
    // ...mapActions([]),
    to_home () {
      this.$router.push('/')
    },
    toLogin () {
      this.Username = ''
      this.Password = ''
      this.ishiden = !this.ishiden
    },
    toRegister () {
      this.Username = ''
      this.Password = ''
      this.ishiden = !this.ishiden
    },
    submitLogin () {
      if (this.Username.length != 0 && this.Password.length != 0) {
        var name = this.Username, password = this.Password;
        axios
          .post('http://localhost:4000/user/login', { name, password })
          .then((res) => {
            var { power,name,_id } = res.data.user
            this.$cookies.set('key', { power }, '1d')
            this.$cookies.set('name', { name }, '1d')
            this.$cookies.set('userId', { _id }, '1d')
            if (power < 10) {
              this.$router.back()
            } else {
              this.$router.push('/manager')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: "请输入用户名和密码",
          type: 'warning'
        });
      }

    },
    submitRegister () {
      if (this.Username.length != 0 && this.Password.length != 0) {
        var name = this.Username, password = this.Password;
        console.log('register axiosing')
        axios
          .post('http://localhost:4000/user/register', { name, password })
          .then((res) => {
            if (res.data == '注册成功') {
              this.$message.success(res.data);
            } else {
              this.$message.error(res.data);
            }

          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        });
      }
    },
  },
  created () {

  },
}
</script>


<style scoped>
/* 样式：我太懒了 就放在这吧 抄袭的别人样式 加个scoped 省的有毛病 */

@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  font-family: 'Raleway', sans-serif;
  margin: 0;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container:hover .top:before,
.container:hover .top:after,
.container:hover .bottom:before,
.container:hover .bottom:after,
.container:active .top:before,
.container:active .top:after,
.container:active .bottom:before,
.container:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container:hover .center,
.container:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}
.top:before,
.top:after,
.bottom:before,
.bottom:after {
  content: '';
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}
.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}
.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}
.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 15px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}
.thesubmitdiv {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 100px 50px;
}
.thesubmitdiv > .el-input {
  margin-bottom: 10px;
}
.login_btn {
  text-align: center;
}
.the_icon {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 20px;
}
.the_icon > i {
  font-size: 20px;
}
</style>