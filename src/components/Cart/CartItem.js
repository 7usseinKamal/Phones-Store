import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartItem = (props) => {
  const { id, title, img, price, total, count } = props.item;

  const dispatch = useDispatch();

  const plusItemHandler = () => {
    dispatch(cartActions.plusItem(id));
  };

  const minusItemHandler = () => {
    dispatch(cartActions.minusItem(id));
  };

  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <div className="row my-1 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", heigth: "5rem" }}
          className="img-fluid"
          alt=""
        />
      </div>
      <div className="col-10 mx-auto col-lg-2 ">
        <span className="d-lg-none">product :</span> {title}
      </div>
      <div className="col-10 mx-auto col-lg-2 ">
        <strong>
          <span className="d-lg-none">price :</span> ${price}
        </strong>
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={minusItemHandler}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={plusItemHandler}>
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2 ">
        <div className=" cart-icon" onClick={deleteItemHandler}>
          <FaTrash />
        </div>
      </div>

      <div className="col-10 mx-auto col-lg-2 ">
        <strong>item total : ${total} </strong>
      </div>
    </div>
  );
};

export default CartItem;
