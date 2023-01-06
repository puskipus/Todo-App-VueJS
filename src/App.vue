<template>
  <div class="todo">
    <div class="title has-text-centered">Todo App</div>

    <form @submit.prevent="addTodo" action="">
      <div class="field has-addons ml-6 mb-5">
        <div class="control">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a Todo" />
        </div>
        <div class="control">
          <button :disabled="!newTodoContent" class="button is-info">Add</button>
        </div>
      </div>
    </form>

    <div :class="{ 'has-background-success-light': todo.done }" v-for="todo in todos" :key="todo" class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': todo.done }">{{ todo.content }}</div>
            <div class="column is-5 has-text-right">
              <button @click="toggleDone(todo.id)" class="button" :class="todo.done ? 'is-success' : 'is-light'">&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

const todos = ref([
  // {
  //   id: "id1",
  //   content: "Wipe floor",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "Wash my clothes",
  //   done: true,
  // },
]);

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = "";
};

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import "bulma\css\bulma.min.css";

.todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
