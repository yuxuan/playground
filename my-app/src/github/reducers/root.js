const initialState = {
    repos: [],
    test: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH':
            return Object.assign({}, state, {
                repos: action.newRepos
            });
        case 'MORE':
            return Object.assign({}, state, {
                repos: [...state.repos, ...action.newRepos]
            });
        case 'TEST':
            return Object.assign({}, state, {
                test: state.test + 1
            });
        default:
            return state;
    }
}