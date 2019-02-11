import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './redux/actions'
import { Layout, Drawer, Spin } from 'antd'

import HeaderBox from './containers/HeaderBox'
import FilterBox from './containers/FilterBox'
import ResultPanel from './containers/ResultPanel'
import EventHelper from '@/tools/EventHelper'

import './index.less'

const { Header, Footer, Content } = Layout;

class Home extends React.Component{
    resizeWait = false;
    defaultFilters = {
        checkedAreas: ["87", "90"],
        period: {},
    }

    constructor(props){
        super(props)
        
        this.state = {
            showFilterBox: false,
            filters:{}
        }

        this.pageRef = React.createRef();
    }
    
    componentDidMount(){
        this.props.actions.fetchAreas();
        this.props.actions.fetchScenics();
        
        this.setPageHeight();
        window.addEventListener('resize', this.onResize, false);
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.scenics.length && nextProps.scenics.length){
            this.props.actions.applyFiltersUpdate(this.defaultFilters)
        }
    }

    onResize = () => {
        EventHelper.lazyResize(this.setPageHeight);
    }

    setPageHeight = () =>{
        this.pageRef.current.style.minHeight = window.innerHeight + 'px';
    }

    closeFilterBox = () => {
        this.setState({
            showFilterBox: false,
        })
    }
    openFilterBox = () => {
        this.setState({
            showFilterBox: true,
        })
    }

    render(){
        const {scenics, areas, isFiltering, filterdScenics, actions} = this.props

        return (
            <Layout className="layout-yikatong">
                <Header>
                    <HeaderBox 
                        onClickFilterBtn={this.openFilterBox}
                        scenics={scenics}
                        areas={areas}
                        doFilter={actions.applyFiltersUpdate}
                    />
                </Header>

                <Content>
                    <div className="main-content" ref={this.pageRef}>
                        { isFiltering ? (<Spin />) : (<ResultPanel 
                            items={filterdScenics}
                        />)}
                    </div>
                </Content>

                <Footer>Build By Tengfei.Xi</Footer>

                <Drawer
                    className="filter-box-drawer"
                    placement="right"
                    closable={false}
                    width={600}
                    onClose={this.closeFilterBox}
                    visible={this.state.showFilterBox}
                >
                    <FilterBox
                        scenics={scenics}
                        areas={areas}
                        defaultFilters={this.defaultFilters}
                        onCancle={this.closeFilterBox}
                        onConfirm={this.closeFilterBox}
                        doFilter={actions.applyFiltersUpdate}
                    />
                </Drawer>
            </Layout>
        )
    }
}

const mapStateToProps = (store, ownProps) => {
    const {homeStore} = store
    return {
        scenics: homeStore.scenics,
        areas: homeStore.areas,
        isFiltering: homeStore.isFiltering,
        filterdScenics: homeStore.filterdScenics,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)