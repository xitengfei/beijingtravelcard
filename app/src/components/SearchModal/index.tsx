import React from 'react';
import {Modal, SearchBar} from 'antd-mobile';
import './index.less';

interface Props{
    keyword: string,
    visible: boolean,
    placeholder?: string,
    onSearch: (keyword: string) => void,
    onCancel: () => void,
}

interface State{
    keyword: string
}

class SearchModal extends React.Component<Props, State>{
    autoFocusInst: any;

    constructor(props: Props){
        super(props);

        this.state = {
            keyword: props.keyword,
        };
    }

    componentDidMount() {
        // this.autoFocusInst && this.autoFocusInst.focus();
    }

    componentWillReceiveProps(nextProps: Props){
        if(nextProps.visible && !this.props.visible){
            console.log('kk', this.autoFocusInst);
            this.autoFocusInst && this.autoFocusInst.focus();
        }

        this.setState({
            keyword: nextProps.keyword
        });
    }

    handleSearch = (keyword: string) => {
        this.setState({keyword});
        this.props.onSearch(keyword);
    }

    render(){
        const {visible, placeholder, onCancel} = this.props;
        
        return(
            <Modal
                className="search-modal"
                visible={visible}
                transparent
                maskClosable={false}
                footer={[]}
            >
                <SearchBar 
                    placeholder={placeholder}
                    defaultValue={this.props.keyword}
                    ref={ref => ref && ref.focus()}
                    showCancelButton={true}
                    onSubmit={this.handleSearch}
                    onCancel={onCancel}
                />
            </Modal>
        )
    }
}

export default SearchModal;
