import { createStore } from 'redux';
import { colorReducer } from './color/colorReducer';

const store = createStore(colorReducer);

export default store;
