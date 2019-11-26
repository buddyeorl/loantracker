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

//components
import InputCell from './InputCell'


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

    updateContractData = async (event, contract, balance, change, type) => {

        event.preventDefault();

        console.log('Updating Conctract Data')
        // Default options are marked with *
        const response = await fetch('/api/updateContract?contract=' + contract + '&balance=' + balance + '&change=' + change + '&type=' + type, {
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
                <TableCell>{this.props.equipment}</TableCell>

                <TableCell>
                    ${this.props.financed}


                </TableCell>
                <TableCell>${this.props.monthly}</TableCell>
                {/* <TableCell >${this.props.monthly}</TableCell><TableCell ><input type="text" name="monthly" value={this.state.monthly} onChange={this.handleChange} /></TableCell>} */}
                <TableCell >{this.props.interest}%</TableCell>
                <TableCell >{this.props.terms}</TableCell>
                <TableCell >${this.props.total}</TableCell>
                <InputCell showInput={this.state.showInput} primary={'$' + this.props.balance} secondary={<div><b><p>Increase/Decrease</p></b> <input type="text" name="changeAmount" value={this.state.changeAmount} onChange={(ev) => this.handleChange(ev)} /> <b><p>Note</p></b> <input type="text" name="reason" value={this.state.reason} onChange={(ev) => this.handleChange(ev)} /></div>} />
                <TableCell >{this.props.start}</TableCell>
                <TableCell >{this.props.next}</TableCell>
                <TableCell ><form onSubmit={(ev) => this.props.updateData(ev, this.props.contract, this.getNewDate(this.props.next), this.props.total + this.props.monthly, this.props.balance - this.props.monthly, this.props.monthly)}>

                    <Fab type="submit" value="Pay" size='small' color="green" disabled={this.props.balance <= 0}>
                        <PaymentIcon />
                    </Fab>

                </form>
                    {/* <form onSubmit={(ev) => this.props.updateContractData(ev, this.props.contract, this.props.balance, 5000, 'Increase Insurance')}> */}
                </TableCell>
                <TableCell ><form onSubmit={(ev) => {ev.preventDefault(); this.props.showRecord(this.props.contract)}}>

                    <Fab type="submit" value="History" size='small' color="#342343" >
                        <DescriptionIcon/>
                    </Fab>

                </form>

                </TableCell>
                <TableCell>
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        if (this.state.showInput) {
                            this.setState({ showInput: !this.state.showInput })
                        } else {
                            this.props.updateContractData(ev, this.props.contract, this.props.balance, this.state.changeAmount, this.state.reason)
                            this.setState({ showInput: !this.state.showInput, reason: '', changeAmount: '' })
                        }

                    }
                    }>
                        <Fab type="submit" value="Edit" size='small' color={this.state.showInput ? "secondary" : "primary"} aria-label="edit" disabled={this.props.balance <= 0}>
                            {this.state.showInput ? <EditIcon /> : <CheckIcon />}
                        </Fab>
                    </form>
                </TableCell>




            </TableRow>




        )
    }
}


export default CustomRow;