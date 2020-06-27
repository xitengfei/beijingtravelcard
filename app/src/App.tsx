import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@/store/';
import Route from '@/router/';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Route />
        </Provider>
    );
  }

export default App;