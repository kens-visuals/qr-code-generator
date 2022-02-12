import { useState, useEffect } from 'react';
import FileSaver from 'file-saver';

import Footer from './components/Footer';
import Controls from './components/Controls';
import useOnChange from './hooks/useOnChange';

import './App.css';

function App() {
  const [qr, setQR] = useState(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=500x500
      &bgcolor=2b7dfa&color=fff&format=png
      &qzone=10&data='https://github.com/kens-visuals'`
  );

  const { value, format, bgColor, onChange } = useOnChange();

  function saveQR() {
    FileSaver.saveAs(qr, `qrcode.${format}`);
    onChange((prevData) => ({ ...prevData, value: '' }));
  }

  useEffect(() => {
    async function getImg() {
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=500x500&bgcolor=${bgColor}&color=fff&format=${format}&qzone=10&data=${
          value || 'https://github.com/kens-visuals'
        }`
      );

      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setQR(imageObjectURL);
    }

    getImg();
  }, [value, format, bgColor]);

  return (
    <div className="container">
      <main className="App">
        <h1 className="App-heading" style={{ background: `#${bgColor}` }}>
          QR Generator
        </h1>
        <input
          style={{
            border: `0.1rem solid #${bgColor}`,
            transition: 'all 0.3s',
            transitionDelay: '.16s',
          }}
          type="text"
          value={value}
          className="App-input"
          placeholder="Insert link"
          onChange={(e) => onChange(e, 'value')}
        />

        <img src={qr} alt="qr code" className="App-img" />

        <Controls
          qr={qr}
          value={value}
          format={format}
          bgColor={bgColor}
          handleFormatChange={(e) => onChange(e, 'format')}
          handleBgColor={(e) => onChange(e, 'bgColor')}
          saveQR={saveQR}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
