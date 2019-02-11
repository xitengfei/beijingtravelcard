import React from 'react'
import {Button } from 'antd'
import PeriodSelect from '../../components/PeriodSelect'
import AreasSelect from '../../components/AreasSelect'
import './index.less'

const ButtonGroup = Button.Group;

class FilterBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checkedAreas: [],
            period: {},
        }
    }

    componentDidMount(){
        const {defaultFilters} = this.props
        this.setState({
            checkedAreas: defaultFilters.checkedAreas,
        })
    }

    filtersChanged = () => {
        const filters = {
            checkedAreas: this.state.checkedAreas,
            period: this.state.period,
        }
        this.props.doFilter(filters);
    }

    onAreaChange = (areas) => {
        this.setState({
            checkedAreas: areas
        }, ()=>{
            this.filtersChanged()
        })
    }

    onPeriodChange = (start, end) => {
        this.setState({
            period: {start, end}
        }, ()=>{
            this.filtersChanged()
        })
    }

    render(){
        return (
            <div className="filter-box">
                <div className="filter-box-body">
                    <div className="filter-group">
                        <h3 className="filter-group-title">时间段</h3>
                        <div className="filter-group-content">
                            <PeriodSelect 
                                onPeriodChange={this.onPeriodChange}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-group-title">区域</h3>
                        <div className="filter-group-content">
                            <AreasSelect
                                areas={this.props.areas}
                                checkedAreas={this.state.checkedAreas}
                                onAreaChange={this.onAreaChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-box-footer">
                    <ButtonGroup>
                        <Button 
                            type="primary"
                            onClick={this.props.onConfirm}
                        >确定</Button>
                        <Button 
                            type="default"
                            onClick={this.props.onCancle}
                        >重置</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

export default FilterBox;