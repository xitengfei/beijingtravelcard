import React from 'react'
import { connect } from 'react-redux'
import { Table, Card } from 'antd'

class RetrievalBox extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        selectedArea:'海淀区',
        selectedStart:'',
        selectedEnd:'',
    }

    getColumns(){
        return [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '景区名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'A级',
            dataIndex: 'level',
            key: 'level',
        }, {
            title: '票价(元)',
            dataIndex: 'price',
            key: 'price',
        }];
    }

    onRangeChange(date, dateString){
        console.log(date, dateString);
    }

    onRangeOK(val){
        console.log('ok', val)
    }

    render(){
        console.log('RetrievalBox render')
        const {scenicSpots} = this.props
        return(
            <div>
                {scenicSpots.length && scenicSpots.map((area, i)=>(
                    <React.Fragment key={i}>
                        <Card title={area.name}>
                            <Table dataSource={area.items} columns={this.getColumns()} />
                        </Card>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

const mapStateToProps = function(store, ownProps){
    return {
        scenicSpots: store.yikatongStore.scenic_spots
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RetrievalBox)