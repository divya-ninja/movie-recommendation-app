import React, { Component } from 'react';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
    render() {
        return(
            <div>
                <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
        );
    }
}

export default Navbar;