import React from 'react'
import {Table } from 'antd'

import './index.less'

class ResultTablePanel extends React.Component{
    pagination = {
        dataLength: 0,
        currentPageItems: [],
    }

    state = {
        currentPage: 1,
        pageSize: 10,
    }

    constructor(props){
        super(props)

        this.getColumns = this.getColumns.bind(this)
        this.setCurrentPageItems = this.setCurrentPageItems.bind(this)
    }

    componentDidMount(){
        console.log('ResultPanel componentDidMount!')
    }

    componentWillUnmount(){
        console.log('ResultPanel componentWillUnmount!')
    }

    getColumns(){
        let prevRow = null
        let isOdd = true
        return [{
            title: '区域',
            dataIndex: 'area_name',
            render: (value, row, index)=>{
                // reset for a new page
                if(index === 0) { 
                    prevRow = null
                    isOdd = true
                }

                // show area name
                let rowspan = 0
                let className = ''
                if(!prevRow || prevRow.area_name !== row.area_name){
                    const {currentPageItems} = this.pagination
                    rowspan = currentPageItems.filter(item => item.area_name === row.area_name).length
                    className = 'area_name' + (isOdd?' odd':' even')
                    isOdd = !isOdd
                }

                // set previous row
                prevRow = row

                return {
                    children:value,
                    props:{
                        rowSpan: rowspan,
                        className: className,
                    }
                }
            }
        },{
            title: '序号',
            dataIndex: 'id',
        }, {
            title: '景区名称',
            dataIndex: 'name',
        }, {
            title: 'A级',
            dataIndex: 'level',
        }, {
            title: '票价(元)',
            dataIndex: 'price',
        }, {
            title: '时间段',
            dataIndex: 'date',
        }];
    }

    setCurrentPageItems(page, pageSize){
        let start = pageSize * (page -1)
        let end = start + pageSize
        end = end < this.pagination.dataLength ? end : this.pagination.dataLength
        this.pagination.currentPageItems = this.props.dataItems.slice(start, end)
    }

    render(){
        const {dataItems} = this.props
        this.pagination.dataLength = dataItems.length
        this.setCurrentPageItems(this.state.currentPage, this.state.pageSize)

        return(
            <div className="result-panel">
                <Table 
                    rowKey="id"
                    dataSource={dataItems} 
                    columns={this.getColumns()}
                    pagination={{
                        current: this.state.currentPage,
                        pageSize: this.state.pageSize,
                        onChange: (currentPage, pageSize) => {
                            this.setState({currentPage: currentPage, pageSize: pageSize})
                        },
                        showSizeChanger: true,
                        onShowSizeChange: (currentPage, pageSize) => {
                            this.setState({ currentPage : 1, pageSize: pageSize })
                        }
                    }}
                    bordered
                />
            </div>
        )
    }
}

export default ResultTablePanel