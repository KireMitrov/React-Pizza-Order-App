import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../Api';
import { CartContext } from '../../context/cartContext'

const HomePage = () => {
  const { setPizzaProducts, pizzaProducts, addToCart, cartItems } = useContext(CartContext)
  // console.log(cartItems);
  const [search, setSearch] = useState('');
  const tags = ["discount", 'vege'];
  const [checkedState, setCheckedState] = useState((new Array(tags.length).fill(false)));
  const pagenumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [page, setPage] = useState(1);


  const handleGetPage = (pageNumber) => {
    setPage(pageNumber);
    searchPizzas(checkedState, pageNumber);
  }

  const handleCheckedChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item);
    setCheckedState(updatedCheckedState);
    searchPizzas(updatedCheckedState);
  }

  const handleKeyDown = (e) => e.key === 'Enter' ? searchPizzas(checkedState) : null;

  const handleSearchChange = (e) => setSearch(e.target.value);

  const searchPizzas = (checkedState, page = 1) => {
    // fetches pizzas with filter
    const newTags = checkedState.map((value, index) => value ? tags[index] : null).filter(tag => tag != null);
    Api().get(`/pizzas?search=${search}&tags=${JSON.stringify(newTags)}&page=${page}`).then(response => setPizzaProducts(response.data));
  };


  // const handleDiscountChange = (e) => {
  //   setIsDiscountChecked(e.target.checked);
  //   let newTags = tags;
  //   if (e.target.checked) {
  //     newTags = [...tags, 'discount'];
  //   } else {
  //     newTags = tags.filter(tag => tag !== 'discount');
  //   }
  //   setTags(newTags);
  //   searchPizzas(newTags);
  // };
  // const handleVegeChange = (e) => {
  //   setIsVegeChecked(e.target.checked);
  //   let newTags = tags;
  //   if (e.target.checked) {
  //     newTags = [...tags, 'vege'];
  //   } else {
  //     newTags = tags.filter(tag => tag !== 'vege');
  //   }
  //   setTags(newTags);
  //   searchPizzas(newTags);
  // };

  return (
    <div>
      <div id="search" className='search'>Search: <input type="text" onChange={handleSearchChange} onKeyDown={handleKeyDown} /> </div>
      <div id="tags" className='tags'>
        {tags.map((tag, index) => (
          <li key={tag}>
            <label >
              {tag}:
              <input type="checkbox" value={tag} checked={checkedState[index]} onChange={() => handleCheckedChange(index)} />
            </label>
          </li>
        ))}
      </div>
      <div id='pagination'>
        {pagenumbers.map(_page => (
          <button onClick={() => handleGetPage(_page)}>{_page}</button>
        ))}
      </div>
      <div id="pizzaMenu">
        {pizzaProducts.map(pizza => (
          <div key={pizza._id} className="product">
            <div className='priceTag'>
              {pizza.priceSmall} ден - {pizza.priceBig} ден
            </div>
            <Link to={pizza.name}>
              <img src={pizza.image} alt={pizza.name} />
            </Link>
            <h2>{pizza.name}</h2>
            <p>{pizza.ingredients}</p>
            <Link to={pizza.name}>
              <button>Buy Pizza</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
