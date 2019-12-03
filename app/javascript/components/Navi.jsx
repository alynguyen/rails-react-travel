import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';

const Navi = (props) => {
  let nav = props.loggedInStatus ?
    <div className=""> 
      <Link to='/new_post'>
        Add Post
      </Link>
      <button
        className="btn btn-outline-secondary btn-log"
        onClick={props.handleClick}
      >
        Log Out
      </button>
    </div>
  :
    <div className="">
      <Link to='/login'>
        <button className="btn btn-outline-secondary">Log In</button>
      </Link>
      <Link to='/signup'>
        <button className="btn btn-secondary btn-log">Sign Up</button>
      </Link>
    </div>

  // const collapseNav = props.user ?
  //    <div className="hide-link">
  //       <div
  //         className="Navbar-ColLink"
  //         onClick={props.handleLogout}
  //       >
  //         Log Out
  //       </div>
  //     </div>
  //   : 
  //     <div className="hide-link link">
  //       <div className="Navbar-ColLink"><Link to='/login'>Log In</Link></div>
  //       <div className="Navbar-ColLink"><Link to='/signup'>Sign Up</Link></div>
  //     </div>

  return (
    <div className="Navbar">
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to='/'>Travel Blog</Link>
        {nav}
      </nav>
    </div>
  );
}

export default Navi;

{/* <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
<Navbar.Brand>
  <Link to='/' className="Navbar-Brand link"><p className="Navbar-Logo">Hanger Games</p></Link>
</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
<Nav className="mr-auto">
  {collapseNav}
</Nav>
</Navbar.Collapse>
  {nav}
</Navbar> */}

