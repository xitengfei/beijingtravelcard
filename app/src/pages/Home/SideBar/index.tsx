import React, { ReactNode } from 'react';
import { Drawer, Button, DatePicker, List } from 'antd-mobile';
import BtnCheckGroup from '@/components/BtnCheckGroup';
import Area from '@/models/Area';
import Filters from '@/models/Filters';
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
// const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

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

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    handleAreaChange = (checkedAreaIds: Array<string>) => {
        this.setState({checkedAreaIds});
    }

    handleOk = () => {
        this.setState({
            open: false
        });

        const {checkedAreaIds, startDate, endDate} = this.state;
        this.props.applyFilters({
            areas: checkedAreaIds,
            start: startDate,
            end: endDate
        });
    }

    handleReset = () => {
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
                            onChange={this.handleAreaChange}
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
                        onClick={this.handleReset}
                    >重置</Button>
                    <Button 
                        type="primary" 
                        inline
                        onClick={this.handleOk}
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