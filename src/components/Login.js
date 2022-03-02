import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import history from '../history';

class Login extends Component {
    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // function to keep a track of the changes in the input through react state
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    async handleSubmit(e){
        e.preventDefault();

        try {
            this.setState({
                error: "",
                loading: true
            });
            const success = await this.context.login(this.state.email, this.state.password)
            success && history.push("/home");
            this.setState({
                loading: false
            })
        }catch{
            this.setState({
                error: "Failed to log in"
            })
        }

        this.setState({
            loading: false
        })
        
    }

    render(){
        return(
            <div id='signup-container'>
                <h1> Log In </h1>
                {this.state.error && <h3>{this.state.error}</h3>}
                <form id='signup-form' onSubmit={this.handleSubmit}>
                    <div className='input-divs'>
                        <label htmlFor='email' style={{fontSize: "1.2rem"}}> <b>Email: </b> </label> <br />
                        <input
                            type="email"
                            id='email' 
                            className='input-block'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    
                    <div className='input-divs'>
                        <label htmlFor='password' style={{fontSize: "1.2rem"}}> <b>Password: </b> </label> <br />
                        <input
                            type="password"
                            id='password' 
                            className='input-block'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    
                    <button id='sign-up-btn' disabled={this.state.loading}>Log In</button>
                </form>
                <div> Need an account ? <Link to="/"> Sign Up </Link></div>
            </div>
        );
    }
}

export default Login;