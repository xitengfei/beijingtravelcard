import React from 'react';
import { Popover, Icon } from 'antd-mobile';

const Item = Popover.Item;

interface Props{
    activeKey: string,
    onSelect: (node: any) => void
}

const Menu = function(props: Props){
    return (
        <Popover 
            // mask
            // visible={this.state.visible}
            overlay={[
              (<Item key="2019">2019版景区目录</Item>),
              (<Item key="2020">2020普通版景区目录</Item>),
              (<Item key="2020-union">2020联合卡景区目录</Item>)
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
            }}
            // onVisibleChange={this.handleVisibleChange}
            onSelect={props.onSelect}
          >
            <div 
                style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Icon type="ellipsis" />
            </div>
        </Popover>
    )
}

export default Menu;
