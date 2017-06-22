import React from 'react';
import { connect } from 'react-redux';
import { test, fetch } from '../actions/actions'

const App = (props) => {
    return (<div>{ props.test } <button onClick={ () => { props.dispatch(test())} }>click</button>
        <button onClick={ () => { props.dispatch(fetch())} }>fetch</button>
        <ul>
            { props.repos.map( item => <li key={item.id}> { item.name } </li> )}
        </ul>
         </div>);
}

function mapStateToProps(state) {
    const { repos, test } = state;
    return {
        repos,
        test
    }
}

export default connect(mapStateToProps)(App);;