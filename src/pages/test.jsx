import { useState } from 'react';
import * as Icons from '../components/Icons';
import CompanyIcon from '../assets/logo.jpeg';
import CollapsibleSection from '../components/CollapsibleSection/';



const App = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Action1'); // Default selected button
  const [activePart, setActivePart] = useState('A'); // State to track the active part
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

 const handleVolumeChange = (event) => {
    const volumeValue = event.target.value;
    console.log('Volume changed:', volumeValue);
    // Handle volume change logic
    // You can update the volume or perform other actions+
  };

  // Function to handle part button click
  const handlePartButtonClick = (part) => {
    setActivePart(part);
    // Check if the clicked button is 'FACE'
    if (part === 'FACE') {
      // Toggle the visibility of the volume slider
      setShowVolumeSlider(!showVolumeSlider);
    }
  };

    const volumeSliderPosition = showVolumeSlider
    ? { top: 10, left:10}
    : { display: 'none' };


// Additional actions
const handleAdditionalAction = (action) => {
  setSelectedButton(action);
  // Add your logic for the additional actions
};

  const toggleSidePanel = () => {
    setSidePanelOpen(!isSidePanelOpen);
    console.log(`Side Panel is now ${isSidePanelOpen ? 'open' : 'closed'}`);
  };

  const handleFunctionClick = () => {
    // Toggle the side panel state
    setSidePanelOpen(!isSidePanelOpen);
  };



  const handleLayerButtonClick = (layer) => {
    if (layer === 'Layer1') {
      // Toggle fullscreen for Layer 1
      const elem = document.documentElement;

      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full screen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    } else if (layer === 'Layer2') {
      // Implement logic to toggle other layers
      setViewerLayout((prevLayout) => (prevLayout === 'single' ? 'split' : 'single'));
    } else {
      console.log(`Switch to ${layer}`);
    }
  };


const LayerPanel = ({ onLayerButtonClick }) => {
  return (
    <div className="fixed bottom-5 left-12">
      <button className="text-white p-2 m-2" onClick={() => onLayerButtonClick('Layer1')}>
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

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white text-black p-4 ml-4 flex items-center justify-between">
        {/* Left Section */}
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

        {/* Right Section */}
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



<div className="flex flex-1">
  {/* Main Panel */}
  <div className="h-full flex-grow bg-[rgb(120,171,198)] p-8 relative">
    {/* Main panel content goes here */}
    <h2>Main Panel</h2>

    {/* Content in the right corner */}
    <div className="absolute bottom-0 right-0 p-4">
      {/* Content in the right corner goes here */}
      <p>Content in the right corner</p>
    </div>
  </div>

     {/* Left Side Panel for Layer 2 */}
      <div className="fixed top-[30%] flex flex-col ">
        <button
          className={`border-1 p-3 border-solid rounded-tr-lg text-white bg-sky-600 ${
            selectedButton === 'Action1' ? 'text-yellow-500' : ''
          }`}
          onClick={() => handlePartButtonClick('FACE')}
        >
          <Icons.IoLocationOutline size={30} />
          FACE
        </button>
        <div
          className="p-4 ml-16 flex "
          style={{
            position: 'absolute',
            ...volumeSliderPosition,
          }}
        >
          {showVolumeSlider && (
            <>
              <label className="block text-sm font-medium text-gray-700">Volume</label>
               <Icons.IoWaterOutline />
              <div className=" flex mt-1 relative rounded-md shadow-sm">
                <input
                  type="range"
                  min="0"
                  max="100"
                  onChange={handleVolumeChange}
                  className="focus:outline-none focus:ring focus:border-blue-300 w-48 h-6 text-indigo-500 rounded-md"
                />
               <Icons.IoWaterOutline  size={20}className="ml-2 "/>
              </div>
            </>
          )}
          </div>
        <button
          className={` border-1 p-4 border-solid rounded-br-lg text-white  bg-sky-700/75 ${
            selectedButton === 'Action2' ? 'text-yellow-500' : ''
          }`}
          onClick={() => handleAdditionalAction('Action2')}
        >
          <Icons.PiAlienLight size={30 } />
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
              className={`rounded p-2 text-sm bg-gray-100 w-1/4 ${activePart === part ? 'bg-blue-100' : 'text-gray-500'}`}
              onClick={() => handlePartButtonClick(part)}
                >
                Part {part}
               </button>
                 ))}
                </div>
              {/* Sections based on the number of sections you want */}
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
