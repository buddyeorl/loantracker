import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';

//icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PaymentIcon from '@material-ui/icons/Payment';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

//components
import InputCell from './InputCell'

//Text style inputs
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

//tree views
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        flexGrow: 1,
        maxWidth: 400,
    },
    margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
}));

function ButtonSizes(props) {
    const classes = useStyles();
  
    return (
        <IconButton aria-label="Remove" type="submit" className={classes.margin} disabled={props.disabled}>
            {props.data}    
        </IconButton>
    )
}

function ControlledTreeView(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);

    const handleChange = (event, nodes) => {
        setExpanded(nodes);
    };
    console.log(props.data)
    console.log(props.data.indexOf('\n'))
    let newData=props.data.split("\n");
    console.log(newData)
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={handleChange}
        >
            <TreeItem nodeId="1" label={newData.length>1? newData.length + ' Machines' :newData[0]  } >
            {newData.map((item,index) =>(
                <TreeItem nodeId={toString(index+1)} label={item} />
            ))}
            </TreeItem>
        </TreeView>
    );
}



class CustomRow extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showInput: true,
                value: '',
                contract: '',
                equipment: '',
                balance: '',
                financed: '',
                monthly: '',
                totFinanced: 0,
                totBalance: 0,
                changeAmount: '',
                reason: ''
            };
    }

    updateData = async (event, contract, next, total, balance, monthly) => {

        event.preventDefault();
        if (balance < 0) {
            console.log('returned')
            return
        }
        console.log('didnt return')
        // Default options are marked with *
        const response = await fetch('/api/update?contract=' + contract + '&next=' + next + '&total=' + total + '&balance=' + balance + '&monthly=' + monthly, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        this.props.getData('/api/all').then(response1 => this.setState({ allData: response1 }))
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    updateContractData = async (event, contract, balance, change, type,financed,monthly) => {
console.log(financed)
console.log(this.state.financed)
        event.preventDefault();
        if (financed === ''){
            financed =this.props.financed
        }
        if (monthly === ''){
            financed =this.props.monthly
        }
        if (type==''){
            type='No memo provided'
        }
        console.log('Updating Conctract Data')
        // Default options are marked with *
        const response = await fetch('/api/updateContract?contract=' + contract + '&balance=' + balance + '&change=' + change + '&type=' + type+ '&financed=' + financed+ '&monthly=' + monthly, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        this.props.getData('/api/all').then(response1 => this.setState({ allData: response1 }))
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    getData = async (url) => {
        console.log('getting data')
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    handleChange(event) {
        console.log(event.target.name)
        console.log(event.target.value)
        if ('financedmonthlychangeAmount'.includes(event.target.name) && isNaN(event.target.value) || 'changeAmount'.includes(event.target.name) && event.target.value.includes(' ')) {
            console.log('Not a Number')
            return
        }
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    getNewDate = (date) => {
        let oldDate = new Date(date);
        let newDate = new Date(oldDate).setMonth(oldDate.getMonth() + 1)
        console.log(newDate)
        let day = new Date(newDate).getDate() + 1;
        let monthIndex = new Date(newDate).getMonth() + 1;
        let year = new Date(newDate).getFullYear();
        return year + '-' + monthIndex + '-' + day
    }

    render() {
        return (

            <TableRow>
                <TableCell>
                    {this.props.contract}
                </TableCell>
                <TableCell><ControlledTreeView data={this.props.equipment}/></TableCell>
                



                <TableCell >{this.state.showInput ? '$' + this.props.financed : <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Financed Amount" name="financed" value={this.state.financed} onChange={(ev) => this.handleChange(ev)} />}
                </TableCell>

                <TableCell >{this.state.showInput ? '$' + this.props.monthly : <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Monthly Amount" name="monthly" value={this.state.monthly} onChange={(ev) => this.handleChange(ev)} />}
                </TableCell>
                {/* <TableCell >${this.props.monthly}</TableCell><TableCell ><input type="text" name="monthly" value={this.state.monthly} onChange={this.handleChange} /></TableCell>} */}

                <TableCell >{this.state.showInput ? this.props.interest + '%' : null}</TableCell>
                <TableCell >{this.state.showInput ? this.props.terms : null}</TableCell>
                <TableCell >{this.state.showInput ? '$' + this.props.total : null}</TableCell>
                <TableCell >{this.state.showInput ? '$' + this.props.balance : <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Increase/Decrease" name="changeAmount" value={this.state.changeAmount} onChange={(ev) => this.handleChange(ev)} />}
                </TableCell>
                <TableCell >{this.state.showInput ? '$' + this.props.start : <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Notes" name="reason" value={this.state.reason} onChange={(ev) => this.handleChange(ev)} />}
                </TableCell>
                {/* <TableCell >{this.props.next}</TableCell> */}
                <TableCell >{this.state.showInput ? this.props.next : null}</TableCell>
                <TableCell ><form onSubmit={(ev) => this.props.updateData(ev, this.props.contract, this.getNewDate(this.props.next), this.props.total + this.props.monthly, this.props.balance - this.props.monthly, this.props.monthly)}>


                    <ButtonSizes data ={<PaymentIcon />} disabled={this.props.balance <= 0}/>

                </form>
                    {/* <form onSubmit={(ev) => this.props.updateContractData(ev, this.props.contract, this.props.balance, 5000, 'Increase Insurance')}> */}
                </TableCell>

                <TableCell>
                <form onSubmit={(ev) => { ev.preventDefault(); this.props.showRecord(this.props.contract) }}>

                    <ButtonSizes data ={ <DescriptionIcon  color="primary"/>}/>
                </form>

                </TableCell>
                <TableCell>
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        if (this.state.showInput) {
                            this.setState({ showInput: !this.state.showInput })
                        } else {
                            this.props.updateContractData(ev, this.props.contract, this.props.balance, this.state.changeAmount, this.state.reason, this.state.financed, this.state.monthly,this.props.financed,this.props.monthly)
                            this.setState({ showInput: !this.state.showInput, reason: '', changeAmount: '',financed:'',monthly:'' })
                        }

                    }
                    }>
                        <Fab type="submit" value="Edit" size='small' color={this.state.showInput ? "secondary" : "primary"} aria-label="edit" disabled={this.props.balance <= 0}>
                            {this.state.showInput ? <EditIcon /> : <CheckIcon />}
                        </Fab>
                        {/* <ButtonSizes data ={this.state.showInput ? <EditIcon color={this.state.showInput ? "secondary" : "primary"} /> : <CheckIcon color={this.state.showInput ? "secondary" : "primary"} />} disabled={this.props.balance <= 0}/> */}

                    </form>
                </TableCell>
                <TableCell ><form onSubmit={(ev) => { ev.preventDefault();  this.props.removeContractData(ev,this.props.contract) }}>

                <ButtonSizes data ={ <DeleteIcon color="secondary" />}/>
       

                </form>
                </TableCell>



            </TableRow>




        )
    }
}


export default CustomRow;