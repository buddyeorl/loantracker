import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class AllRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                data: [],
            };
    }

    getData = async () => {
        console.log('getting data')
        await fetch('/api/allRecords?loanContract='+this.props.whichRecord, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(response => this.setState({ data: response }))
        //return await response.json(); // parses JSON response into native JavaScript objects
    }

    componentDidMount = () => {
        this.getData().then(() => { console.log(this.state.data) })
    }

    render() {
        const classes = makeStyles({
            root: {
                width: '100%',
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
        });
        return (
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >{this.props.whichRecord}</TableCell>
                        <TableCell >Memo</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Balance</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell>                             <form onSubmit={(ev) => { ev.preventDefault(); this.props.showRecord('back') }}>
                            <Button type="submit" value="Return" variant="outlined" size="small" color="primary">
                                Go Back
                </Button>
                        </form></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.data.map(history => (
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell >{history.type}</TableCell>
                            <TableCell >{history.amountPaid}</TableCell>
                            <TableCell >{history.balance}</TableCell>
                            <TableCell >{history.date}</TableCell>
                        </TableRow>


                    ))

                    }
                </TableBody>

            </Table>

        )
    }
}

export default AllRecords;