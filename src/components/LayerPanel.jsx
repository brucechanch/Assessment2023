import PropTypes from 'prop-types';
import * as Icons from '../components/Icons';

const LayerPanel = ({ onLayerButtonClick }) => {
  return (
    <div className="fixed bottom-5 left-12">
      {/* Buttons for different layers */}
      <button className="text-white p-2 m-2" onClick={() => onLayerButtonClick('fullScreen')}>
        <Icons.MdOutlineZoomOutMap size={30} />
      </button>
      <button className="text-white p-2 m-2" onClick={() => onLayerButtonClick('Layer2')}>
        <Icons.VscLayoutSidebarRightOff size={30} />
      </button>
      <button className="text-white p-2 m-2" onClick={() => onLayerButtonClick('Layer3')}>
        <Icons.MdOutlineGrid4X4 size={30} />
      </button>
      <button className="text-white p-2 m-2" onClick={() => onLayerButtonClick('Layer4')}>
        <Icons.BsTransparency size={30} />
      </button>
    </div>
  );
};

// PropTypes for LayerPanel
LayerPanel.propTypes = {
  onLayerButtonClick: PropTypes.func.isRequired,
};

// Use the proptypes in your export
export { LayerPanel };
