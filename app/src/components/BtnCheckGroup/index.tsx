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
    onChange: (checkedCodes: Array<string>) => void
}

const BtnCheckGroup = function(props: Props){
    const {options, checkedCodes, onChange} = props;

    let allOptions = [{code: 'var$allselected', name:'不限'}].concat(options);

    const handleCheck = (code: string, check: boolean) => {
        let nextCheckedCodes = checkedCodes.slice();
        
        // 不限
        if('var$allselected' === code) {
            nextCheckedCodes = [code];
        }else if(check){
            nextCheckedCodes.push(code);
        }else{
            nextCheckedCodes = nextCheckedCodes.filter(item => code !== item);
        }

        onChange(nextCheckedCodes);
    };

    return(
        <div className="btn-check-group">
            {allOptions.map((option: Option) => {
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
                            handleCheck(code, isToCheck);
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
