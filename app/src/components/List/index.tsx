import React from 'react'
import {Link} from 'react-router-dom';
import locationIcon from './img/location-icon.svg'
import Scenic from '@/models/Scenic';

import './index.less'

interface ListProps{
    children?: React.ElementType,
}

const List = (props: ListProps) => {
    return (
        <div className="xui-list">
            {props.children}
        </div>
    )
}

List.Item = (props: Scenic) => {
    
    const period = 2 === props.dates.length ? props.dates.join(' - ') : '';

    return (
        <div className="xui-list-item">
            <div className="item-meta">
                <span className="icon-id">{props.id}</span>
                <h4 className="meta-title">
                    {/* <a href={props.link} title={props.name}>{props.name}</a> */}
                    <Link to={`/scenic/${props.id}`}>{props.name}</Link>
                </h4>
                <span className="area">{props.area}</span>
                <img className="location" src={locationIcon} alt="case1" />
            </div>
            <div className="item-content">
                <div className="meta-line">
                    <div className="time">时间段：{period}</div>
                    <div className="limit">{props.limit}</div>
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