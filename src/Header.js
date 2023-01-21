import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link, Router, Switch} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import {auth} from './firebase';

function Header() {
  const [{basket,user},dispatch]=useStateValue();
  const handleauthentication=()=>{
    if(user){
      auth.signOut();
    }
  }
  return (
    <div className="header">
    <Link to='/'>
      <img
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        className="header_logo"
      ></img></Link>
      <div className="header_search">
        <input type="text" className="header_searchinput" />
        <SearchIcon className='header_searchicon'/>
      </div>
      <div className="header_nav">
      <Link to={!user && './login'}>
        <div onClick={handleauthentication} className="header_option">
          <span className="header_optionlineon">Hello {!user ? 'Guest' : user.email}</span>
          <span className="header_optionlinetw">{user ? "Sign Out" : "Sign In"}</span>
        </div>
        </Link>
        <Link to='/orders'>
        <div className="header_option">
          <span className="header_optionlineon">Returns</span>
          <span className="header_optionlinetw">& Orders</span>
        </div>
        </Link>
        
        <div className="header_option">
          <span className="header_optionlineon">Your</span>
          <span className="header_optionlinetw">Prime</span>
        </div>
      <Link to='/checkout'>
        <div className="header_optionbasket">
              <ShoppingBasketIcon/>
              <span className="header_optiontw header_basketcount">
              {basket?.length}
              </span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
 