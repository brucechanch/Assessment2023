import { useState } from 'react';
import * as Icons from '../components/Icons';
import CompanyIcon from '../assets/logo.jpeg';
import CollapsibleSection from '../components/CollapsibleSection/';
import { LayerPanel } from '../components/LayerPanel'
import CircularMenu from '../components/CircularMenu'


const App = () => {
  // State variables
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Action1');
  const [activePart, setActivePart] = useState('A');
  const [showOpacitySlider, setOpacitySlider] = useState(false);

  // Event handlers
  const handleOpacityChange = (event) => {
    const opacityValue = event.target.value;
    console.log('Opacity changed:', opacityValue);
  };
  const handlePartButtonClick = (part) => {
    setActivePart(part);
    if (part === 'FACE') {
      setOpacitySlider(!showOpacitySlider);
    }
  };
  const OpacitySliderPosition = showOpacitySlider
    ? { top: 10, left:10}
    : { display: 'none' };
  const handleAdditionalAction = (action) => {
    setSelectedButton(action);
    // Add your logic for additional actions
  };

  const handleFunctionClick = () => {
    setSidePanelOpen(!isSidePanelOpen);
  };

  const handleLayerButtonClick = (layer) => {
    if (layer === 'fullScreen') {
      const elem = document.documentElement;
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full screen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white text-black p-4 ml-4 flex items-center justify-between">
        {/* Company Logo and Name */}
        <div className="flex items-center">
          <div id="company-icon" className="mr-4">
            <img src={CompanyIcon} alt="Company Icon" className="h-8 w-8" />
          </div>
          <span className="company-name text-2xl">My Name</span>
        </div>

        {/* Middle Section */}
        <div className="flex items-center">
          <div id="user-info" className="text-center">
            <div className="menu-user-container">
              <Icons.FaBars className="menu-icon" />
              <div className="user-info border-x-2 px-2">
                <Icons.FaUser className="user-icon rounded-full" />
                <span className="user-name text-gray-400">Name</span>
                <span className="ml-3 text-gray-400">F-23</span>
              </div>
            </div>
          </div>
        </div>

        {/*  Notifications and Function Buttons */}
        <div className="flex items-center ">
        <div id="notification" className="text-gray-500">
        <Icons.FaBell className="notification-icon" />
          </div>
        <div className="flex items-center">
          <div className="border-l-2 pl-2">
            <button className=" mr-8 text-gray-500" onClick={handleFunctionClick}>
              <Icons.PiHandTapLight size={25} className="ml-5" />
              <span className="text-xs">FUNCTION A</span>
            </button>
            <button className="mr-8 text-gray-500" onClick={handleFunctionClick}>
              <Icons.PiHeadphonesThin size={25} className="ml-5" />
              <span className="text-xs">FUNCTION B</span>
            </button>
            <button className=" mr-8 text-gray-500" onClick={handleFunctionClick}>
              <Icons.CiMedicalCross size={25}  className="ml-5"/>
              <span className="text-xs">FUNCTION C</span>
            </button>
            <button className="  text-gray-500" onClick={handleFunctionClick}>
              <Icons.BsBox2 size={25} className="ml-5" />
              <span className="text-xs">FUNCTION D</span>
            </button>
          </div>
        </div>
        </div>
      </header>

  {/* Main Panel */}
<div className="flex flex-1">
  <div className="h-full flex-grow bg-[rgb(120,171,198)] p-8 relative">
    {/* Remote Menu */}
    <div className="absolute bottom-0 right-0 p-4">
      <CircularMenu />
    </div>
  </div>

     {/* Left Side Panel for Layer 2 */}
<div className="fixed top-[30%] flex flex-col">
  <button
    className={`border-1 p-3 border-solid rounded-tr-lg text-white bg-sky-600 ${
      selectedButton === 'FACE' ? 'text-yellow-500' : ''
    }`}
    onClick={() => {
      handlePartButtonClick('FACE');
      setSelectedButton('FACE');
    }}
  >
    <Icons.IoLocationOutline size={30} />
    FACE
  </button>
  <div
    className="flex p-2 ml-16"
    style={{
      position: 'absolute',
      ...OpacitySliderPosition,
    }}
  >
    {showOpacitySlider && (
      <>
        <div className="flex p-2 relative rounded-md shadow-sm bg-blue-400">
          <Icons.IoWaterOutline size={30} className="text-white" />
          <input
            type="range"
            min="0"
            max="100"
            onChange={handleOpacityChange}
            className="focus:border-blue-300 w-48 h-7"
          />
          <Icons.TbDropletHalf2 size={30} className="ml-2 text-white" />
        </div>
      </>
    )}
  </div>
  <button
    className={`border-1 p-4 border-solid rounded-br-lg text-white bg-sky-700/75 ${
      selectedButton === 'JAW' ? 'text-yellow-500' : ''
    }`}
    onClick={() => {
      handleAdditionalAction('JAW');
      setSelectedButton('JAW');
    }}
  >
    <Icons.PiAlienLight size={30} />
    JAW
  </button>
</div>

        {/* Side Panel */}
        <div className={`overflow-hidden transition-width ${isSidePanelOpen ? 'max-w-400' : 'w-0'}`}>
          {isSidePanelOpen && (
            <div className="bg-white">
            <div className="flex ms-2">
              {['A', 'B', 'C', 'D', 'E'].map((part) => (
              <button
              key={part}
              className={`rounded p-2 text-sm ${activePart === part ? 'bg-blue-300 text-white' : 'bg-gray-100 text-gray-500'} w-1/4`}
              onClick={() => handlePartButtonClick(part)} >  Part {part}
              </button>
                ))}
                </div>
              {[1, 2, 3, 4, 5].map((sectionNumber) => (
                <CollapsibleSection key={sectionNumber} sectionNumber={sectionNumber} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Layer Controls */}
      <LayerPanel onLayerButtonClick={handleLayerButtonClick} />
    </div>
  );
};

export default App;
