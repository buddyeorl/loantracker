import React from 'react';
import TableCell from '@material-ui/core/TableCell';

class InputCell extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
        return(
        <TableCell >  
        {this.props.showInput?this.props.primary:this.props.secondary}
        </TableCell>
        )
    }
}

export default InputCell;
