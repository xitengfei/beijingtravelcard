import React from 'react'
import PropTypes from 'prop-types';
import List from '../../components/List'

import './index.less'

class ResultPanel extends React.Component{
    static propTypes = {
        items: PropTypes.array.isRequired,
    }

    componentDidMount(){
        // console.log('ResultPanel componentDidMount!')
    }

    componentWillUnmount(){
        // console.log('ResultPanel componentWillUnmount!')
    }

    render(){
        const {items} = this.props
        return(
            <div className="result-panel">
                <List>
                    {items.map(item => (
                        <List.Item 
                            key={item.id}
                            {...item}
                        />
                    ))}
                </List>
            </div>
        )
    }
}

export default ResultPanel