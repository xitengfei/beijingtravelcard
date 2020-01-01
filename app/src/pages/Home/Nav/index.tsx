import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import SearchModal from '@/components/SearchModal';
import Menu from '../Menu';
import Logo from '@/assets/image/yikatong-logo-sm.png';
import "./index.less";

interface Props{
    title: string,
    version: string,
    onRightClick(): void,
    onSearch(keyword: string): void,
    setVersion(version: string): void,
}

interface State{
    searchVisible: boolean,
    keyword: string
}

const PlaceHolder = '请输入关键字搜索景区';

export default class extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);

        this.state = {
            searchVisible: false,
            keyword: '',
        };
    }

    handleSearch = (keyword: string) => {
        this.props.onSearch(keyword);
        this.setState({searchVisible: false, keyword});
    }

    handleCancel = () => {
        this.setState({searchVisible: false});
    }

    handleSearchClick = () => {
        this.setState({searchVisible: true});
    }

    handleMenuSelect = (key: string) => {
        console.log('change to version: ', key);
        this.props.setVersion(key);
    }

    render(){
        const {title, version, onRightClick} = this.props;
        const {searchVisible, keyword} = this.state;

        return(
            <div
                className="headerNav"
            >
                <NavBar
                    mode="light"
                    icon={<img className="brand" src={Logo} alt="logo" />}
                    rightContent={
                        <Menu 
                            activeKey={version}
                            onSelect={this.handleMenuSelect}
                        />
                    }
                >{title}</NavBar>

                <div className="search-bar">
                    <div className="input-container" onClick={this.handleSearchClick}>
                        <div className="input">
                            <Icon type="search" />
                            {keyword ? 
                                <span>{keyword}</span> : 
                                <span className="placeholder">{PlaceHolder}</span>
                            }
                        </div>
                    </div>
                    <div className="filter-trigger" onClick={onRightClick}>
                        <span>筛选</span>
                        <span className="iconfont icon-filter"></span>
                    </div>
                </div>

                <SearchModal 
                    visible={searchVisible}
                    keyword={keyword}
                    onSearch={this.handleSearch}
                    onCancel={this.handleCancel}
                    placeholder={PlaceHolder}
                />
            </div>
        )
    }
}