import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        const newQty = eachItem.quantity + 1
        return {...eachItem, quantity: newQty}
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  addCartItem = item => {
    this.setState(pvrState => ({cartList: [...pvrState.cartList, item]}))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterdData = cartList.filter(eachItem => eachItem.dishId !== id)
    this.setState({cartList: filterdData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        const newQty = eachItem.quantity - 1
        return {...eachItem, quantity: newQty}
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
