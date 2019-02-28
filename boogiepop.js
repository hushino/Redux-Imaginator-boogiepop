const thunk = require('redux-thunk').default;
const {createStore, applyMiddleware} = require('redux');
const {createSelector} = require('reselect');
const {produce} = require("immer");

/*const reducer = (state, action)=>{
  switch (action.type) {
      case SAVE_OPERATION:
          return saveOperation(state,action);
      case 'SUMAR':
          return state+1;
      default:
          return state;
  }
};

const initialState = {
    operations: []
};
const myReducer = (state = 0, action) => {
    switch(action.type) {
        case 'sumar':
            return state + 1;
        case 'restar':
            return state - 1;
        default:
            return state;
    }
};*/
// Ejemplo del paso de actions al reducer.
// Pasamos el state y el action a realizar.
//myReducer(0, {type: 'sumar'}); // -> state = 1
//myReducer(1, {type: 'restar'}); // -> state = 0
// export default createStore(reducer,initialState);
// conocer el dolor hace que te percates de de la importancia de la paz
// por eso puedes esforzarte para proteger a los debiles
// definir un estado inicial para evitar NaN y undefined
const myReducer = (state = 'default', action) => {
    //produce(state, draft => {
        switch (action.type) {
            case 0:
                /*draft[0].life = action.stateOfLife.life;*/
                return 1;
            case 0.5:
                return 0.5;
            case 1:
                return 54345;
            default:
                return state;
        }
    //})
};
// middleware in redux
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
};
// middleware in redux
const normalizeStateOfLife = store => next => action => {
    let result = next(action);
    if (action.stateOfLife.life === 0) {
        action.stateOfLife.life++;
        console.log(action.stateOfLife)
    } else {
        console.log('es 1')
    }
    return result
};

const store = createStore(
    myReducer,
    applyMiddleware(logger ,normalizeStateOfLife )
);

// Objeto
const stateOfLifeObject = {
    life: 0
};

function imaginator(stateOfLife) {
    /*switch (stateOfLife) {
        case 'DEAD':
            return console.log('reintentar');
        default:
            return stateOfLife;
    }*/
    return {
        type: stateOfLife.life,
        stateOfLife
    };
}

store.dispatch(imaginator(stateOfLifeObject)); // 0

store.dispatch(imaginator(stateOfLifeObject)); // 1
//console.log(store.getState());

// deben ser funciones por eso el =>
/*
const getVisibilityFilter = state => state;
const getTodos = state => state;

const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return console.log(todos);
            case 'SHOW_COMPLETED':
                return console.log(todos);
            case 'SHOW_ACTIVE':
                return console.log(todos);
            default:
                return console.log('default')
        }
    }
);
getVisibleTodos('SHOW_COMPLETED', 'SHOW_ALL');*/
