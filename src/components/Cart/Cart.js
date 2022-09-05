import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./Cart.module.css";

import im1thumb from "../../images/image-product-1-thumbnail.jpg";
import dustbin from "../../images/icon-delete.svg";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const [showCartContent, setShowCartContent] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setShowCartContent(true);
    } else {
      setShowCartContent(false);
    }
  }, [items]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hi");
  };

  return (
    <div className={classes.cart}>
      <h3 className={classes["cart-header"]}>Cart</h3>
      {showCartContent ? (
        <form onSubmit={submitHandler}>
          {items.map((item) => (
            <div key={item.id} className={classes["cart-content"]}>
              <div className={classes["cart-items-img"]}>
                <img src={im1thumb} alt={item.name}></img>
              </div>
              <div className={classes["cart-items-desc"]}>
                <div className={classes["item-name"]}>{item.name}</div>
                <div className={classes["price-detail"]}>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                  <span>X</span>
                  <span>{item.quantity}</span>
                  <span className={classes.total}>
                    ${parseFloat(item.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
              <div
                className={classes["remove-icon"]}
                onClick={() => {
                  dispatch(cartActions.removeFromCart({id: item.id}));
                }}
              >
                <img src={dustbin} alt="remove" />
              </div>
            </div>
          ))}
          <Button>Checkout</Button>
        </form>
      ) : (
        <p className={classes.empty}>Your Cart is Empty</p>
      )}
    </div>
  );
};

export default Cart;
