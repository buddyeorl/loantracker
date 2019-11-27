import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

//icon Buttons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

// Input Field
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    textField: {
        '& > *': {
            margin: theme.spacing(1),
            width: 150,
        },
    },
    textField1: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        minWidth: 80,
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
        console.log(Number(event.target.value))
        console.log('financedmonthly'.includes(event.target.name))
        if ('financedmonthly'.includes(event.target.name) && isNaN(event.target.value) || 'financedmonthly'.includes(event.target.name) && event.target.value.includes(' ')) {
            console.log('Not a Number')
            return
        }
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
        this.postData('/api/addLoan', data).then(response => this.getData('/api/all').then(response => {
            this.setState({
                contract: '',
                equipment: '',
                financed: '',
                monthly: '',
                interest: '',
                terms: '',
                start: '',
                next: '',
            });
            this.props.showAll(response)
        }
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
                <TableBody>

                    <TableRow >
                        <TableCell><TextField id="standard-basic" label="Contract" name="contract" value={this.state.contract} onChange={this.handleChange} /></TableCell>
                        <TableCell>       
                        <TextField
          id="standard-multiline-flexible"
          label="Equipment"
          multiline
          rowsMax="10"
          name="equipment"
          value={this.state.equipment}
          onChange={this.handleChange}
          className={classes.textField1}
          margin="normal"
        />
                        </TableCell>
                        {/* <TableCell><TextField id="standard-basic" label="Equipment" name="equipment" value={this.state.equipment} onChange={this.handleChange} /> </TableCell> */}
                        <TableCell><TextField id="standard-basic" label="Financed Amount" name="financed" value={this.state.financed} onChange={this.handleChange} /></TableCell>
                        <TableCell ><TextField id="standard-basic" label="Monthly Payment" name="monthly" value={this.state.monthly} onChange={this.handleChange} /></TableCell>
                        <TableCell className={classes.selectEmpty} >
                            {/* <input type="text" name="interest" value={this.state.interest} onChange={this.handleChange} /> */}
                            <FormControl className={classes.formControl} >
                                <InputLabel>Interest</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    name="interest" value={this.state.interest} onChange={this.handleChange}
                                >
                                    <MenuItem value="" ><em>None</em></MenuItem>
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
                                <FormHelperText>Select Rates</FormHelperText>
                            </FormControl>

                        </TableCell>
                        <TableCell >
                            <FormControl className={classes.formControl} >
                            <InputLabel >Terms</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    name="terms" value={this.state.terms} onChange={this.handleChange}
                                >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={12}>12 Months</MenuItem>
                                <MenuItem value={24}>24 Months</MenuItem>
                                <MenuItem value={36}>36 Months</MenuItem>
                                <MenuItem value={48}>48 Months</MenuItem>
                                <MenuItem value={60}>60 Months</MenuItem>
                                <MenuItem value={72}>72 Months</MenuItem>
                            </Select>
                            <FormHelperText>Select Terms</FormHelperText>
                            </FormControl>
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
                                label="First Payment"
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



                            <form onSubmit={(ev) => { ev.preventDefault(); this.getData('/api/all').then(response => this.props.showAll(response)) }}>
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