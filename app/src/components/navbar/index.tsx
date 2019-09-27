import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

interface Props{
    title: string,
}

export default class extends React.Component<Props, object>{
    render(){
        const {title} = this.props;
        return(
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >{title}</NavBar>
        )
    }
}