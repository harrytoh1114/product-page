import React, { useEffect, useState } from "react";
import im1 from "../../images/image-product-1.jpg";
import im1thumb from "../../images/image-product-1-thumbnail.jpg";
import im2 from "../../images/image-product-2.jpg";
import im2thumb from "../../images/image-product-2-thumbnail.jpg";
import im3 from "../../images/image-product-3.jpg";
import im3thumb from "../../images/image-product-3-thumbnail.jpg";
import im4 from "../../images/image-product-4.jpg";
import im4thumb from "../../images/image-product-4-thumbnail.jpg";
import plus from "../../images/icon-plus.svg";
import minus from "../../images/icon-minus.svg";
import cart from "../../images/icon-cart-white.svg";

import { cartActions } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import classes from "./Product.module.css";
import ProductPopup from "./ProductPopup";

const Product = () => {
  const [isSelected, setIsSelected] = useState(im1);
  const [quantity, setQuantity] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const showDetailPics = useSelector((state) => state.showDetailPics);
  const dispatch = useDispatch();

  const increaseAmountHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const reduceAmountHandler = () => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  const addToCartHandler = () => {
    if (quantity > 0) {
      let item = {
        id: "p1",
        image: "im1thumb",
        name: "Sneaker A",
        quantity: quantity,
        price: 125.0,
      };
      dispatch(cartActions.addToCart(item));
    }
  };

  const detectScreenWidth = () => {
    setWidth(width);
  };

  useEffect(() => {
    window.addEventListener("resize", detectScreenWidth);

    return () => {
      window.removeEventListener("resize", detectScreenWidth);
    };
  }, [width, detectScreenWidth]);

  return (
    <>
      {showDetailPics && <ProductPopup currentPic={isSelected}/>}
      <div className={classes.product}>
        <div className={classes.images}>
          <div
            className={classes["image-main"]}
            onClick={() => {
              dispatch(cartActions.toggleShowDetailPics());
            }}
          >
            <img src={isSelected} alt="" />
          </div>
          <div className={`${classes["image-small"]}`}>
            <div
              className={`${classes["image-wrapper"]} ${
                isSelected === im1 && classes["selected"]
              }`}
            >
              <img
                src={im1thumb}
                alt=""
                onClick={() => {
                  setIsSelected(im1);
                }}
                className={isSelected === im1 ? classes.selected : null}
              />
            </div>
            <div
              className={`${classes["image-wrapper"]} ${
                isSelected === im2 && classes["selected"]
              }`}
            >
              <img
                src={im2thumb}
                alt=""
                onClick={() => {
                  setIsSelected(im2);
                }}
                className={isSelected === im2 ? classes.selected : null}
              />
            </div>
            <div
              className={`${classes["image-wrapper"]} ${
                isSelected === im3 && classes["selected"]
              }`}
            >
              <img
                src={im3thumb}
                alt=""
                onClick={() => {
                  setIsSelected(im3);
                }}
                className={isSelected === im3 ? classes.selected : null}
              />
            </div>
            <div
              className={`${classes["image-wrapper"]} ${
                isSelected === im4 && classes["selected"]
              }`}
            >
              <img
                src={im4thumb}
                alt=""
                onClick={() => {
                  setIsSelected(im4);
                }}
                className={isSelected === im4 ? classes.selected : null}
              />
            </div>
          </div>
        </div>
        <div className={classes.descriptions}>
          <h3 className={classes.company}>Sneaker Company</h3>
          <h1 className={classes.name}>Fall Limited Edition Sneakers</h1>
          <p className={classes.desc}>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className={classes["price-detail"]}>
            <div className={classes.price}>
              <h2 className={classes.discount}>$125.00</h2>
              <p className={classes.original}>$250.00</p>
            </div>
            <div className={classes.percentage}>50%</div>
          </div>
          <div className={classes["add-item"]}>
            <div className={classes["button-box"]}>
              <button className={classes.button} onClick={reduceAmountHandler}>
                <img src={minus} alt="minus" />
              </button>
              <p className={classes.quantity}>{quantity}</p>
              <button
                className={classes.button}
                onClick={increaseAmountHandler}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
            <button
              className={`${classes.button} ${classes.add}`}
              onClick={addToCartHandler}
            >
              <img src={cart} alt="Add to cart" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
