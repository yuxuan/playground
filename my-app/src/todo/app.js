import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const TodoComponent = (props) => {
    return (
        <li>
            { props.complete ? <del> {props.text} </del> : props.text } 
           <button onClick={ (e) => { props.handleRemove(props.id) } }>remove</button>
           <button onClick={ (e) => { props.handleComplete(props.id, props.complete) } }>{ props.complete ? 'Not ': ''} complete</button>
        </li>
    );
}

const TodosComponent = (props) => {
    const { todos } = props;
    return (
        <ul>
            { todos.map( (todo, index) => {
                return (<Todo key={index} id={index} text={todo.text} complete={todo.complete} />)
            })}
        </ul>
    );
}

const AddTodoComponent = (props) => {
    const { handleAdd } = props;
    let input;
    return (
        <form onSubmit={(e) => {
                e.preventDefault();
                if (input.value.trim() === '') {
                    return;
                }
                handleAdd(input.value);
                input.value='';
            } }>
            <input ref={ node => input = node }/>
            <button>Add</button>
        </form>
    );
}

// reducers
const todoApp = (state = [], action = {type:'', text: '', complete:true}) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [ ...state, { text:action.text, complete:false } ];
        case 'REMOVE_TODO':
            return  [ ...state.slice(0, action.index), ...state.slice(action.index+1) ]
        case 'TOGGLE_COMPLETE':
            let item = state[action.index];
            item.complete = action.complete;
            return [ ...state.slice(0, action.index), item, ...state.slice(action.index+1) ]
        default:
            return state;
    }
}

//container
const mapStateToProps = (state) => {
    return {
        todos: todoApp(state)
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        handleAdd: (value) => {
            dispatch({ type: 'ADD_TODO', text:value })
        },
        handleRemove: (index) => {
            dispatch({ type: 'REMOVE_TODO', index })
        },
        handleComplete: (index, complete) => {
            dispatch({type: 'TOGGLE_COMPLETE', index, complete: !complete })
        }
    }
}

const AddTodo = connect(undefined, mapDispatchToPros)(AddTodoComponent);
const Todos = connect(mapStateToProps)(TodosComponent);
const Todo = connect(undefined, mapDispatchToPros)(TodoComponent);


const App = () => {
    const store = createStore(todoApp);
    return (
        <Provider store={ store }>
            <div>
                <AddTodo />
                <Todos />
            </div>
        </Provider>
    );
}
export default App;