/* eslint no-dupe-keys: 0 */
import React from 'react';
import {ListView} from 'antd-mobile';

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob.push(`row - ${ii}`);
    }
    return dataBlob;
}

const MySectionBodyWrapper = (props) => {
    return (<table className="my-section-body">
        <thead><tr><td>table title</td></tr></thead>
        <tbody>{props.children}</tbody>
    </table>);
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };
    }

    componentDidMount() {
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    onEndReached = (event) => {
        console.log('fire onEndReached');
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = this.rData.concat(genData(++pageIndex));
            this.setState({
                // dataSource: ,
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const renderData = this.rData ? this.state.dataSource.cloneWithRows(this.rData) : this.state.dataSource;

        return (<div>
            <ListView
                // ref={el => this.lv = el}
                dataSource={renderData}
                useBodyScroll
                renderHeader={() => <div style={{ padding: 30 }}>设置了`useBodyScroll`</div>}
                renderFooter={() =>
                    <div style={{ padding: 30 }}>{this.state.isLoading ? 'loading...' : 'loaded'}</div>}
                // renderBodyComponent={() => <div className="for-body-demo" />}
                // renderSectionBodyWrapper={(sectionID) => <MySectionBodyWrapper key={sectionID} />}
                renderRow={(rowData) => (<div style={{ height: 50 }}>
                    <span>{rowData} Let me keep typing here so it wraps at least one line.</span>
                </div>)}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                pageSize={10}
            />
        </div>);
    }
}


export default Demo;