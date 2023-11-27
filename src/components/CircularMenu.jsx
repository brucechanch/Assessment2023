// CircularMenu.jsx
import * as Icons from '../components/Icons';


const CircularMenu = () => {
  const handleButtonClick = (direction) => {
    alert(`Clicked ${direction} button`);
    // You can perform other actions based on the button click
  };

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', margin: '50px auto' }} >
      {/* Center Button */}

      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px 20px',
          borderRadius: '50%',
          color: 'white',
        }}
        onClick={() => handleButtonClick('Center')}

      >
        <Icons.FaRegFaceMehBlank size={30} className="text-white"/>
      </button>

      {/* Top Button */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          color: 'white',
        }}
        onClick={() => handleButtonClick('Top')}
      >
        Top

      </button>

      {/* Bottom Button */}
      <button
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          color: 'white',
        }}
        onClick={() => handleButtonClick('Bottom')}
      >
        Bottom
      </button>

      {/* Left Button */}
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          padding: '10px 20px',
          color: 'white',
        }}
        onClick={() => handleButtonClick('Left')}
      >
        Left
      </button>

      {/* Right Button */}
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          padding: '10px 20px',

          color: 'white',
        }}
        onClick={() => handleButtonClick('Right')}
      >
        Right
      </button>
    </div>
  );
};

export default CircularMenu;
