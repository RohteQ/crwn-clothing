import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component.js';
import CartItem from '../cart-item/cart-item.component.js'
import { selectCartItems } from '../../store/cart/cart.selector.js';

import { EmptyMessage,
         CartDropDownContainer,
         CartItems,
         
} from './cart-dropdown.styles.jsx';


const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    
    
    
    return(
       <CartDropDownContainer>
        <CartItems>
            {cartItems.length > 0 ? (
                cartItems.map(item => <CartItem 
                    key={item.id} cartItem={item} />)
                    ) : (
                  <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )}   
        </CartItems>
        <Button onClick = {goToCheckoutHandler}> GO TO CHECKOUT</Button>
       </CartDropDownContainer> 
    )
}


export default CartDropdown;