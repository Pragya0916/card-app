import React from "react";
import "./Card.css";

const Card = (props) => {
  const { loading, filteredData, setInfoUser, customClickShowModal} = props;
  return (
    <>
      <div className="row m-3 row-cols-1 row-cols-4 g-4">
        {loading ? (
          <h1> Loading ... </h1>
        ) : (
          filteredData.map((item) => {
            return (
              <>
                <div
                  className="cards border border-2 col"
                  key={item.id}
                  onClick={()=> {customClickShowModal();setInfoUser(item)}}>
                

                  <div className="container">
                    <img
                      className="h=50 w-50"
                      src={item.sprites.other.dream_world.front_default}
                      alt="img"
                    />
                  </div>

                  <hr />

                  <div className="card-body text-center">
                    <h4 className="subHeading ">
                      <small>{item.id}</small>
                    </h4>
                    <h4 className="subHeading  ">{item.name}</h4>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default Card;
