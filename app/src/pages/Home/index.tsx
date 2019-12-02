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

type Props = {
    title: string;
    areas: Array<Area>;
    scenics: Array<Scenic>;
    actions: any;
    isLoading: boolean;
};

type State = {
    dataSource: any;
    keyword: string;
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
            dataSource: dataSource,
            keyword: '',
        };
    }

    componentDidMount(){
        this.props.actions.fetchScenics();
        this.props.actions.fetchAreas();
    }

    componentWillReceiveProps(nextProps: Props){
        const {scenics} : Props = nextProps;
        const {dataSource} = this.state;
        this.setState({
            dataSource: dataSource.cloneWithRows(scenics)
        })
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

    render() {
        const {dataSource} = this.state;
        const {isLoading, actions} = this.props;

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
                            dataSource={dataSource}
                            renderRow={this.renderRow}
                            className="area-list xui-list"
                            pageSize={20}
                            useBodyScroll
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