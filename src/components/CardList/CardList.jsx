import { CardContext } from '../../context/cardContext';
import { Card } from '../Card/Card';
import './index.css';
// import data from '../../data/data.json';
import  {useContext, useEffect, useState} from 'react';

export const CardList = () => {
  // console.log({data});
  const {cards, setParentCounter, handleProductLike} = useContext(CardContext)

  return (
      <div className='cards'> 
    {cards.map ((item) => {
          
      return ( <Card 
       product={item} 
       onProductLike={handleProductLike}
        setParentCounter={setParentCounter}
         {...item} 
         key={item._id}  />
         ); //rest operator
  })}
      </div>
  );
};


