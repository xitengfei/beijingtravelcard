import React from 'react'
import {Icon, AutoComplete} from 'antd'
import './index.less'

class HeaderBox extends React.Component{
    state = {
        dataSource: [],
        keyWord: null,
    }

    handleSelect = (value) => {
        const filters = {
            keyword: value,
        }
        this.props.doFilter(filters)
    }

    handleSearchBtnClick = () => {
        this.props.onSearch(this.state.keyWord)
    }
    
    handleSearch = (value) => {
        if ( !value || value === '' || value === ' ' ) return []

        // search in scenics
        const items = this.props.scenics.filter(item => {
            return item.name.indexOf(value) > -1
        }).map(item => {
            return item.name;
        })

        // search in areas
        const areas = this.props.areas.filter(item => {
            return item.name.indexOf(value) > -1
        })
        if(areas.length){
            areas.map(area => {
                return items.push('查看区域：' + area.name + '的全部结果')
            })
        }

        this.setState({
            dataSource: items,
            keyWord: value,
        });
    }

    render(){
        return (
            <div className="yikatong-header">
                <div className="brand">
                    <div className="logo">
                        <img className="hidden-sm"  src={require("../../img/yikatong-logo.png")} alt="京津冀旅游一卡通" />
                        <img className="hidden-md"  src={require("../../img/yikatong-logo-sm.png")} alt="京津冀旅游一卡通" />
                    </div>
                </div>
                <div className="main">
                    <div className="global-search-wrapper">
                        <AutoComplete
                            className="global-search"
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={this.state.dataSource}
                            onSelect={this.handleSelect}
                            onSearch={this.handleSearch}
                            placeholder="请输入景区名称"
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="filter-btn" onClick={this.props.onClickFilterBtn}>
                        筛选 <Icon type="filter" />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderBox