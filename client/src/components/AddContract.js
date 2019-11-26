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


//icon Buttons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
  


class AddContract extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                value: '',
                contract: '',
                equipment: '',
                financed: '',
                monthly: '',
                interest: '',
                terms: '',
                start: '',
                next: '',
                allData: [],
                totFinanced: 0,
                totBalance: 0
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    postData = async (url, data) => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
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

    async handleSubmit(event) {
        let data = {
            contract: this.state.contract,
            equipment: this.state.equipment,
            financed: this.state.financed,
            monthly: this.state.monthly,
            interest: this.state.interest,
            terms: this.state.terms,
            total: 0,
            balance: this.state.monthly * this.state.terms,
            start: this.state.start,
            next: this.state.next,
        }
        console.log('here')
        this.postData('/api/addLoan', data).then(response => this.getData('/api/all').then(response =>
            this.setState({
                allData: response
            })
        ))
        event.preventDefault();
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
                        <TableCell >Contract</TableCell>
                        <TableCell >Equipment</TableCell>
                        <TableCell >Financed Amount</TableCell>
                        <TableCell >Monthly Amount</TableCell>
                        <TableCell >Interest</TableCell>
                        <TableCell >Terms</TableCell>
                        <TableCell >Starting Date</TableCell>
                        <TableCell >Next Payment</TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow >
                        <TableCell><input type="text" name="contract" value={this.state.contract} onChange={this.handleChange} /></TableCell>
                        <TableCell><input type="text" name="equipment" value={this.state.equipment} onChange={this.handleChange} /></TableCell>
                        <TableCell><input type="text" name="financed" value={this.state.financed} onChange={this.handleChange} /></TableCell>
                        <TableCell ><input type="text" name="monthly" value={this.state.monthly} onChange={this.handleChange} /></TableCell>
                        <TableCell >
                            {/* <input type="text" name="interest" value={this.state.interest} onChange={this.handleChange} /> */}
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                name="interest" value={this.state.interest} onChange={this.handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={0.5}>0.5%</MenuItem>
                                <MenuItem value={1.0}>1.0%</MenuItem>
                                <MenuItem value={1.5}>1.5%</MenuItem>
                                <MenuItem value={2.0}>2.0%</MenuItem>
                                <MenuItem value={2.5}>2.5%</MenuItem>
                                <MenuItem value={3.0}>3.0%</MenuItem>
                                <MenuItem value={3.5}>3.5%</MenuItem>
                                <MenuItem value={4.0}>4.0%</MenuItem>
                                <MenuItem value={4.5}>4.5%</MenuItem>
                                <MenuItem value={5.0}>5.0%</MenuItem>
                                <MenuItem value={5.5}>5.5%</MenuItem>
                                <MenuItem value={6.0}>6.0%</MenuItem>
                                <MenuItem value={6.5}>6.5%</MenuItem>
                                <MenuItem value={7.0}>7.0%</MenuItem>
                                <MenuItem value={7.5}>7.5%</MenuItem>
                                <MenuItem value={8.0}>8.0%</MenuItem>
                                <MenuItem value={8.5}>8.5%</MenuItem>
                                <MenuItem value={9.0}>9.0%</MenuItem>
                                <MenuItem value={9.5}>9.5%</MenuItem>
                                <MenuItem value={10.0}>10.0%</MenuItem>
                                <MenuItem value={10.5}>10.5%</MenuItem>
                                <MenuItem value={11.0}>11.0%</MenuItem>
                                <MenuItem value={11.5}>11.5%</MenuItem>
                                <MenuItem value={12.0}>12.0%</MenuItem>
                            </Select>

                        </TableCell>
                        <TableCell >
                            {/* <input type="text" name="terms" value={this.state.terms} onChange={this.handleChange} /> */}

                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                name="terms" value={this.state.terms} onChange={this.handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={12}>12 Months</MenuItem>
                                <MenuItem value={24}>24 Months</MenuItem>
                                <MenuItem value={36}>36 Months</MenuItem>
                                <MenuItem value={48}>48 Months</MenuItem>
                                <MenuItem value={60}>60 Months</MenuItem>
                                <MenuItem value={72}>72 Months</MenuItem>
                            </Select>

                        </TableCell>
                        <TableCell >  <TextField
                            id="date"
                            name="start"
                            label="Starting Date"
                            type="date"
                            value={this.state.start}

                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange}
                        /></TableCell>
                        <TableCell >
                            <TextField
                                id="date"
                                name="next"
                                label="Next Payment"
                                type="date"
                                value={this.state.next}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange}
                            />
                        </TableCell>
                        <TableCell >
                            <form onSubmit={this.handleSubmit}>
                                <Fab color="primary" size="small" type="submit" value="Submit" aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </form>
                        </TableCell>
                        <TableCell >

                        

                            <form onSubmit={(ev)=>{ev.preventDefault(); this.getData('/api/all').then(response => this.props.showAll(response))}}>
                                <Button type="submit" value="Show all" variant="outlined" size="small" color="primary" className={classes.margin}>
                                    Show All
                </Button>
                            </form>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        )
    }
}

export default AddContract;