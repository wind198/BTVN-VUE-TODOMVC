<template>
  <li @dblclick="handleToggleComplete">
    <input type="checkbox" :checked="todo.completed" @click="handleToggleComplete" /> <span>{{ todo.title }}</span>
    <i class="fas fa-times" @click="handleDelete"></i>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Item",
  props: {
    todo: Object,
  },
  methods: {
    ...mapActions(["act_delete_todo", "act_toggle_complete"]),
    handleDelete() {
      console.log("click");
      this.act_delete_todo(this.todo.id);
    },
    handleToggleComplete() {
        console.log("hello");
      this.act_toggle_complete(this.todo.id);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover {
    background: rgba(97, 97, 97, 0.46);
    color: white;
  }
  span {
    margin-right: auto;
    margin-left: 1rem;
    line-height: 30px;
  }
  input {
    width: 30px;
    height: 30px;
    margin: 0;
  }
  i {
    line-height: 30px;
  }
}
</style>