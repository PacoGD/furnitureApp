import api from 'api';
import swal from 'sweetalert2'
// api.url = 'http://localhost:5000/api'
api.url = 'https://polar-hollows-35398.herokuapp.com/api'

const logic = {
    /**
     * Manage cart products
     * 
     * @param {Array} cart The user id.
     * 
     * @returns {[Cart]}
     */

    cart(cart) {
        if (typeof cart !== 'undefined') {
            this._cart = cart

            return
        }
        return this._cart
    },

    addProductToCart(productId) {
        swal({
            title: 'Product added to cart',
            type: 'success',
            animation: false,
            customClass: 'animated pulse'
        })
        let products = this.cart() || []
        products.push(productId)
        this.cart(products)

    },
    removeProductFromCart(index) {
        return Promise.resolve().then(() => {
            const _cart = [...this.cart()]
        
            _cart.splice(index, 1)

            return this.cart(_cart)
        })
    },

    clearProductCart() {
        this.cart(null)

        return true;
    }
}
export default logic