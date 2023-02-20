import { defineStore } from '../core/Store';

interface IState {
  userInfo: object;
}

const initialState: IState = {
  userInfo: {
    id: 'test',
    password: '1234',
  },
};

const store = defineStore({
  state: initialState,
  getters: {},
  mutations: {
    changeUserInfo: (state: IState, payload) => {
      state.userInfo = payload;
    },
  },
});

export default store;
