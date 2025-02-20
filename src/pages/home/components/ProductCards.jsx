import ProductCard from "./ProductCard";
import PropTypes from 'prop-types';

function ProductCards(props) {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {props.products.map((product) => {
        return (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            stock={product.stock}
            inventory={product.inventory}
          />
        );
      })}
    </div>
  );
}

ProductCards.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      stock: PropTypes.number,
      inventory: PropTypes.number,
    })
  ).isRequired,
};

export default ProductCards;