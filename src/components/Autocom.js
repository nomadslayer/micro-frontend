import React, { Component } from 'react';  
import axios from 'axios'; 
import TextField from '@material-ui/core/TextField';  
import Autocomplete from '@material-ui/lab/Autocomplete'; 

class AutoCom extends Component {

    // initialize state to hold validity of form fields
    constructor(props) {
      super(props);
      this.state = { 
        Users: [] 
      };
    }

    componentDidMount() { 
        const token = sessionStorage.getItem('token');

        if (!token) {
          return Promise.resolve(false);
        }
        console.log(token); 
        axios.get('https://micro-authentication.herokuapp.com/user/getAllUsers', {
         headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
            this.setState({Users: response.data})
        })       
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
        return(
            <div>
                <Autocomplete className="pding"  
                        id="combo-box-demo"  
                        options={this.state.Users}  
                        getOptionLabel={option => option.name}  
                        style={{ width: 1000 }}  
                        renderInput={params => (  
                        <TextField {...params} label="Auto Complete" variant="outlined" fullWidth />)}  
                />  
            </div>
        )
    }
}

export default AutoCom