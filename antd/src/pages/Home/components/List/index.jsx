import React from 'react'
import locationIcon from './img/location-icon.svg'

import './index.less'

const List = props => {
    return (
        <div className="xui-list">
            {props.children}
        </div>
    )
}

List.Item = props => {
    return (
        <div className="xui-list-item">
            <div className="item-meta">
                <span className="icon-id">{props.id}</span>
                <h4 className="meta-title">{props.name}</h4>
                <span className="area">{props.area_name}</span>
                <img className="location" src={locationIcon} alt="case1" />
            </div>
            <div className="item-content">
                <div className="meta-line">
                    <div className="time">时间段：{props.dates}</div>
                    <div className="limit">{props.limit_type}</div>
                </div>
                <div className="meta-line">
                    <div className="price">票价：{props.price}元</div>
                    <div className="level">A级：{props.level ? props.level : '无'}</div>
                </div>

                <p className="description">
                    特别说明: {props.notice}
                </p>
            </div>
        </div>
    )
}

export default List