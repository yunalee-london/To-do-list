class Task {
    constructor(data) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.text = data.get('text')
        this.status = 0
    }
}

const state = {
    tasks: []
}
const view = (state) => `
        <section>
        <h1> Tasks </h1>
        <form onsubmit="app.run('add', this); return false;">
            <input name="text" placeholder="add a task"/>
            <button>Add</button>
        </form>  
        </section>
        <section>
            <ul>
                ${state.tasks.map(task => `<li>${task.text} <button type= "button" id='myP' onclick="app.run('done', myFunction());"> Done </button><button onclick="app.run('delete', ${task.id});"> Remove </button></li>`).join("")}
                
            </ul>
        </section>
        
        
`
const update = {
    add: (state, form) => { 
        const data = new FormData(form) // this is how to access data in a form
        const task = new Task(data)
        state.tasks.push(task)
        return state
    },
    done : function myFunction() {
        document.getElementById("myP").style.fontWeight = "900";
      },
    delete: (state, task_id) => {
        for (task of state.tasks) {
            if (task.id == task_id) {
                const done = task
                const index = state.tasks.indexOf(done)
                state.tasks.splice(index, 1)
                return state
            }
        }
    }
    
}



app.start('todoApp', state, view, update) //id of the app element