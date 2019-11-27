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
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

//components
import InputCell from '../components/InputCell'
import CustomRow from '../components/CustomRow'

//expansion panel
import AdditionalData from '../components/AdditionalData'

//views
import AllRecords from './AllRecords'

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




class AllContracts extends React.Component {
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
        totBalance: 0,
        showingRecord:false,
        whichRecord:'',
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGet = this.handleGet.bind(this);
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

  updateContractData = async (event, contract, balance, change, type,financed,monthly,originalFinanced,originalMonthly) => {

    event.preventDefault();

    console.log('Updating Conctract Data')
    event.preventDefault();
    if (change === ''){
        change=0
    }
    if (financed === ''){
        financed =originalFinanced
    }
    if (monthly === ''){
        monthly =originalMonthly
    }
    if (type==''){
        type='No memo provided'
    }
    // Default options are marked with *
    const response = await fetch('/api/updateContract?contract=' + contract + '&balance=' + balance + '&change=' + change + '&type=' + type+ '&financed=' + financed+ '&monthly=' + monthly, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    this.getData('/api/all').then(response1 => this.props.showAll(response1))
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  removeContractData = async (event, contract) => {
    event.preventDefault();
    console.log('Updating Conctract Data')

    // Default options are marked with *
    const response = await fetch('/api/removeContract?contract=' + contract , {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    this.getData('/api/all').then(response1 => this.props.showAll(response1))
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
    this.getData('/api/all').then(response1 => this.props.showAll(response1))
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

  async handleGet(event) {

    this.getData('/api/all').then(response =>
      this.setState({
        allData: response,
        value: '',
        contract: '',
        equipment: '',
        financed: '',
        monthly: '',
        interest: '',
        terms: '',
        start: '',
        next: '',
      })
    )
    event.preventDefault();
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

  showRecord=(record)=>{
    this.setState({showingRecord:!this.state.showingRecord,whichRecord:record})
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
    let totFinanced = this.props.data.reduce((tot, equipment) => { return tot + parseInt(equipment.financed) }, 0)
    let totBalance = this.props.data.reduce((tot, equipment) => { return tot + parseInt(equipment.balance) }, 0)
    let totMonthly = this.props.data.reduce((tot, equipment) => { return tot + parseInt(equipment.monthly) }, 0)

    return (
      <div className="App"  >
        {this.state.showingRecord?<AllRecords whichRecord={this.state.whichRecord} showRecord={this.showRecord}/>:

          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >Contract</TableCell>
                  <TableCell >Equipment</TableCell>
                  <TableCell >Financed Amount</TableCell>
                  <TableCell >Monthly Amount</TableCell>
                  <TableCell >Interest</TableCell>
                  <TableCell >Terms</TableCell>
                  <TableCell >Total Paid</TableCell>
                  <TableCell >Balance </TableCell>
                  <TableCell >Starting Date</TableCell>
                  <TableCell >Next Payment</TableCell>
                  <TableCell >Pay</TableCell>
                  <TableCell >History</TableCell>
                  <TableCell >Edit</TableCell>
                  <TableCell >Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map(equipment => (
                  <CustomRow 
                  contract={equipment.contract} 
                  equipment={equipment.equipment} 
                  financed={equipment.financed} 
                  monthly={equipment.monthly} 
                  interest={equipment.interest}
                  terms={equipment.terms}
                  total={equipment.total}
                  balance={equipment.balance}
                  start={equipment.start}
                  next= {equipment.next}
                  getData={this.getData}
                  updateData={this.updateData}
                  updateContractData={this.updateContractData}
                  removeContractData={this.removeContractData}
                  showRecord={this.showRecord}
                  />
                  
                ))}

                {totFinanced === 0 ? null :
                  <TableRow>
                    <TableCell><b>Total:</b></TableCell>
                    <TableCell></TableCell>
                    <TableCell><b>${totFinanced}</b></TableCell>
                    <TableCell ><b>${totMonthly}</b></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell > <b>${totBalance}</b></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    
                  </TableRow>

                }



              </TableBody>
            </Table>
          </Paper>
        }
      </div>
    );
  }
}

export default AllContracts;