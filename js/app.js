(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	new Vue({
		el: '#app',
		data: {
			todos: [
				{ id: '1', title: '事项1', completed: true },
				{ id: '2', title: '事项2', completed: false },
				{ id: '3', title: '事项3', completed: false }
			],
			newTodo: '',
			// 一个todo是一个对象，所以声明成null而不是''
			// 下面两个data都是为了存储。一个是存储当前todo 一个是存储当前todo的title
			editingTodo: null,
			titleBeforeEdit: '',
		},
		computed: {
			remaining () {
				return this.todos.filter(todo => !todo.completed).length
			},
			// 用来控制输入框左侧箭头  在全completed之后点亮并进行反选
			// allDone () {
			// 	return this.remaining == 0
			// }
			allDone: {
				// 如果get和set不分开写 allDone就只有getter功能。只有getter功能的话，点击下面的事项列表可以控制上面toggle亮不亮，但是反过来点击toggle却控制不了下面的事项
				get () {
					// 全完成了=remaining为0=get返回值true
					return this.remaining == 0
				},
				// value值是一个input元素当下的(checkbox的)value值，为true表示已经被勾选。要把这个是否已勾选的flag遍历赋值给每个元素
				// toggle跟下面保持一致。toggle亮=下面都选中=value为true；toggle不亮=下面都未选中
				// 场景：下面都选中了->toggle亮->点击toggle变灰->value变为false->value值赋给todo.completed
				// 即：主动操作toggle的时候才会触发set
				set (value) {
					this.todos.forEach(todo => {
						todo.completed = value
					});
				}
			}
		},
		methods: {
			pluralize (word) {
				return word + (this.remaining == 1 ? '' : 's')
			},
			addTodo () {
				var value = this.newTodo.trim()
				if (!value) return
				this.todos.push({ id: this.todos.length + 1, title: value, completed: false })
				this.newTodo = ''
			},
			removeTodo (todo) {
				var index = this.todos.indexOf(todo)
				return this.todos.splice(index, 1)
			},
			removeCompleted () {
				this.todos = this.todos.filter(todo => !todo.completed)
			},
			editTodo (todo) {
				this.editingTodo = todo
				this.titleBeforeEdit = todo.title
			}
		},
		directives: {
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus()
				}
			}
		}
	})
})(window);
