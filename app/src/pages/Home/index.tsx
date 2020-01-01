import * as React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ListView, ActivityIndicator } from 'antd-mobile';
import NavBar from "./Nav";
import SideBar from "./SideBar";
import List from "@/components/List";
import homeActions from "@/store/home/actions";
import Scenic from '@/models/Scenic';
// types
import {RootState} from '@/store';
import "./index.less";

const PAGE_SIZE = 10;

type Props = {
    title: string;
    areas: Array<string>;
    scenics: Array<Scenic>;
    allScenics: Array<Scenic>;
    actions: any;
    isLoading: boolean;
    version: string;
};

type State = {
    scenics: Array<Scenic>,
    dataSource: any;
    keyword: string;
    isLoading: boolean;
    pageIndex: number;
    height: number;
};

function MyBody(props:any) {
    return (
      <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
        {props.children}
      </div>
    );
}

class Home extends React.Component<Props, State> {
    lv: React.RefObject<any>;
    sideBarRef: React.RefObject<any>;
    initLoad: boolean = false;

    constructor(props: Props){
        super(props);

        this.sideBarRef = React.createRef();
        this.lv = React.createRef();

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1:any, row2:any) => {
                return row1 !== row2
            },
        });

        this.state = {
            scenics: props.scenics,
            dataSource,
            keyword: '',
            isLoading: false,
            pageIndex: 1,
            height: 300,
        };
    }

    async componentDidMount(){
        const {actions} = this.props;
        await actions.fetchScenics();
        await actions.fetchAreas();

        let offsetTop = 0;
        let dom = this.lv ? ReactDOM.findDOMNode(this.lv.current) : null;
        if(null !== dom){
            offsetTop = dom.parentNode ? (dom.parentNode as HTMLBaseElement).offsetTop : 0;
        }
        const height = document.documentElement.clientHeight - offsetTop;
        this.setState({height})
    }

    componentWillReceiveProps(nextProps: Props){
        const {scenics, allScenics}: Props = nextProps;
        
        // do initial search/filter, excute only once
        if(!this.initLoad && (allScenics.length && !scenics.length)){
            this.initLoad = true;
            this.props.actions.applyFilters({});
        }

        this.setState({scenics});
    }

    openSideBar = () => {
        this.sideBarRef && this.sideBarRef.current.onOpenChange();
    }

    handleSearch = (value: string) => {
        const {actions}: Props = this.props;
        actions.applyFilters({keyword: value});
    }

    handleSetVersion = async (version: string) => {
        const {actions}: Props = this.props;

        actions.setVersion(version);
        await actions.fetchScenics(true);
        await actions.fetchAreas(true);

        this.props.actions.applyFilters({});
    }

    /**
     * load new data
     */
    onEndReached = () => {
        console.log('fire onEndReached');
        const {isLoading, pageIndex, scenics} = this.state;
        const hasMore = scenics.length > pageIndex * PAGE_SIZE;
        if(isLoading || !hasMore) return;

        setTimeout(() => {
            this.setState({isLoading: false, pageIndex: pageIndex + 1})
        }, 800);
    }

    renderRow = (rowData: any, sectionId: any, rowId: any) => {
        return (
            <div key={rowId} className="area-item">
                <List.Item {...rowData} />
            </div>
        )
    }

    render() {
        const {scenics, dataSource, pageIndex, height} = this.state;
        const {isLoading, actions, version} = this.props;

        const scenicsToShow = pageIndex * PAGE_SIZE < scenics.length ? scenics.slice(0, pageIndex * PAGE_SIZE) : scenics;
        const renderData = scenicsToShow.length ? dataSource.cloneWithRows(scenicsToShow) : dataSource;

        return (
            <div className="page-home">
                <SideBar 
                    title={'搜索'}
                    ref={this.sideBarRef}
                    areas={this.props.areas}
                    applyFilters={actions.applyFilters}
                >
                    <NavBar
                        title={'京津冀一卡通'}
                        onRightClick={this.openSideBar}
                        onSearch={this.handleSearch}
                        version={version}
                        setVersion={this.handleSetVersion}
                    />
                    <div className="page-content">
                        <ListView 
                            ref={this.lv}
                            style={{height, overflow:'auto'}}
                            dataSource={renderData}
                            renderRow={this.renderRow}
                            className="am-list area-list xui-list"
                            pageSize={5}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={20}
                            renderBodyComponent={() => <MyBody />}
                            // useBodyScroll
                            onScroll={() => { console.log('scroll'); }}
                            renderFooter={() => (
                                <div style={{ padding: 30, textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中...' : '已加载完成'}
                                </div>
                            )}
                        />
                    </div>
                </SideBar>
                <ActivityIndicator
                    toast
                    animating={isLoading}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: Props) => {
    const {areas, scenics, filteredScenics, isLoading, version} = state.homeStore;

    return {
        title: '',
        areas,
        scenics: filteredScenics,
        allScenics: scenics,
        isLoading,
        version
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);