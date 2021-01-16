import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/ZjNlMmIxN2Et/ZjNlMmIxN2Et-MmU5OWEzOGYt-w1500._CB411745142_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            title="KIOS Electric Juicer"
            price={89.99}
            image="https://m.media-amazon.com/images/I/41IX+BQZJGL._AC_SY240_.jpg"
            rating={5}
          />
          <Product />
        </div>
        <div className="home__row">
          <Product />
          <Product />
          <Product />
        </div>
        <div className="home__row">
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Home;
