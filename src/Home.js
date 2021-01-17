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
            id="121312314"
            title="KIOS Electric Juicer"
            price={89.99}
            image="https://m.media-amazon.com/images/I/41IX+BQZJGL._AC_SY240_.jpg"
            rating={5}
          />
          <Product id="12123332314" title="REMNANT Widescreen monitor" price={356.99} image="https://m.media-amazon.com/images/I/410B5vZE6IL._AC_SY200_.jpg" rating={4} />
        </div>
        <div className="home__row">
        <Product id="1212385714" title="Mega Black Metal Office desk" price={545.99} image="https://m.media-amazon.com/images/I/41gaeDOKkxL._AC_SY200_.jpg" rating={5} />
        <Product id="12332387654" title="Traveler Luggage set" price={678.99} image="https://m.media-amazon.com/images/I/51kEMDfsoAL._AC_SY200_.jpg" rating={3} />
        <Product id="1212547314" title="HP Deskjet 5437 printer" price={56.89} image="https://m.media-amazon.com/images/I/41dCZxQDk2L._AC_SY200_.jpg" rating={3} />
        </div>
        <div className="home__row">
        <Product id="12124332314" title="Handcrafted oak hangar set" price={34.99} image="https://m.media-amazon.com/images/I/41DgO9C7kQL._AC_SY200_.jpg" rating={4} />
        </div>
      </div>
    </div>
  );
}

export default Home;
