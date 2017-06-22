import axios from 'axios';

export function test() {
    return {
        type: 'TEST',
    }
}

export function fetch() {
    return dispatch => {
        let url = 'https://api.github.com/repositories?since=364';
        axios.get(url).then(result => {
            dispatch({
                type: 'FETCH',
                newRepos: result.data
            })
        })
    }
}