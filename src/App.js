import { useState, useEffect } from 'react';
import FileSaver from 'file-saver';

import Footer from './Footer';
import Controls from './Controls';
import useChange from './useChange';

import './App.css';

function App() {
  const [qr, setQR] = useState(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=500x500
      &bgcolor=2b7dfa&color=fff&format=png
      &qzone=10&data='https://github.com/kens-visuals'`
  );
  const [data, setData] = useState({
    bgColor: '2b7dfa',
    format: 'png',
    value: '',
  });

  function handleChange(e) {
    setData((prevData) => ({ ...prevData, value: e.target.value }));
  }

  function handleFormatChange(e) {
    setData((prevData) => ({ ...prevData, format: e.target.value }));
  }

  function handleBgColor(e) {
    setData((prevData) => ({ ...prevData, bgColor: e.target.value }));
  }

  function saveQR() {
    FileSaver.saveAs(qr, `qrcode.${data.format}`);
    setData((prevData) => ({ ...prevData, value: '' }));
  }

  useEffect(() => {
    async function getImg() {
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=500x500&bgcolor=${
          data.bgColor
        }&color=fff&format=${data.format}&qzone=10&data=${
          data.value || 'https://github.com/kens-visuals'
        }`
      );

      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setQR(imageObjectURL);
    }

    getImg();
  }, [data]);

  return (
    <div className="container">
      <main className="App">
        <input
          style={{
            border: `0.1rem solid #${data.bgColor}`,
            transitionDelay: '.16s',
          }}
          type="text"
          value={data.value}
          className="App-input"
          placeholder="Insert link"
          onChange={(e) => handleChange(e, data.value)}
        />

        <img src={qr} alt="qr code" className="App-img" />

        <Controls
          qr={qr}
          value={data.value}
          format={data.format}
          bgColor={data.bgColor}
          handleFormatChange={handleFormatChange}
          handleBgColor={handleBgColor}
          saveQR={saveQR}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
