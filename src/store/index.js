import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    nextId: 0,
  },
  getters: {
    gettodos: state => {
      return state.todos
    },
  },
  mutations: {
    DELETE_TODO(state, xid){
      console.log("hello", xid);
      state.todos = state.todos.filter((item) => { return item.id != xid })
    },
    ADD_TODO(state, newTodo){
      let newTodoObject = { id: state.nextId, title: newTodo, completed: false };
      state.todos.push(newTodoObject);
      state.nextId++;
    }
    , TOGGLE_COMPLETE(state, xid){
      state.todos = state.todos.map((element) => {
        if (element.id === xid) {
          return { ...element, completed: !element.completed }
        } else { return element }
      });
    console.log(state.todos);
    },
    CLEAR_COMPLETED(state){
      state.todos=state.todos.map((element)=>{return{...element,completed:false}})
    }
  },
  actions: {
    act_delete_todo({ commit }, xid){
      commit("DELETE_TODO", xid)
    },
    act_add_todo({ commit }, newTodo){
      commit("ADD_TODO", newTodo)
    },
    act_toggle_complete({ commit }, xid){
      commit("TOGGLE_COMPLETE", xid)
    },
    act_clear_completed({commit}){
      commit("CLEAR_COMPLETED")
    }
  },
 
})
