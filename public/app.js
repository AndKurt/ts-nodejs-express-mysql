const vuetify = new Vuetify()
new Vue({
  el: '#app',
  vuetify,
  data() {
    return {
      isDark: false,
      show: true,
      todoTitle: '',
      todos: [],
    }
  },
  created() {
    const query = `
    query {
      getTodos {
        id title done createdAt updatedAt
      }
    }
    `
    fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((response) => (this.todos = response.data.getTodos))
      .catch((e) => console.log(e))
    //fetch('/api/todo', { method: 'get' })
    //  .then((res) => res.json())
    //  .then((todos) => (this.todos = todos))
    //  .catch((e) => console.log(e))
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }
      const query = `
      mutation {
        createTodo (todo: {title: "${title}"}) {
          id title done createdAt updatedAt
        }
      }
      `
      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((response) => {
          this.todos.push(response.data.createTodo)
          this.todoTitle = ''
        })
        .catch((e) => console.log(e))
      //fetch('/api/todo', {
      //  method: 'post',
      //  headers: { 'Content-Type': 'application/json' },
      //  body: JSON.stringify({ title }),
      //})
      //  .then((res) => res.json())
      //  .then(({ todo }) => {
      //    this.todos.push(todo)
      //    this.todoTitle = ''
      //  })
      //  .catch((e) => console.log(e))
    },
    removeTodo(id) {
      const query = `
        mutation {
          deleteTodo(id: "${id}") 
        }
      `
      fetch('/api/todo/' + id, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id)
        })
        .catch((e) => console.log(e))
    },
    //  fetch('/api/todo/' + id, { method: 'delete' })
    //    .then(() => {
    //      this.todos = this.todos.filter((t) => t.id !== id)
    //    })
    //    .catch((e) => console.log(e))
    //},
    completeTodo(id) {
      const query = `
        mutation {
          completeTodo(id: "${id}") {
            updatedAt
          }
        }
      `

      fetch('/graphql' + id, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((response) => {
          const index = this.todos.findIndex((t) => t.id === id)
          console.log(response.data.completedTodo.updatedAt)
          this.todos[index].updatedAt = response.data.completedTodo.updatedAt
        })
        .catch((e) => console.log(e))
    },
    //  fetch('/api/todo/' + id, {
    //    method: 'put',
    //    headers: { 'Content-Type': 'application/json' },
    //    body: JSON.stringify({ done: true }),
    //  })
    //    .then((res) => res.json())
    //    .then(({ todo }) => {
    //      console.log(todo)
    //      const index = this.todos.findIndex((t) => t.id === todo.id)
    //      this.todos[index].updatedAt = todo.updatedAt
    //    })
    //    .catch((e) => console.log(e))
    //},
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }

      if (withTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
    },
  },
})
