
import React, { useState } from "react";
import Api from "../../Api";

const AdminPage = () => {
    const [name, setName] = useState('');
    const [_id, setId] = useState('');
    const [priceSmall, setPriceSmall] = useState('');
    const [priceBig, setPriceBig] = useState('');
    const [image, setImageUrl] = useState('');
    const tags = ["discount", 'vege'];
    const [checkedState, setCheckedState] = useState((new Array(tags.length).fill(false)));
    
    const handleCheckedChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item);
        setCheckedState(updatedCheckedState);
    }

    const handleNameChange = (e) => setName(e.target.value);
    const handleIdChange = (e) => setId(e.target.value);
    const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
    const handlePriceBigChange = (e) => setPriceBig(e.target.value);
    //  const searchPizzas = (checkedState) => {
    //     // fetches pizzas with filter
    //     const newTags = checkedState.map((value, index) => value ? tags[index] : null).filter( tag => tag != null);

    //     Api().get(`/pizzas?search=${search}&tags=${JSON.stringify(newTags)}`).then(response => setPizzaProducts(response.data));
    //   };
    //  const handleImageChange = (e) => setImageUrl(e.target.value);
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        getBase64(file, setImageUrl);
    };

    const handleSubmit = () => {
        const newTags = checkedState.map((value, index) => value ? tags[index] : null).filter(tag => tag != null);
        const pizza = { _id, name, priceSmall, priceBig, image, tags: newTags };
        // console.log(pizza);
        Api().post('/pizzas', pizza)
            .then(() => alert('Success')
                .catch((error) => console.log(error)));
    }

    return (
        <div id='admin'>
            <label htmlFor="">
                _id:
                <input type="text" name="_id" onChange={handleIdChange} />
            </label>

            <label htmlFor="">
                Име на пица:
                <input type="text" name="name" onChange={handleNameChange} />
            </label>

            <label htmlFor="">
                Цена за мала пица:
                <input type="number" name="cenaSmall" onChange={handlePriceSmallChange} />
            </label>

            <label htmlFor="">
                Цена за голема пица:
                <input type="number" name="cenabig" onChange={handlePriceBigChange} />
            </label>

            {/* <label htmlFor="">
                    Слика:
                    <input type="text" name="image" onChange={handleImageChange} />
                </label> */}

            <label htmlFor="">
                Слика:
                <input type="file" name="file" onChange={handleImageUpload} />
            </label>
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
            <button onClick={handleSubmit}>Add Pizza</button>
        </div >);
};

export default AdminPage;