import React from 'react';
import './Todo.css';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { taskEdited: "", arr: [], tasks: { task: "", done: false, editMode: false } }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        // Remove Edit Done
        this.handleOnDone = this.handleOnDone.bind(this);
        this.handleOnEdite = this.handleOnEdite.bind(this);
        this.handleOnRemove = this.handleOnRemove.bind(this);
        // Handel Edited
        this.handleEditInput = this.handleEditInput.bind(this)
        this.handleEditInputSubmit = this.handleEditInputSubmit.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch("https://localhost:44344/todo")
            .then(res => res.json())
            .then((data) => {
                this.setState({ arr: data })
                // console.log(data);
            })
    }


    dataDeleteTask(id){
        fetch(`https://localhost:44344/todo/${id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }
    //////////////////////
    handleOnChange(e) {
        this.setState({ tasks: { task: e.target.value, done: false, editMode: false } })
    }
    handleOnSubmit(e) {
        e.preventDefault();
        this.setState({ arr: [...this.state.arr, this.state.tasks], tasks: { task: "", done: false, editMode: false } })
    }
    handleOnDone(e) {
        e.done = !e.done;
        this.setState({ arr: this.state.arr })
    }
    handleOnEdite(e) {
        e.editMode = !e.editMode;
        this.setState({ arr: this.state.arr, taskEdited: e.task })
    }
    handleOnRemove(e) {
        
        fetch(`https://localhost:44344/todo/${e.id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(()=> this.getData());

        // console.log(e.id);
        // const removeTask = this.state.arr.filter(item => item !== e)
        // this.setState({ arr: removeTask })
    }
    handleEditInput(e) {
        this.setState({ taskEdited: e.target.value })
    }
    handleEditInputSubmit(e) {
        e.preventDefault()
        this.setState((preState) => {
            const EditedBox = preState.arr.filter(item => item.editMode === true)[0];
            EditedBox.task = this.state.taskEdited;
            EditedBox.editMode = !EditedBox.editMode;
            return {
                arr: this.state.arr
            }
        })
    }


    render() {
        return (
            <div id="main">
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" onChange={this.handleOnChange} value={this.state.tasks.task} />
                    <input type="submit" />
                </form>
                <div id="listContainer">
                    {this.state.arr.map(i => {
                        if (!i.editMode) {
                            return (
                                <div id="Listcard">
                                    <div>
                                        <input type="checkbox" checked={i.done} onChange={this.handleOnDone.bind(this, i)} />
                                        <p>{i.task}</p>
                                    </div>
                                    <input type="submit" value="Edit" onClick={this.handleOnEdite.bind(null, i)} />
                                    <input type="submit" value="Remove" onClick={this.handleOnRemove.bind(null, i)} />
                                </div>
                            )
                        } else {
                            return (
                                <div id="Listcard">
                                    <form onSubmit={this.handleEditInputSubmit}>
                                        <input type="text" value={this.state.taskEdited} onChange={this.handleEditInput} />
                                    </form>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}