import React, {useState} from 'react';
import { Popover, Icon } from 'antd-mobile';

const Item = Popover.Item;
const versions = [
    {key: '2019', name: '2019版景区目录'},
    {key: '2020', name: '2020普通版景区目录'},
    {key: '2020-union', name: '2020联合卡景区目录'},
]

interface Props{
    activeKey: string,
    onSelect: (key: string) => void
}

const Menu = function(props: Props){

    const [visible, setVisible] = useState(false);

    const overlay = versions.map(item => {
        const isActive = item.key === props.activeKey;
        return (
            <Item 
                key={item.key}
                style={{color: isActive ? 'red':'#666'}}
            >{item.name}</Item>
        )
    });

    const handleSelect = (node: any) => {
        if(node.key !== props.activeKey){
            props.onSelect(node.key);
            setVisible(false);
        }
    }

    return (
        <Popover 
            // mask
            visible={visible}
            overlay={overlay}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
            }}
            onVisibleChange={setVisible}
            onSelect={handleSelect}
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
