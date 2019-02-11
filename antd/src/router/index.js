import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "@/pages/Home"

export default class RouteConfig extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}