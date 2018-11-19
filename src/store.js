import rootReducer from './store/rootReducer';
import { createStore } from 'redux';

const store = createStore(rootReducer, {});

export default store;
