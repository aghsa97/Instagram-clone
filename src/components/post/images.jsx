import PropTypes from "prop-types";

const Images = ({ src, caption }) => {
  return <img className="w-full h-1/4 flex mr-3" src={src} alt={caption} />;
};

export default Images;

Images.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
