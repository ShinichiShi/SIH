import styles from '../Sell Crops/FarmSell.module.css';
import PropTypes from 'prop-types';

function Box({ crop, onCropSelect }) {
  return (
    <div className={styles['box-crop']} onClick={() => onCropSelect(crop)}>
      <img src={crop.imageUrl} alt={crop.name} />
      <div className={styles['radio-button']}>
        <label>
          <input
            type="radio"
            name="crop"
            value={crop.name}
            className={styles.rad}
            checked={false} // Remove the checked attribute to avoid radio button interference
            onChange={() => onCropSelect(crop)} // Update crop selection on radio button change
          />
          {' ' + crop.name}
        </label>
      </div>
    </div>
  );
}
Box.propTypes = {
  crop: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onCropSelect: PropTypes.func.isRequired,
};
function Details({ crops, setSelectedCrop }) {
    return (
      <div className={styles['details-box']}>
        <div className={styles['image-box']}>
          {crops.map((crop, index) => (
            <Box
              key={index}
              crop={crop}
              onCropSelect={setSelectedCrop}
            />
          ))}
        </div>
      </div>
    );
  }


Details.propTypes = {
  crops: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedCrop: PropTypes.func.isRequired,
};
export default Details;  