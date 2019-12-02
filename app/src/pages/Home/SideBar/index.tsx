import React, { ReactNode } from 'react';
import { Drawer, Button, DatePicker, List } from 'antd-mobile';
import BtnCheckGroup from '@/components/BtnCheckGroup';
import Area from '@/models/Area';
import Filters from '@/models/Filters';
import _ from "lodash";
import "./index.less";

interface Props{
    children: ReactNode,
    title: string,
    areas: Array<Area>,
    ref: React.RefObject<any>,
    applyFilters: (filters: Filters) => void
}
interface State{
    open: boolean,
    checkedAreaIds: Array<string>,
    startDate: Date | undefined,
    endDate: Date | undefined,
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

export default class extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            open: false,
            checkedAreaIds: [],
            startDate: now,
            endDate: now,
        }
    }

    componentDidMount() {
        
    }

    componentWillUpdate(nextProps: Props, nextState: State){
        if(!_.isEqual(this.state, nextState)){
            const {checkedAreaIds, startDate, endDate} = nextState;
            this.props.applyFilters({
                areas: checkedAreaIds,
                start: startDate,
                end: endDate
            })
        }
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    handleAreaCheck = (areaId: string, check: boolean) => {
        let checkedAreaIds = this.state.checkedAreaIds.slice();
        if(check){
            checkedAreaIds.push(areaId);
        }else{
            checkedAreaIds = checkedAreaIds.filter(id => areaId !== id);
        }
        this.setState({checkedAreaIds});
    }

    handleResetBtnClick = () => {
        this.setState({
            checkedAreaIds: [],
            startDate: undefined,
            endDate: undefined,
        });
    }

    renderContent = () => {
        const {areas}:Props = this.props;
        const {checkedAreaIds} = this.state;

        return (
            <div className="sidebar-content">
                <div className="filters">
                    <p className="sub-title">选择区域</p>
                    <div className="areas-list">
                        <BtnCheckGroup 
                            options={areas.map(area => ({code: area.id, name: area.name}))}
                            checkedCodes={checkedAreaIds}
                            onCheck={this.handleAreaCheck}
                        />
                    </div>

                    <p className="sub-title">时间范围</p>
                    <div className="period">
                        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                            <DatePicker
                                mode="date"
                                title="开始日期"
                                extra="Optional"
                                value={this.state.startDate}
                                onChange={date => this.setState({ startDate: date })}
                            >
                                <List.Item arrow="horizontal">起始</List.Item>
                            </DatePicker>

                            <DatePicker
                                mode="date"
                                title="结束日期"
                                extra="Optional"
                                value={this.state.endDate}
                                onChange={date => this.setState({ endDate: date })}
                            >
                                <List.Item arrow="horizontal">截止</List.Item>
                            </DatePicker>
                        </List>
                    </div>
                </div>

                <div className="btn-groups">
                    <Button 
                        inline 
                        style={{ marginRight: '16px' }}
                        onClick={this.handleResetBtnClick}
                    >重置</Button>
                    <Button 
                        type="primary" 
                        inline
                        onClick={this.onOpenChange}
                    >确认</Button>
                </div>
            </div>
        )
    }

    render(){
        const {children}:Props = this.props;
        return(
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                sidebar={this.renderContent()}
                open={this.state.open}
                position={'right'}
                onOpenChange={this.onOpenChange}
            >
                {children}
            </Drawer>
        )
    }
}