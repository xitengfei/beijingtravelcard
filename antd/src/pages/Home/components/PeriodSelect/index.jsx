import React from 'react'
import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import './index.less'

const {RangePicker} = DatePicker

class PeriodSelect extends React.Component{
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        }, ()=>{
            const {startValue, endValue} = this.state
            if(startValue && endValue){
                this.props.onPeriodChange(startValue, endValue);
            }
        });
    }
    
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    
    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div className="period-select">
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="开始"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    locale={locale}
                />
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                    locale={locale}
                />
            </div>
        );
    }
}

export default PeriodSelect