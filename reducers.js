export const saveOperation = (state, action)=>({
    ...state,
    operations: state.operations.concat(action.operations)
});
