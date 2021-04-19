import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import 'antd/dist/antd.css';
import Reducer from './_reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore);

ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)}
	>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
