import React, { Fragment, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import {
  fetchData,
  getData,
  replaceCart,
  sentData,
} from "./components/store/cart-actions";
import Navbar from "./components/UI/Navbar";
import Modal from "./components/UI/Modal";
import Loading from "./components/UI/Loading";
// import { storeProducts } from "./data";

const Cart = React.lazy(() => import("./components/Cart/Cart"));
const ProductList = React.lazy(() => import("./components/ProductList"));
const Details = React.lazy(() => import("./components/Details"));
const Default = React.lazy(() => import("./components/Default"));

let initial = true;
let initialTwo = true;

const App = () => {
  const dispatch = useDispatch();
  const ModalOpen = useSelector((state) => state.ui.ModalOpen);
  const modal = useSelector((state) => state.cart.modalItem);
  const items = useSelector((state) => state.cart.items);
  const cartItems = useSelector((state) => state.cart.inCartItems);
  const changed = useSelector((state) => state.cart.changed);

  // useEffect(() => {
  //   dispatch(sendProducts(storeProducts));
  // }, []);

  // get fetching items
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (initialTwo) {
      initialTwo = false;
      return;
    }
    dispatch(fetchData(items));
  }, [dispatch, items]);

  // get cart
  useEffect(() => {
    dispatch(replaceCart());
  }, [dispatch]);

  // sent cart
  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (changed) {
      dispatch(sentData(cartItems));
    }
  }, [dispatch, cartItems, changed]);

  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:productId" element={<Details />} />
          <Route path="*" element={<Default />} />
        </Routes>
      </Suspense>
      {ModalOpen && <Modal modal={modal} />}
    </Fragment>
  );
};

export default App;
