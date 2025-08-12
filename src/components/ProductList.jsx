import React, { useState,useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import plantsArray from '../data/plant_data';

function ProductList(props) {
    const [showCart, setShowCart] = useState(false); 
    const [filteredCategories, setFilteredCategories] = useState(plantsArray);
    const [allCategories, setAllCategories] = useState(plantsArray);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [cart, setCart] = useState([]); // State to store the items added to the cart
    
    const dispatch = useDispatch();
    const cartItems=useSelector(state => state.cart.items);

    console.log(cartItems);
    // setCart(cartItems);
    useEffect(() => {
        
    }, []);


    const alreadyInCart = (itemName) => {
        return cartItems.some((item) => item.name === itemName);
    }
    const handleAddToCart = (item) => {
        console.log("clicked");
        dispatch(addItem(item));
    }
    const totalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    const filterByCategory = (selectedCategory) => {
        if (selectedCategory === "All") {
        setFilteredCategories(allCategories);
        } else {
        const filtered = allCategories.filter(c => 
            c.category === selectedCategory
        );
        setFilteredCategories(filtered);
        }
    };
    console.log(filteredCategories);

   const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
};
const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
};

   const handleContinueShopping = (e) => {
    console.log("clicked");
    e.preventDefault();
    setShowCart(false);
  };
    return (
        <div>
        <div className="navbar" >
            <div className="tag">
                <div style={{cursor:"pointer"}} onClick={props.toLanding} className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a   style={{textDecoration:'none'}} className="brand-section">
                    <div style={{marginLeft:"10px"}}>
                        <h3 className="tag_home_link" style={{color:'white'}}>Paradise Nursery</h3>
                        <i style={{color:'white'}}>Where Green Meets Serenity</i>
                    </div>
                    </a>
                </div>
              
            </div>

                <div className='nav-text-place'> 
                    <a href="#" onClick={(e)=>handlePlantsClick(e)} className='nav-text'>
                        Find Your Perfect Plant!
                    </a>
                </div>

            <div>
                <div> 
                    <a href="#" onClick={(e) => handleCartClick(e)} >
                        <div className='shopping-section'>    
                            <div className="cart_quantity_count">
                                {totalItems()}
                            </div>
                            <div className="cart">
                                <span>🛒</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        {!showCart? (
    <div>   
        <div className='filter-section'>
            <h3> Filter </h3>
            <select 
                className='category-filter' 
                name="category" 
                id="plant_category" 
                onChange={(e) => filterByCategory(e.target.value)}
                defaultValue={""}
            >
            <option className="filter-item" value="" disabled hidden>Category</option>
            <option className="filter-item" value="All">All Categories</option>
                {plantsArray.map((cat) => (
                    <option className="filter-item" key={cat.category} value={cat.category}>{cat.category}</option>
                ))}
            </select>
        </div>

        <div className="product-grid">
            {filteredCategories.map((item)=>
            <div className='mainCategoryDiv'> 
                <div className="product-list">
                {item.plants.map((plant)=>
                    <div className='product-card'>
                        <img className='product-image' src={plant.image} alt={plant.name} />
                        <h2>{plant.name}</h2>
                        <p className='description-plant'>{plant.description}</p>
                        <p className='product-price'>{plant.cost}</p>
                        <button style={{backgroundColor:alreadyInCart(plant.name)?"gray":"#ac53cfe3"}} disabled={alreadyInCart(plant.name)? true:false} onClick={()=>handleAddToCart({name:plant.name,cost:plant.cost,image:plant.image})} className='product-button'>Add to Cart</button>
                    </div>)}
                </div>
            </div>)}

        </div>
    </div>
 ) :  (
    <CartItem onContinueShopping={handleContinueShopping}/>
)}
    </div>
    );
}

export default ProductList;