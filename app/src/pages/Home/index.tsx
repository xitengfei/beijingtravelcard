import * as React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ListView, ActivityIndicator } from 'antd-mobile';
import NavBar from "./Nav";
import SideBar from "./SideBar";
import List from "@/components/List";
import homeActions from "@/store/home/actions";
import Area from '@/models/Area';
import Scenic from '@/models/Scenic';
// types
import {RootState} from '@/store';
import "./index.less";

const PAGE_SIZE = 10;

type Props = {
    title: string;
    areas: Array<Area>;
    scenics: Array<Scenic>;
    allScenics: Array<Scenic>;
    actions: any;
    isLoading: boolean;
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
        
        if(allScenics.length && !scenics.length){
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

    renderRow = (rowData: any, sectionId: any, rowId: any) => {
        return (
            <div key={rowId} className="area-item">
                <List.Item {...rowData} />
            </div>
        )
    }

    onEndReached = () => {
        console.log('fire onEndReached');
        const {isLoading, pageIndex, scenics} = this.state;
        const hasMore = scenics.length > pageIndex * PAGE_SIZE;
        if(isLoading || !hasMore) return;

        setTimeout(() => {
            this.setState({isLoading: false, pageIndex: pageIndex + 1})
        }, 800);
    }

    render() {
        const {scenics, dataSource, pageIndex, height} = this.state;
        const {isLoading, actions} = this.props;

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
                                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
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
    const {areas, scenics, filteredScenics, isLoading} = state.homeStore;

    return {
        title: '',
        areas,
        scenics: filteredScenics,
        allScenics: scenics,
        isLoading
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);