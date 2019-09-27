import React, { ReactText, ReactNode } from 'react';
import { Drawer, Button } from 'antd-mobile';
import Area from '../../../models/Area';
import "./index.less";

interface Props{
    children: ReactNode,
    title: string,
    areas: Array<Area>,
    ref: React.RefObject<any>,
}
interface State{
    open: boolean,
    areas?: ReactText[],
}

export default class extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            open: false,
            areas: [],
        }
    }

    componentDidMount() {
        
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    renderContent = () => {
        const {areas}:Props = this.props;

        return (
            <div className="sidebar-content">
                <p className="sub-title">选择区域</p>
                <div className="areas-list">
                    {areas.map((area:Area) => {
                        return (
                            <Button 
                                inline
                                key={area.id}
                                type="ghost"
                                size="small"
                            >
                                {area.name}
                            </Button>
                        )
                    })}
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