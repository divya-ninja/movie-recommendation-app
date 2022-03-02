import React, { Component } from 'react';
import '../styles/Signup.css';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

class Signup extends Component {
    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
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

        if(this.state.password !== this.state.passwordConfirm){
            return this.setState({
                error: "Passwords do not match"
            });
        }

        try {
            this.setState({
                error: "",
                loading: true
            });
            await this.context.signup(this.state.email, this.state.password);
            
        }catch{
            this.setState({
                error: "Failed to create account"
            })
        }

        this.setState({
            loading: false
        })
        
    }

    render(){
        // console.log(this.context.signup);
        return(
            <div id='signup-container'>
                <h1> Sign Up </h1>
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
                    
                    <div className='input-divs'>
                        <label htmlFor='password-confirm' style={{fontSize: "1.2rem"}}> <b> Confirm Password: </b> </label> <br />
                        <input
                            type="password"
                            id='password-confirm' 
                            className='input-block'
                            name='passwordConfirm'
                            value={this.state.passwordConfirm}
                            onChange={this.handleChange}
                            required
                        /> 
                    </div>
                    
                    <button id='sign-up-btn' disabled={this.state.loading}>Sign Up</button>
                </form>
                <div> Already have an account ? <Link to="/login"> Log In </Link></div>
            </div>
        );
    }
}

export default Signup;