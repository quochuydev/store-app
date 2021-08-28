import Product from "./Product";

export default function Products({ products }){
    return <section className="product" id="product">
    <h1 className="heading">latest <span>products</span></h1>
    <div className="box-container">
      {products.map((e, i) => <Product key={i} product={e} />)}
    </div>
  </section>
}