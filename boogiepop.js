const thunk = require('redux-thunk').default;
const {createStore, applyMiddleware} = require('redux');
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
const myReducer = (state, action) => {
    switch (action.type) {
        case 0:
            return state + 1 + ' life 100%';
        case 0.5:
            return state + 0.5;
        default:
            return state;
    }
};
// middleware in redux
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
};
// middleware in redux
const normalizeStateOfLife = next => action => {
    let result = next(action);
    if (action.stateOfLife.life === 0) {
        action.stateOfLife.life++
    } else {
        console.log('es 1')
    }
    return result
};

const store = createStore(
    myReducer,
    applyMiddleware(logger, normalizeStateOfLife)
);

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

store.dispatch(imaginator(stateOfLifeObject));
//console.log(store.getState());
