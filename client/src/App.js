import React from 'react';
import './App.css';

//components
import AddContract from './components/AddContract'
//views
import AllContracts from './views/AllContracts'
import AllRecords from './views/AllRecords'

//expansion panel
import AdditionalData from './components/AdditionalData'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        showView:true,
        showAll:false,
        data:''
      };
  }

showAll=(data)=>{
  console.log(data)
this.setState({showAll:true, data:data})
}

changeView=()=>{
this.setState({showView:!this.state.showView})
}

  render() {
    return (
      <div>
        <AddContract showAll={this.showAll}/>
        {this.state.showAll? this.state.showView?<AllContracts showAll={this.showAll} changeView={this.changeView} data={this.state.data}/>:<AllRecords data={this.state.record}/>  :null}
      </div>
    )

  }
}

export default App;