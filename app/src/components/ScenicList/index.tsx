import React from 'react'
import locationIcon from '@/assets/image/location-icon.svg'
import Scenic from '@/models/Scenic'

import './index.less'

interface ListProps {
    children?: React.ElementType,
}

const ScenicList = (props: ListProps) => {
    return (
        <div className="scenic-list">
            {props.children}
        </div>
    )
}

ScenicList.Item = (props: Scenic) => {

    const period = 2 === props.dates.length ? props.dates.join(' - ') : '';
    const isOver = !props.link;
    const locationLink = 'https://www.amap.com/search?query=' + props.name;

    const {name, area, link, imgUrl} = props;

    return (
        <div className={`scenic-list-item ${isOver ? 'isover' : ''}`}>
            <div className="item-title">
                <h3>
                    {link ? 
                        <a 
                            href={props.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >{name}</a> : name
                    }
                </h3>

                <a 
                    href={locationLink} 
                    target="_blank" 
                    className="location" 
                    rel="noopener noreferrer"
                >
                    <img 
                        className="location-img" 
                        src={locationIcon} 
                        alt="case1" 
                    />
                </a>
            </div>
            <div className="item-main">
                <div className="item-meta">
                    <div className="meta-line">
                        <label>景区票价: </label> 
                        <text>{props.price}元</text>
                    </div>
                    <div className="meta-line">
                        <label>接待时间: </label>
                        <text>{props.dateTxt}</text>
                    </div>
                    <div className="meta-line">
                        <label>持卡权益: </label> 
                        <text>{props.notice}</text>
                    </div>
                </div>
                <div className="item-thumb">
                    <a href={props.link} target="_blank" rel="noopener noreferrer">
                        <div className="image" style={{backgroundImage: 'url('+imgUrl+')'}}></div>
                    </a>
                </div>
            </div>
            <div className="item-area">
                <div className="area-name">{area}</div>
            </div>
        </div>
    )
}

export default ScenicList