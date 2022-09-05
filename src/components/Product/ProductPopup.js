import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./ProductPopup.module.css";

import im1 from "../../images/image-product-1.jpg";
import im1thumb from "../../images/image-product-1-thumbnail.jpg";
import im2 from "../../images/image-product-2.jpg";
import im2thumb from "../../images/image-product-2-thumbnail.jpg";
import im3 from "../../images/image-product-3.jpg";
import im3thumb from "../../images/image-product-3-thumbnail.jpg";
import im4 from "../../images/image-product-4.jpg";
import im4thumb from "../../images/image-product-4-thumbnail.jpg";
import { ReactComponent as Prev } from "../../images/icon-previous.svg";
import { ReactComponent as Next } from "../../images/icon-next.svg";
import { ReactComponent as Close } from "../../images/icon-close.svg";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ProductPopup = ({currentPic}) => {
  const showDetailPics = useSelector((state) => state.showDetailPics);
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(currentPic);

  const prevPicHandler = () => {
    switch (isSelected) {
      case im1:
        setIsSelected(im4);
        break;
      case im2:
        setIsSelected(im1);
        break;
      case im3:
        setIsSelected(im2);
        break;
      case im4:
        setIsSelected(im3);
        break;
      default:
        break;
    }
  };
  const nextPicHandler = () => {
    switch (isSelected) {
      case im1:
        setIsSelected(im2);
        break;
      case im2:
        setIsSelected(im3);
        break;
      case im3:
        setIsSelected(im4);
        break;
      case im4:
        setIsSelected(im1);
        break;
      default:
        break;
    }
  };

  const Overlay = () => {
    return (
      <div className={`${classes.overlay} ${classes.images}`}>
        <div className={classes["image-main"]}>
          <img src={isSelected} alt="" />
          <div
            className={`${classes["navigate"]} ${classes["prev"]}`}
            onClick={prevPicHandler}
          >
            <Prev />
          </div>
          <div
            className={`${classes["navigate"]} ${classes["next"]}`}
            onClick={nextPicHandler}
          >
            <Next />
          </div>
          <div
            className={`${classes["navigate"]} ${classes["close"]}`}
            onClick={() => {
              dispatch(cartActions.toggleShowDetailPics());
            }}
          >
            <Close className={classes.change} />
          </div>
        </div>
        <div className={classes["image-small"]}>
          <div
            className={`${classes["image-wrapper"]} ${
              isSelected === im1 && classes["selected"]
            }`}
            onClick={() => {
              setIsSelected(im1);
            }}
          >
            <span className={classes.hov}></span>
            <img
              src={im1thumb}
              alt=""
              className={isSelected === im1 ? classes.selected : null}
            />
          </div>
          <div
            className={`${classes["image-wrapper"]} ${
              isSelected === im2 && classes["selected"]
            }`}
            onClick={() => {
              setIsSelected(im2);
            }}
          >
            <span className={classes.hov}></span>
            <img
              src={im2thumb}
              alt=""
              className={isSelected === im2 ? classes.selected : null}
            />
          </div>
          <div
            className={`${classes["image-wrapper"]} ${
              isSelected === im3 && classes["selected"]
            }`}
            onClick={() => {
              setIsSelected(im3);
            }}
          >
            <span className={classes.hov}></span>
            <img
              src={im3thumb}
              alt=""
              className={isSelected === im3 ? classes.selected : null}
            />
          </div>
          <div
            className={`${classes["image-wrapper"]} ${
              isSelected === im4 && classes["selected"]
            }`}
            onClick={() => {
              setIsSelected(im4);
            }}
          >
            <span className={classes.hov}></span>
            <img
              src={im4thumb}
              alt=""
              className={isSelected === im4 ? classes.selected : null}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showDetailPics && (
        <>
          {ReactDOM.createPortal(
            <Backdrop
              onClick={() => {
                dispatch(cartActions.toggleShowDetailPics());
              }}
            />,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay></Overlay>,
            document.getElementById("overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default ProductPopup;
