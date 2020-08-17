<template>
        <div>
            <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>   

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask()">
                                <div class="form-group">
                                    <input v-model="task.title" type="text" name="" placeholder="Insert a Task" class="form-control">
                                </div>

                                <div class="form-group">
                                    <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Insertar descripción"></textarea>
                                </div>
                                <template v-if="this.edit === false">
                                    <button class="btn btn-primary btn-block">
                                        Send
                                    </button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-secondary btn-block">
                                        Edit
                                    </button>                                    
                                </template>                                
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" :key="tasks.indexOf(task)">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                                    <button @click="updateTask(task._id)" class="btn btn-secondary">
                                        Edit
                                    </button>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>                    
                </div>                    
            </div>
        </div>
    </div>     
</template>

<script>
    class Task {
        constructor(title,description) {
            this.title = title;
            this.description = description;            
        }
    }
export default {    
    data() {
        return {
            task: new Task(),
            tasks: [],
            edit: false,   
            taskId: ''                      
        }
    },
    created() {
        this.getTasks();
    },
    methods: {        
        sendTask() {
            if(this.edit) {
                fetch(`/api/tasks/${this.taskId}`,{
                    method:"PUT",
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => this.getTasks())

                this.task = new Task();
            }else{
                fetch('/api/tasks',{
                    method: "POST",
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => this.getTasks())

                this.task = new Task();
            }            
        },
        getTasks() {
            fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                    console.log(this.tasks)
                })
        },
        deleteTask(id) {
            console.log(id)
            fetch(`/api/tasks/${id}`,{
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                }
            })
            .then((res) => res.json())
            .then(data =>  this.getTasks())
        },
        updateTask(id) {
            console.log(id)
            fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.task = new Task(data.title,data.description);
                this.taskId = data._id;
                this.edit = true;                
            })
        }
    }   
}
</script>