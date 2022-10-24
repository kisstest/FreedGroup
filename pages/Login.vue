<template>
  <b-container fluid>
      <h1>로그인</h1>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
          <b-badge class="text-danger" v-if="invalidEmail">유효하지 않은 이메일입니다.</b-badge>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Password:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
          <b-badge class="text-danger" v-if="invalidPassword">영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열의 형식을 만족하지 않습니다.</b-badge>
        </b-form-group>
        <b-button @click="signIn" variant="primary">login</b-button>
        <b-form-checkbox
          id="checkbox-1"
          v-model="autoLogin"
          name="checkbox-1"
        >
          자동로그인
        </b-form-checkbox>
        <b-button type="reset" variant="danger" @click="reset">Reset</b-button>
        <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>
        <b-toast id="my-toast" variant="warning" solid>
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
              <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
              <strong class="mr-auto">error!</strong>
            </div>
          </template>
          잘못된 로그인 정보입니다. 확인 후 다시 입력해 주세요
        </b-toast>
        <nuxt-link size="sm" to="/" class="button--grey">Home</nuxt-link>
      </b-form>
  </b-container>  
</template>

<script>
const userList = [
  {
    email: "user1@example.com",
    password: "^Test1234"
  },
  {
    email: "user2@example.com",
    password: "^Test12345"
  }
]

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      autoLogin: false,
      invalidEmail: false,
      invalidPassword: false,
    }
  },
  watch: {
    email(newVal) {
      const emailRex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (emailRex.test(newVal)) {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    },
    password(newVal) {
      const passwordRex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (passwordRex.test(newVal)) {
        this.invalidPassword = false;
      } else {
        this.invalidPassword = true;
      }
    },
  },
  methods: {
    signIn(item) {
      if (localStorage.getItem('autoLogin')) {
        $nuxt.$router.push({name: 'Albums'});
        return;
      }
      if (this.invalidEmail && this.invalidPassword) return;
      const match = userList.find(user => {
        let result = false;        
        user.email === this.email ? result = true : result = false;
        user.password === this.password ? result = true : result = false;
        return result;
      });
      if (match) {
        const userInfo = {
          email: this.email,
          password: this.password,
        }
        if (this.autoLogin) {          
          this.$store.commit('saveUserInfo', userInfo);
        } else {
          this.$store.commit('deleteUserInfo');
        }
        this.$store.commit('loginSuccess', userInfo);
        $nuxt.$router.push({name: 'Albums'});
      } else {
        this.email = '';
        this.password = '';
      }
    },
    reset() {
      this.email = '';
      this.password = '';
    }
  },
  mounted() {
    this.email = localStorage.getItem('userInfo') ? this.$store.getters.getUserInfo.email : '';
    this.password = this.$store.getters.getUserInfo ? this.$store.getters.getUserInfo.password : '';
  }
}
</script>

<style>
.error-message {
  font-size: 10px;
  color: red;
}
.invisible {
  visibility: hidden;
}
</style>