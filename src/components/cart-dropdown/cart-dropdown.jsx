import React from "react";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Switch,
} from "react-router-dom";
import CustomButton from "../custome-button/custome-button";

import "../cart-dropdown/cart-dropdown.scss";
import { connect } from "react-redux";
import CartItem from "./../cart-item/cart-item.jsx";
const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span>
          <img
            width={240}
            height={220}
            src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
          />
        </span>
      )}
    </div>

    <Link className="option" to="/checkout">
      <CustomButton>CHECKOUT</CustomButton>
    </Link>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});
export default connect(mapStateToProps)(CartDropdown);
