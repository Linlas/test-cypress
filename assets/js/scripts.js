const alpineApp = () => {
    return {
        filter: 'all',
        todo: {
            id: null,
            task: '',
            createdAt: null,
            complete: false
        },
        _todos: [],

        init() {
            this._todos = this._getTodosFromLocalstorate() || []
        },
        
        addNewTodo() {
            const todoTitleElement = document.querySelector('#todo_title')

            if (this.todo.task === '') {
                alert('Digite um título para a tarefa!')
                todoTitleElement.focus()
                return false
            }
        
            this.todo.id = Math.random().toString().split(".")[1]
            this.todo.createdAt = new Date();

            this._todos.push({ ...this.todo })
            this._setTodosToLocalstorage(this._todos)
            this.todo.task = ''
        },

        updateTodo() {
            this._setTodosToLocalstorage(this._todos)
        },

        removeTodo(todo) {
            if (confirm("Tem certeza que deseja remover?")) {
                const index = this._todos.indexOf(todo)
                this._todos.splice(index, 1)
                this._setTodosToLocalstorage(this._todos)
            }
        },

        getFormatedDate(date) {
            return moment(date).format('D/M/Y H:m')
        },

        get filteredTodoList() {
            let orderedTodoList

            switch (this.filter) {
                case 'complete':
                    orderedTodoList = this._todos.filter(todo => todo.complete)
                    break
                case 'incomplete':
                    orderedTodoList = this._todos.filter(todo => !todo.complete)
                    break
                default:
                    orderedTodoList = this._todos
            }

            return orderedTodoList
        },

        _setTodosToLocalstorage(data) {
            localStorage.setItem('todos', JSON.stringify(data))
        },

        _getTodosFromLocalstorate() {
            return JSON.parse(localStorage.getItem('todos'))
        }
    }
}
