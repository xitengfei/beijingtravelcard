import React from 'react'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group

const AreasSelect = props =>{
    
    const options = props.areas.map(item => ({label: item.name, value: item.id}) )

    return(
        <div className="period-select">
            <CheckboxGroup
                options={options}
                value={props.checkedAreas}
                onChange={props.onAreaChange}
            />
        </div>
    )
}

export default AreasSelect