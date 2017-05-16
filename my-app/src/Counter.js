import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const View = (props) => {
    return (
        <p>
            {props.value}
            <button onClick={ props.onIncrement }>Increment</button>
            <button onClick={ props.onDecrement }>Decrement</button>
        </p>
    )
}

const mapStateToProps = (state) => {
    return {
        value: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => {
            dispatch({type: 'INCREMENT'});
        },
        onDecrement: () => {
            dispatch({type: 'DECREMENT'});
        }
    }
}

const CounterView = connect(
    mapStateToProps,
    mapDispatchToProps
)(View);

const Counter = () => {
    const store = createStore(counter);
    return <CounterView store={ store } />;
}

export default Counter;