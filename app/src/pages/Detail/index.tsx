import React from 'react';
import {Icon} from 'antd-mobile';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';

import {match} from 'react-router';
import {History} from 'history';
import Scenic from '@/models/Scenic';
import {RootState} from '@/store';

import homeActions from "@/store/home/actions";
import './index.less';

interface OwnProps{
    match: match;
    history: History;
}

interface Props extends OwnProps{
    scenic: Scenic|null;
}

interface State{
    
}

class Detail extends React.Component<Props, State>{
    handleLeftClick = () => {
        const {history} = this.props;
        history.push('/');
    }

    render(){
        const {scenic}: Props = this.props;
        if(!scenic) return null;

        return(
            <div
                className="detail-page"
            >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleLeftClick}
                >{scenic.name}</NavBar>
                <div className="page-content">
                    <iframe 
                        src={scenic.link}
                        title={scenic.name}
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    const {scenics} = state.homeStore;
    const {params}: any = ownProps.match;

    console.log('ownProps', ownProps);
    
    let scenic = null;
    if(params.id && scenics.length){
        scenic = scenics.find(item => params.id === item.id) || null;
    }

    return {
        params,
        scenic,
    };
}

const mapDispatchToProps = (dispatch: any) => {
    dispatch(homeActions.fetchScenics());
    
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);