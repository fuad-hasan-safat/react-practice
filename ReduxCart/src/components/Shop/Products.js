import { product } from '../dummydata';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {product.map((sproduct, index) => {
        return (
          <ul key={index}>
            <ProductItem
              id={sproduct.id}
              title={sproduct.title}
              price={sproduct.price}
              description={sproduct.description}
            />
          </ul>
        )
      })}
    </section>
  );
};

export default Products;
