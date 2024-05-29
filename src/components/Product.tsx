import React from 'react';
import { useSelector } from 'react-redux';
import { DataItem } from '../redux/actions';

const Product: React.FC = () => {
  const product = useSelector((state: { data: DataItem[] }) => state.data[0]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.subtitle}</p>
      <div className="tags">
        {product.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Product;
