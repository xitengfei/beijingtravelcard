import * as React from "react";
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
    actions: any;
    isLoading: boolean;
};

type State = {
    scenics: Array<Scenic>,
    dataSource: any;
    keyword: string;
    isLoading: boolean;
    pageIndex: number;
};

class Home extends React.Component<Props, State> {
    lv: React.RefObject<any>;
    sideBarRef: React.RefObject<any>;

    constructor(props: Props){
        super(props);

        this.sideBarRef = React.createRef();
        this.lv = React.createRef();

        const dataSource = new ListView.DataSource({
            getRowData: (dataBlob:any, sectionID: string, rowID: string) => {
                // console.log(dataBlob, sectionID, rowID);
                return dataBlob[sectionID][rowID];
            },
            rowHasChanged: (row1:any, row2:any) => row1 !== row2,
        });

        this.state = {
            scenics: [],
            dataSource,
            keyword: '',
            isLoading: false,
            pageIndex: 1,
        };
    }

    componentDidMount(){
        this.props.actions.fetchScenics();
        this.props.actions.fetchAreas();
    }

    componentWillReceiveProps(nextProps: Props){
        const {scenics} : Props = nextProps;
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

    onEndReached = (event: any) => {
        const {isLoading, pageIndex, scenics} = this.state;
        const hasMore = scenics.length > pageIndex * PAGE_SIZE;
        if(isLoading || !hasMore) return;

        setTimeout(() => {
            this.setState({isLoading: false, pageIndex: pageIndex + 1})
        }, 800);
    }

    render() {
        const {scenics, dataSource, pageIndex} = this.state;
        const {isLoading, actions} = this.props;

        const scenicsToShow = pageIndex * PAGE_SIZE < scenics.length ? scenics.slice(0, pageIndex * PAGE_SIZE) : scenics;
        const renderData = dataSource.cloneWithRows(scenicsToShow);

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
                            dataSource={renderData}
                            renderRow={this.renderRow}
                            className="area-list xui-list"
                            pageSize={10}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={2}
                            useBodyScroll
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
    const {areas, filteredScenics, isLoading} = state.homeStore;

    return {
        title: '',
        areas,
        scenics: filteredScenics,
        isLoading
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);