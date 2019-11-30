import React from 'react';
import {Button} from 'antd-mobile';
import './index.less';

interface Option{
    code: string,
    name: string
}

interface Props{
    options: Array<Option>,
    checkedCodes: Array<string>,
    onCheck: (code: string, check: boolean) => void
}

const BtnCheckGroup = function(props: Props){
    const {options, checkedCodes, onCheck} = props;

    return(
        <div className="btn-check-group">
            {options.map((option: Option) => {
                const {code, name} = option;
                const isChecked = checkedCodes.includes(code);

                return (
                    <Button 
                        inline
                        key={code}
                        type={isChecked ? 'primary':'ghost'}
                        size="small"
                        className={isChecked ? 'checked':''}
                        onClick={() => {
                            const isToCheck = isChecked ? false : true;
                            onCheck(code, isToCheck);
                        }}
                    >
                        {name}
                    </Button>
                )
            })}
        </div>
    )
}

export default BtnCheckGroup;
