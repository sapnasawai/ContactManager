import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <React.Fragment>
      <nav className='navbar navbar-dark bg-dark navar-expand-sm'>
          <div className='container'>
              <Link to='/' className="navbar-brand">
              <h4><i className='fa fa-address-book text-warning  px-3'/>My <span className='text-warning'>ContactBook</span></h4>
              </Link>
          </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
