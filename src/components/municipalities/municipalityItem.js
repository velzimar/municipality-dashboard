import React, { useState, Fragment } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteMunicipalite } from "../../actions/Municipalite";
import { getMunicipalite } from "../../actions/Municipalite";
import { PropTypes } from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(181, 193, 215, 0.65)",
  },
};

Modal.setAppElement("#App");

const MunicipalityItem = ({
  deleteMunicipalite,
  getMunicipalite,
  municipality: { _id, city, governorate, cityLatitude, cityLongitude },
}) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const open = () => {
    setmodalIsOpen(true);
  };

  const close = () => {
    setmodalIsOpen(false);
  };

  return (
    <Fragment>
      <tbody>
        <tr>
          <td className="text-center">{governorate}</td>
          <td className="text-center">{city}</td>
          <td className="text-center">{cityLatitude}</td>
          <td className="text-center">{cityLongitude}</td>
          <td className="row-actions">
            <button
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.075)",
                color: "#343a40",
              }}
            >
              <i className="os-icon os-icon-ui-49" />
            </button>
            <button
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.075)",
                color: "#A43433",
              }}
              onClick={open}
            >
              <i className="os-icon os-icon-ui-15" />
            </button>
          </td>
        </tr>
      </tbody>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={close}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
      >
        <div className="modal-header">
          <h4 className="modal-title">Confirmation de {city}</h4>
          <button type="button" className="close" onClick={close}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>
            Voulez-vous vraiment supprimer cette municipalité? Ce processus ne
            peut pas être annulé.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-info" onClick={close}>
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteMunicipalite(_id);
              getMunicipalite();
              close();
            }}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

MunicipalityItem.propTypes = {
  deleteMunicipalite: PropTypes.func.isRequired,
  getMunicipalite: PropTypes.func.isRequired,
};

export default connect(null, { deleteMunicipalite, getMunicipalite })(
  MunicipalityItem
);
