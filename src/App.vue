<template>
  <div>
    <div class="container">
      <h1>todos</h1>
      <div class="toolBar">
        <input
          class="addTodo"
          type="text"
          placeholder="What need to done?"
          @keypress.enter="handleAddTodo"
        />
        <div class="filter">
          <label for="filter">Filter:</label>
          <select v-model="filterValue" name="filter" id="filter">
            <option value="all">All</option>
            <option value="incompleted">Incompleted</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div class="todoList">
        <ul>
          <Item v-for="todo in this.todoToShow" :key="todo.id" :todo="todo" />
        </ul>
      </div>
      <div class="toolbarBot">
        <button @click="handleClearCompleted">Clear completed</button>
      </div>
    </div>
    <div class="multiLayer" v-show="!empty">
      <div class="layer" id="layer1"></div>
      <div class="layer" id="layer2"></div>
    </div>
  </div>
</template>

<script>
import Item from "./components/Item.vue";
import { mapActions, mapGetters } from "vuex";
import func from 'vue-editor-bridge';
export default {
  name: "App",
  data() {
    return {
      filterValue: "all",
    };
  },
  computed: {
    ...mapGetters(["gettodos"]),
    todoToShow() {
      switch (this.filterValue) {
        case "incompleted":
          return this.gettodos.filter((element) => {
            return !element.completed;
          });
        case "completed":
          return this.gettodos.filter((element) => {
            return element.completed;
          });
        default:
          return this.gettodos;
      }
    },
    empty() {
      if (this.gettodos.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    Item,
  },
  methods: {
    ...mapActions(["act_add_todo", "act_clear_completed"]),
    handleAddTodo(event) {
      let newTodo = event.target.value;
      console.log(newTodo);
      this.act_add_todo(newTodo);
      event.target.value = "";
    },
    handleClearCompleted() {
      console.log("clear");
      this.act_clear_completed();
    },
  },
  
};
</script>

<style lang="scss">
$bg_color1: #f5f5f5;
$text_color1: #c271eb;
$text_color2: #5ed142;
$text_color3: #d494f3;
html {
  font-family: Helvetica, sans-serif;
  font-size: 20px;
}
* {
  box-sizing: border-box;
}
.container {
  margin: auto;
  width: 500px;
  padding: 1rem;
  background: $bg_color1;
  color: $text_color1;
  border: 1px solid gray;
  h1 {
    text-align: center;
    color: $text_color2;
  }
  .toolBar {
    .addTodo {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      font-size: 22px;
      font-style: italic;
      color: $text_color3;
      border: 1px solid rgba(128, 128, 128, 0.5);
      border-radius: 10px;
      &::placeholder {
        color: rgba(128, 128, 128, 0.493);
      }
      &:focus-visible {
        border: 1px solid rgba(128, 128, 128, 0.5);
        outline: none;
      }
    }
    .filter {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 1rem;
      option {
        text-align: center;
      }
    }
  }
  ul {
    list-style: none;
  }
  .toolbarBot {
    button {
      display: block;
      width: fit-content;
      padding: 0.5rem 1rem;
      margin-left: auto;
    }
  }
}
.multiLayer {
  background: $bg_color1;
  width: 500px;
  margin: auto;
  .layer {
    background: $bg_color1;
    border: 1px solid gray;
    border-top: none;
    height: 5px;
  }
  #layer1 {
    margin: 0 5px;
  }
  #layer2 {
    margin: 0 10px;
  }
}
</style>