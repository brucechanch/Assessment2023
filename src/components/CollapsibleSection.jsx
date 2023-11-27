import { useState } from 'react';
import * as Icons from '../components/Icons';

const CollapsibleSection = ({ children, sectionNumber }) => {
  // State variables
  const [isFunctionAClicked, setIsFunctionAClicked] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonStates, setButtonStates] = useState(Array.from({ length: 8 }, () => false)); // State for small number buttons
  const [dropdownValues, setDropdownValues] = useState(['', '']); // State for dropdown values
  const [itemNumber, setItemNumber] = useState(1); // State to manage item number
  const [inputBoxes, setInputBoxes] = useState(['']); // State to manage input boxes

  // Generate an array of numbers from 1 to 20
  const numberOptions = Array.from({ length: 20 }, (_, index) => index + 1);

  // Function to handle changes in the parallel dropdown boxes
  const handleDropdownChange = (index, value) => {
    const newDropdownValues = [...dropdownValues];
    newDropdownValues[index] = value;
    setDropdownValues(newDropdownValues);
  };

  // Function to increase the item number
  const increaseItemNumber = () => {
    setItemNumber(itemNumber + 1);
    setInputBoxes([...inputBoxes, '']);
  };

  // Function to decrease the item number
  const decreaseItemNumber = () => {
    if (itemNumber > 1) {
      setItemNumber(itemNumber - 1);
      const newInputBoxes = inputBoxes.slice(0, -1);
      setInputBoxes(newInputBoxes);
    }
  };

  // Function to toggle button state for the  buttons (index 0-7)
  const toggleFirstSetButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  const toggleSecondSetButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index + 8] = !newButtonStates[index + 8];
    setButtonStates(newButtonStates);
  };

  const toggleThirdSetButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index + 16] = !newButtonStates[index + 16];
    setButtonStates(newButtonStates);
  };

  const toggleFourthSetButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index + 24] = !newButtonStates[index + 24];
    setButtonStates(newButtonStates);
  };

  // Function to toggle collapse/expand for the section
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to toggle Function A click
  const toggleFunctionAClick = () => {
    setIsFunctionAClicked(!isFunctionAClicked);
  };

  return (
    <div className={`w-full ${!isCollapsed ? 'flex flex-col' : ''}`}>
      {/* Section header */}
      <div className="flex items-center p-2 cursor-pointer" onClick={() => { toggleCollapse(); toggleFunctionAClick(); }}>
        <span className="font-bold">{`Section ${sectionNumber}`}</span>
        <span className="ml-auto">
          {isCollapsed ? (
            <Icons.IoIosArrowDown className="text-gray-300" />
          ) : (
            <Icons.IoIosArrowUp className="text-gray-300" />
          )}
        </span>
      </div>

      {!isCollapsed && (
        <div className="p-2 mt-2  border-b-2 ">
          {children}

          {/* Content for Section 1 */}
          {sectionNumber === 1 && (
            <div className=" mt-1 mb-3 flex flex-col items-center ">
              <textarea
                className="ml-2 p-2 border rounded w-full"
                rows="4"
                cols="50"
                style={{ resize: 'none' }}
                placeholder="General Treatment Plan here..."
              ></textarea>
            </div>
          )}

          {/* Content for Section 2 */}
          {sectionNumber === 2 && (
            <div className="mt-4">
              {/* Row 1: Text with Dropdown */}
              <div className="flex mb-4 items-center">
                <div className="">
                  <label className="mb-2 text-gray-500">Item:</label>
                </div>
                <select className="p-2 rounded w-44 border w-20 ml-auto">
                  <option value="option1">Please Select</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              {/* Row 2: Input with Measurement */}
              <div className="flex mb-4">
                <div className="">
                  <label className="mb-2 text-gray-500">Item:</label>
                </div>
                <div className="relative rounded max-w-xs ml-auto">
                  <input
                    type="text"
                    className="p-2 rounded border w-44"
                    placeholder="Text Input"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    mm
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Content for Section 3 */}
          {sectionNumber === 3 && (
            <div className="mt-4 space-y-4 text-right">
              {/* Item 1: Two mm input boxes with "Left" and "Right" labels */}
              <div className="flex">
                <div className="w-full flex items-center">
                  <label className="block mb-2 mt-8 text-gray-500">Item:</label>
                </div>
                <div className="flex ml-14">
                  <div className="flex flex-col">
                    <label className="block mb-2 text-center text-gray-400">Left:</label>
                    <div className="relative w-1/8">
                      <input
                        type="text"
                        className="p-2 rounded border"
                        style={{ width: '5.3rem' }}
                        placeholder="0"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        mm
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="block mb-2 text-center text-gray-400">Right:</label>
                    <div className="relative w-1/8">
                      <input
                        type="text"
                        className="p-2 ml-2 rounded border"
                        style={{ width: '5rem' }}
                        placeholder="0"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        mm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: mm input box */}
              <div className="flex">
                <div className="w-1/2 flex items-center">
                  <label className="block mb-2 text-gray-500">Item:</label>
                </div>
                <div className="relative w-1/5 ml-auto w-44">
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    mm
                  </span>
                </div>
              </div>

              {/* Items 3 and 4: Two dropdowns */}
              <div className="">
                <div className="flex">
                  <div className="w-full flex items-center">
                    <label className="block mb-2 text-gray-500">Item:</label>
                  </div>
                  <div className="flex ml-2">
                    <div className="flex flex-col">
                      <label className="block mb-2 text-center text-gray-400">Left:</label>
                      <div className="ml-2">
                        <select className="p-2 border rounded w-20">
                          {numberOptions.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="flex flex-col">
                      <label className="block mb-2 text-center text-gray-400">Right:</label>
                      <div className="relative w-1/8">
                        <select className="p-2 ml-2 rounded border w-20">
                          {numberOptions.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items 5 and 6: Two additional dropdowns */}
              <div className="flex">
                <div className="w-full flex items-center">
                  <label className="block mb-2 text-gray-500">Item:</label>
                </div>
                <div className=" ml-4">
                  <select className="p-2 border rounded w-20">
                    {numberOptions.map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" ml-2">
                  <select className="p-2 border rounded w-20">
                    {numberOptions.map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Content for Section 4 */}
          {sectionNumber === 4 && (
            <div className="mt-4">
              <div className="flex mb-4 justify-between">
                <p className="text-xl">ITEMS</p>
                <button
                  className="text-black"
                  onClick={increaseItemNumber}
                >
                  <Icons.FaPlus />
                </button>
              </div>
              {/* Input box for the item number */}
              <div className="flex mb-4 justify-between text-gray-500">
                <p className="mt-2">Item:</p>
                <input
                  type="text"
                  className="w-36 ml-auto mr-3 p-2 border rounded"
                  value={itemNumber}
                  readOnly
                />
                <button
                  className="text-black"
                  onClick={decreaseItemNumber}
                >
                  <Icons.FaRegWindowMinimize />
                </button>
              </div>
            </div>
          )}

          {/* Content for Section 5 */}
          {sectionNumber === 5 && (
            <div className="flex flex-col justify-center">
              {/* First row with buttons */}
              <div className="flex divide-x mx-8">
                <div className="">
                  {[...Array(8).keys()].map((index) => (
                    <button
                      key={index}
                      className={`m-1  flex-shrink-0 w-4 h-5 text-xs rounded ${buttonStates[index] ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => toggleFirstSetButton(index)}
                    >
                      {8 - index }
                    </button>
                  ))}
                </div>
                <div className="">
                  {[...Array(8).keys()].map((index) => (
                    <button
                      key={index + 8}
                      className={`m-1 flex-shrink-0 w-4 h-5 text-xs rounded ${buttonStates[index + 8] ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => toggleSecondSetButton(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Second row with buttons */}
              <div className="flex divide-x mx-8">
                <div className="border-t-2">
                  {[...Array(8).keys()].map((index) => (
                    <button
                      key={index + 16}
                      className={`m-1  flex-shrink-0 w-4 h-5 text-xs	rounded ${buttonStates[index + 16] ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => toggleThirdSetButton(index)}
                    >
                      {8 - index }
                    </button>
                  ))}
                </div>
                <div className="border-t-2">
                  {[...Array(8).keys()].map((index) => (
                    <button
                      key={index + 24}
                      className={`m-1 flex-shrink-0 w-4 h-5 text-xs	 rounded ${buttonStates[index + 24] ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => toggleFourthSetButton(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2 parallel dropdown boxes */}
              <div className="flex">
                {[0, 1].map((index) => (
                  <select
                    key={index}
                    className="w-1/2 p-2 border rounded mr-2 mt-2"
                    value={dropdownValues[index]}
                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
