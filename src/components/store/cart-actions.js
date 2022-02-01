import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// send phone products
export const sendProducts = (phonesData) => {
  return async (dispatch) => {
    const sendCart = async () => {
      const response = await fetch(
        "https://phones-store-1ad94-default-rtdb.firebaseio.com/phones.json",
        {
          method: "PUT",
          body: JSON.stringify(phonesData),
        }
      );

      if (!response.ok) {
        throw new Error("Error!");
      }
    };

    try {
      sendCart();
    } catch (err) {
      console.log(err.message);
    }
  };
};

// get data
export const getData = () => {
  return async (dispatch) => {
    dispatch(uiActions.show({ value: true, title: "Loading" }));
    const getItems = async () => {
      const response = await fetch(
        "https://phones-store-1ad94-default-rtdb.firebaseio.com/phones.json"
      );

      if (!response.ok) {
        throw new Error("fetch failed!");
      }

      const data = await response.json();
      let products = [];
      for (let i in data) {
        products.push(data[i]);
      }

      return products;
    };

    try {
      const fetchingData = await getItems();

      dispatch(cartActions.setData(fetchingData));
      dispatch(uiActions.show({ value: false, title: "success" }));
    } catch (error) {
      dispatch(uiActions.show({ value: false, title: error.message }));
    }
  };
};

// fetch data
export const fetchData = (cart) => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://phones-store-1ad94-default-rtdb.firebaseio.com/phones.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Error!");
      }
    };

    try {
      fetchCartData();
    } catch (err) {
      console.log(err.message);
    }
  };
};

// send cart data
export const sentData = (cartData) => {
  return async (dispatch) => {
    const sendCart = async () => {
      const response = await fetch(
        "https://phones-store-1ad94-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("Error!");
      }
    };

    try {
      sendCart();
    } catch (err) {
      console.log(err.message);
    }
  };
};

// replace cart
export const replaceCart = () => {
  return async (dispatch) => {
    const getItems = async () => {
      const response = await fetch(
        "https://phones-store-1ad94-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("fetch failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const lists = await getItems();
      dispatch(cartActions.replaceCart(lists || []));
    } catch (err) {
      console.log(err.message);
    }
  };
};
