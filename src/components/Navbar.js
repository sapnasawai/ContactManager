import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <React.Fragment>
      <nav className='navbar navbar-dark bg-dark navar-expand-sm'>
          <div className='container'>
              <Link to='/' className="navbar-brand">
                  <i className='fa fa-mobile text-warning fa-2x px-3'/>Contact <span className='text-warning'>Manager</span>
              </Link>
          </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
