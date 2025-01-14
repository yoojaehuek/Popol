import React from 'react';
import '../scss/Cart.scss';
import axios from 'axios';
import { getCookie } from '../cookie';
import CartProd from './CartProd';
import { useAsyncRetry } from 'react-use'
import { API_URL } from '../config/contansts'


const Cart = () => {
	const user = getCookie('login');

	const getCart = async () => {
		const res = await axios.get(`${API_URL}/cart?userId=${user}`);
		return res.data;
	}

	const state = useAsyncRetry(getCart);
	const { loading, error, value: cartProds, retry } = state
	if (loading) return <div>로딩중..</div>
  if (error) return <div>Error Occured: {error.message}</div>
  if (!cartProds) return <button onClick={retry}>불러오기</button>

	let sumPrice = 0;
	cartProds.map(cartProd => sumPrice = sumPrice + (cartProd.quantity * cartProd.Product.price));
	console.log("sumPrice: ", sumPrice);

  return(
    <>
			<div class="cart1">
				<div class="jang">
					<h2>장바구니</h2>
				</div>

				<div class="apple">
					<h3>택배배송 상품:{cartProds.length}개</h3>
					{
						cartProds!='' ? 
							cartProds.map(cartProd => <CartProd key={cartProd.cartNum} cartProd={cartProd}></CartProd>) 
							: 
							<div class="cart2">
								<div class="cart3">
									<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
									<span class="material-symbols-outlined">shopping_cart_checkout</span>
									<p>장바구니에 담긴 상품이 없습니다.</p>
								</div>
							</div>
					}
				</div>
				
			
			<div class="cart4">
		< link rel = "stylesheet"
						href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
					< span class = "material-symbols-outlined" >
						local_mall </span>
					<h4>전체상품: {cartProds.length}개</h4>
		<dl>
			<dt><span>주문금액</span></dt>
			<dd><em>{sumPrice}</em><span>원</span></dd>
		</dl>
		{/* <dl>
			<dt><span>상품할인</span></dt>
			<dd>-<em>0</em><span>원</span></dd>
			<dl>
				<dt><span>배송비</span></dt>
				<dd>+<em>0</em><span>원</span></dd>
			</dl>
		</dl> */}
		<div class="cart4-1">
			<dl>
				<dt><span>결제예정금액</span></dt>
				<dd><em>{sumPrice}</em><span>원</span></dd>
			</dl>
						<button>주문하기</button>
						<br></br>
						<button>선물하기</button>
		</div>
			</div>
				
			</div>
			
			
    </> 
  )
}


export default Cart; 