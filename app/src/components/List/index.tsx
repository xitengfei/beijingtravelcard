import React from 'react'
import locationIcon from './img/location-icon.svg'
import Scenic from '@/models/Scenic'

import './index.less'

interface ListProps {
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
    const isOver = !props.link;
    const locationLink = 'https://www.amap.com/search?query=' + props.name;

    return (
        <div className={`xui-list-item ${isOver ? 'isover' : ''}`}>
            <div className="item-meta">
                <span className="icon-id">{props.id}</span>
                <h4 className="meta-title">
                    {/* {props.link ? <Link to={`/scenic/${props.id}`}>{props.name}</Link> : props.name} */}
                    {props.link ?
                        <a href={props.link} target="_blank" rel="noopener noreferrer">{props.name}</a> :
                        props.name
                    }
                </h4>
                <span className="area">{props.area || '新增景区'}</span>
                <a href={locationLink} target="_blank" className="location" rel="noopener noreferrer">
                    <img className="location-img" src={locationIcon} alt="case1" />
                </a>
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