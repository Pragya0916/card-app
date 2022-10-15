import React from "react";
import "./Modal.css";

const Modal = ({ infoUser , customCloseModal}) => {
  console.log(infoUser);
  return (
    <>
      {!infoUser ? (
        ""
      ) : (
        <>
          <div className="modal_box text-center">
            <div className="card modal_card mb-5 p-1">
            <span className='close btn btn-danger text-center close_btn ' onClick={customCloseModal}>x</span>
              <h3 className="text-uppercase fw-bold m-2 p-1">
                {infoUser.name}
              </h3>
             
              
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${infoUser.id}.svg`}
                className="card-img-top h-25 w-25 border border-3 p-5"
                alt="..."
              />
              <div className="card-body">
                <span className="card-title fs-5 fw-bold mx-5">
                  Height : {infoUser.height}
                </span>
                <span className="card-title fs-5 fw-bold">
                  Weight : {infoUser.weight}
                </span>

                <div className="container">
                  <span className="card-title fw-bold fs-5"> Abilities: </span>
                  {infoUser.abilities.map((elem) => {
                    return (
                      <>
                        <li className="btn btn-outline-success m-1">
                          {elem.ability.name}
                        </li>
                      </>
                    );
                  })}
                </div>

                <div className="row m-4">
                  <h5 className="card-title fw-bold text-uppercase p-2">
                    Moves :
                  </h5>
                  {infoUser.moves.map((elem) => {
                    return (
                      <>
                        <div className="col-2 text-capitalize fw-semi-bold">
                          {elem.move.name}
                        </div>
                      </>
                    );
                  })}
                </div>

                <h5 className="card-title fw-bold text-uppercase p-2">
                  Stats :
                </h5>
                {infoUser.stats.map((elem) => {
                  return (
                    <>
                      <span className="fs-5 fw-bold mx-5">
                        #{elem.base_stat}
                      </span>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
