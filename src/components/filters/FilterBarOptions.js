import React, { useContext, useEffect, useState } from "react";
import filtersContext from "../../contexts/filters/filtersContext";
import { sortMenu } from "../../data/filterBarData";
import { displayMoney } from "../../helpers/utils";
import { getListCategories } from "../../apis";

const FilterBarOptions = () => {
  const {
    sortedValue,
    setSortedValue,
    handlePrice,
    selectedPrice: { price, minPrice, maxPrice },
    mobFilterBar: { isMobSortVisible, isMobFilterVisible },
    handleMobSortVisibility,
    handleMobFilterVisibility,
  } = useContext(filtersContext);

  const displayPrice = displayMoney(price);

  const [categoryList, setCategoryList] = useState([]);

  const getAllCategory = async () => {
    try {
      const res = await getListCategories();
      setCategoryList(res);
    } catch (e) {
      console.log("===Error");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleRemoveFilter = () => {
    console.log("===remove filter");
  };

  const handleCategoryFilter = (id) => {
    console.log("====id", id);
  };

  return (
    <>
      <div className="clear_filter_btn">
        <button type="button" className="btn" onClick={handleRemoveFilter}>
          Bỏ lọc
        </button>
      </div>

      <div className={`sort_options ${isMobSortVisible ? "show" : ""}`}>
        <div className="sort_head">
          <h4 className="title">Sắp xếp theo</h4>
          <button
            type="button"
            className="close_btn"
            onClick={() => handleMobSortVisibility(false)}
          >
            &times;
          </button>
        </div>

        <div className="separator"></div>

        <ul className="sort_menu">
          {sortMenu.map((item) => {
            const { id, title } = item;
            return (
              <li
                key={id}
                className={sortedValue === title ? "active" : ""}
                onClick={() => setSortedValue(title)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`filter_options ${isMobFilterVisible ? "show" : ""}`}>
        <div className="filter_head">
          <h4 className="title">Lọc theo</h4>
          <button
            type="button"
            className="close_btn"
            onClick={() => handleMobFilterVisibility(false)}
          >
            &times;
          </button>
        </div>

        <div className="separator"></div>

        <div className="filter_block">
          <h4>Danh mục</h4>
          <ul className="filter_menu">
            {categoryList.map((item) => {
              const { id, name } = item;
              return (
                <li key={id} className="filter_btn">
                  <input
                    type="checkbox"
                    id={name}
                    value={name}
                    onChange={() => handleCategoryFilter(id)}
                  />
                  <label htmlFor={name}>{name}</label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="filter_block">
          <h4>Khoảng giá</h4>
          <div className="price_filter">
            <p>{displayPrice}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={handlePrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBarOptions;
