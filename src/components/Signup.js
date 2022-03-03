import React, { Component } from 'react';
import '../styles/Signup.css';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import history from '../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons'

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

    // function for signing up for an account
    async handleSubmit(e){
        e.preventDefault();

        // Throwing error if password and confirm password doesn't match
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
            // signing up if there is no error with the entered email and password
            await this.context.signup(this.state.email, this.state.password)
            .then(() => {
                // setting the database using firestore
                return db.collection("users").doc(this.context.currentUser.uid).set({
                    id: this.context.currentUser.uid,
                    email: this.context.currentUser.email
            })
            // redirecting to movies page after signing in
            .then(() => {
                history.push("/movies");
                window.location.reload(true);
            })
        })
        }catch{
            // setting up error if couldn't sign up
            this.setState({
                error: "Failed to create account"
            })
        }

        this.setState({
            loading: false
        })
        
    }

    render(){
        return(
            <div>
                {/* app's logo and name */}
                <div style={{marginTop: "2%", marginLeft: "5%", color: "white"}}>
                    <FontAwesomeIcon icon={faVideoCamera} size="3x" color='red'  />
                    <h2 style={{marginTop: -2, color: "white"}}>Universal Cinema</h2>
                </div>

                {/* sign up container with form */}
                <div className='container'>
                    <h1> Sign Up </h1>
                    {this.state.error && <h3 id="error">{this.state.error}</h3>}
                    <form className='form' onSubmit={this.handleSubmit}>
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
                        
                        <button className='submit-btn' disabled={this.state.loading}>Sign Up</button>
                    </form>
                    
                    {/* if already have an account redirecting to login page */}
                    <div className='redirect-link'> Already have an account ? <Link to="/login"> Log In </Link></div>
                </div>
            </div>
        );
    }
}

export default Signup;