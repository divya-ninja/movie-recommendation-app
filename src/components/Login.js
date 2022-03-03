import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import history from '../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import '../styles/Signup.css';

class Login extends Component {
    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false,
            isLoggedIn: false
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
            await this.context.login(this.state.email, this.state.password).then(() => {
                history.push("/movies");
                window.location.reload(true);
            })
        }catch{
            this.setState({
                error: "Failed to log in"
            })
        }
        

        this.setState({
            loading: false,
            isLoggedIn: true
        })
        
    }

    render(){
        return(
            <div>
                <div style={{marginTop: "2%", marginLeft: "5%", color: "white"}}>
                    <FontAwesomeIcon icon={faVideoCamera} size="3x" color='red'  />
                    <h2 style={{marginTop: -2, color: "white"}}>Universal Cinema</h2>
                </div>

                <div className='container'>
                    <h1> Log In </h1>
                    {this.state.error && <h3>{this.state.error}</h3>}
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
                        
                        <button className='submit-btn' disabled={this.state.loading}>Log In</button>
                                            
                    </form>
                    <div className='redirect-link'> Need an account ? <Link to="/"> Sign Up </Link></div>
                </div>
            </div>
        );
    }
}

export default Login;