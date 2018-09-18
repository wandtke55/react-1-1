import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Product from './Components/Product'
import CartItem from './Components/CartItem'

class App extends Component {
  constructor(){
    super();

    this.state={
        apiKey: '705d3f6e',
        cart: [],
        address: '',
        creditCard: '',
        magical: [
        { 
          id: 1,
          imageUrl:'https://d3e1o4bcbhmj8g.cloudfront.net/photos/464016/huge/98d6bb71d7e556c4ecc0d5cbe0a30df0a87380cd.jpg',
          title: 'Magical Apple',
          price: 99.99,
          description: 'This Magical Apple will make you the luckiest person alive',
          quantity: 0
        },
        {
          id: 2,
          imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31MNT3D8XVL._SX425_.jpg',
          title: 'Harry Potters Wand',
          price: 100000000.00,
          description: 'Recieve the real wand that does the real magic!!!',
          quantity: 0,
        }
      ],
        car: [
        {
          id: 3,
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQhj4aQEhjT5R5RaUgcZR6KZNOJwz1NETqjMEKoWNz-Y6654d-w',
          title: 'My Buggati',
          price: 1000000.00,
          description: 'Im unfortunately selling my prized Bugatti!!',
          quantity: 0,
        }
      ]
    }
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount(){
    axios.get(`http://104.248.178.153/products/catalog?key=${this.state.apiKey}`)
      .then((productsResponse)=>{
        productsResponse.data.forEach((item)=>(item.quantity = 0));
        
      });
  }
  addToCart(item){
    this.setState({
      cart:[...this.state.cart, item]
    })
  }
  checkout = () => {
    if(this.state.address.length>0 && this.state.creditCard.length >0){
      this.setState({ cart: []});
    alert('Purchase is complete!');
    } else {
      alert('Please fill out the required fields');
    }
  };
  handleAddressInput = e => {
    this.setState({ address: e.target.value});
  }
  handleCreditCardInput = e => {
    this.setState({ creditCard: e.target.value});
  }
  
  render() {
    return (
      <div>
        <section className='products'>
          <h1>Products</h1>
          <input />
          <h2>Magical Items</h2>
          {this.state.magical.map(item=>(
            <Product key={item.id} item={item} addToCart={this.addToCart} />
          ))}

          <h2>My Car</h2>
          {this.state.car.map(item => (
            <Product key={item.id} item={item} addToCart={this.addToCart}/>
          ))}
        </section>

        <section className='cart'>
          <h1>Cart</h1>
          <h2>Total: $ {this.state.cart.map( item =>(
            <CartItem key={item.id} item={item} />)
            )}</h2>
            <div className='inputs'>
              <input 
                placeholder='address'
                value={this.state.address}
                onChange={this.handleAddressInput}
                />
              <input 
                placeholder='credit card number'
                value= {this.state.creditCard}
                onChange={this.handleCreditCardInput}
                />
            </div>
            <button onClick={this.checkout}>Checkout</button>
        </section>
      </div>
    );
  }
}

export default App;
