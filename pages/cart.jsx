import React from 'react';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = React.useState(products)

  async function handleRemoveFromCart(productId){
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    // params (query string)
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const response = await axios.delete(url, payload)
    setCartProducts(response.data)
  }

  async function handleCheckout(){

  }

  return (
    <Segment>
      <CartItemList 
        handleRemoveFromCart={handleRemoveFromCart}
        user={user} products={cartProducts}
      />
      <CartSummary products={cartProducts} handleCheckout={handleCheckout}/>
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { products: []}
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token }}
  const response = await axios.get(url, payload)
  return { products: response.data}
}
export default Cart;
