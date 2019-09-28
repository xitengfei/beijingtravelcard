import * as React from "react";
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ListView } from 'antd-mobile';
import NavBar from "./Nav";
import SideBar from "./SideBar";
import List from "../../components/List";

import * as homeActions from "../../store/home/actions";

import Area from '../../models/Area';
import Scenic from '../../models/Scenic';

// types
import {RootState} from '../../store';
import "./index.less";

type Props = {
    title: string;
    areas: Array<Area>;
    scenics: Array<Scenic>;
    actions: any;
};

type State = {
    dataSource: any;
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
                console.log(dataBlob, sectionID, rowID);
                return dataBlob[sectionID][rowID];
            },
            rowHasChanged: (row1:any, row2:any) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource
        };
    }

    componentDidMount(){
        this.props.actions.fetchScenics();
        this.props.actions.fetchAreas();
    }

    componentWillReceiveProps(nextProps: Props){
        const {scenics} : Props = nextProps;
        let dataBlob:any = {};
        scenics.forEach((scenic: Scenic, index: number) => {
            dataBlob[index] = scenic;
        });

        const dataSource = this.state.dataSource.cloneWithRows(dataBlob);
        this.setState({
            dataSource
        })
    }

    openSideBar = () => {
        this.sideBarRef && this.sideBarRef.current.onOpenChange();
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
        return (
            <div className="page-home">
                <SideBar 
                    title={'搜索'}
                    ref={this.sideBarRef}
                    areas={this.props.areas}
                >
                    <NavBar
                        title={'京津冀一卡通'}
                        onRightClick={this.openSideBar}
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
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: Props) => {
    const {areas, scenics} = state.homeStore;

    return {
        title: '',
        areas,
        scenics,
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);