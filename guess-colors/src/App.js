import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [buttonHexList, setButtonHexList] = useState([]);
  const [status, setStatus] = useState(false);
  const [reply, setReply] = useState("");


  const generateRandColorHex = () => {
    const hexcharacters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexcharacters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateRandColorHexCombination = () => {
    let targetColor = generateRandColorHex();

    let lst = [];
    lst.push(targetColor);
    while (lst.length < 4) {
      let tempColor = generateRandColorHex();
      if (tempColor != targetColor) {
        lst.push(tempColor)
      }
    }

    // shuffle the array
    lst.sort(() => Math.random() - 0.5);

    return [targetColor, lst];
  }


  useEffect(() => {
    // if (status) {
    let res = generateRandColorHexCombination()
    setTargetColor(res[0]);
    setButtonHexList(res[1]);
    setReply("")
    // }
  }, [status])

  useEffect(() => {
    if (reply === targetColor) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [reply])

  // console.log(targetColor)

  return (
    < div className='container' >
      <h1>Guess Color</h1>
      {
        !reply
          ? <p>Please select a color hex!</p>
          : <p>Ah...please select again!</p>
      }
      <div className='randomColor' style={{ backgroundColor: targetColor }}></div>
      <div className='buttomList'>
        {
          buttonHexList.map((color, ind) =>
            <button key={ind} className='button' onClick={() => setReply(color)}>{color}</button>
          )
        }
      </div>
    </ div>
  );
}

export default App;
