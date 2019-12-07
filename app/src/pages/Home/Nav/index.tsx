import React from 'react';
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import Logo from '@/assets/image/yikatong-logo-sm.png';
import "./index.less";

interface Props{
    title: string,
    onRightClick(): void,
    onSearch(keyword: string): void,
}

interface State{
    
}

export default class extends React.Component<Props, State>{
    autoFocusInst: any;

    constructor(props: Props){
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        // this.autoFocusInst.focus();
    }

    render(){
        const {title, onRightClick, onSearch} = this.props;
        return(
            <div
                className="headerNav"
            >
                <NavBar
                    mode="light"
                    icon={<img className="brand" src={Logo} alt="logo" />}
                    rightContent={[
                        <Icon key="1" type="ellipsis" onClick={onRightClick} />,
                    ]}
                >{title}</NavBar>
                <SearchBar 
                    placeholder="输入关键字搜索景区" 
                    ref={ref => this.autoFocusInst = ref}
                    onSubmit={onSearch}
                />
            </div>
        )
    }
}