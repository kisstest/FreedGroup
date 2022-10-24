export const state = () => ({
  userInfo: null,
  isLogin: null,
  autoLogin: null,
  isLoginError: null
}); 

export const getters = {
  isLogin(state) {
    return state.isLogin;
  },
  isAutoLogin(state) {
    return state.autoLogin;
  },
  getUserInfo(state) {
    return state.userInfo;
  }
}

export const mutations = { 
  loginSuccess(state, payload) {
    state.isLogin = true;
  },
  saveUserInfo(state, payload) {
    state.userInfo = payload;
    state.autoLogin = true;
    window.localStorage.setItem('accessToken', true);
  },
  deleteUserInfo(state) {
    state.userInfo = null;
  },
  logout(state) {
    state.isLogin = false;
    state.autoLogin = true;
    state.userInfo = null;
    window.localStorage.removeItem('accessToken');
  }
}


// export const state = () => {}

// export const mutations = {}

// export const actions = {}

// export const getters = {}