import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import ListView from '@/components/test/DemoListView';

export default class RouteConfig extends React.Component<{}, {}>{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/scenic/:id" component={Detail} />
                    <Route path="/test" exact component={ListView} />
                </Switch>
            </BrowserRouter>
        )
    }
}