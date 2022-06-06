import React from "react";
import "./App.css";

import { Title } from "./components/title";
import { MainCards } from "./components/mainCards";
import { Forms } from "./components/forms";
import { fetchCat, jsonLocalStorage } from "./utils/util";

function CatItem({ title, img }) {
  return (
    <li>
      <h3>{title}</h3>
      <img
        src={img}
        /** style props 전달 */
        style={{ width: "150px", border: "1px solid red" }}
        alt="catItems"
      />
    </li>
  );
}

function Favorites({ favorites }) {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  // 함수 호출 방식으로 한번만 호출되게 함
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First Cat");
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value_) {
    const newCat = await fetchCat(value_);
    setMainCat(newCat);

    // 이전 값을 받아옴(prev)
    setCounter((prev) => {
      const nextCounter = prev + 1;
      // localStorage에 저장
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handlerHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);

    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  return (
    <div>
      <Title>{counter === null ? "" : `${counter}번째`} 고양이 가라사대</Title>
      <Forms updateMainCat={updateMainCat} />
      <MainCards
        img={mainCat}
        onHeartClick={handlerHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
