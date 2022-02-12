import { CopyToClipboard } from 'react-copy-to-clipboard';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import './Controls.css';

export default function Controls(props) {
  const colorsData = [
    { value: 'ead41c', name: 'JavaScript' },
    { value: '61dafb', name: 'React' },
    { value: 'd84924', name: 'HTML' },
    { value: '146cad', name: 'CSS' },
    { value: 'c36291', name: 'SASS' },
    { value: '68a063', name: 'NodeJS' },
    { value: '000000', name: 'NextJS' },
    { value: '8212f2', name: 'Bootstrap' },
    { value: '2b7dfa', name: 'TypeScript' },
  ];

  const colorItems = colorsData.map((color) => (
    <MenuItem key={color.value} value={color.value}>
      {color.name}
    </MenuItem>
  ));

  return (
    <>
      <div className="Controls">
        <FormControl className="Controls-form">
          <InputLabel id="Controls-format-selector">Format</InputLabel>
          <Select
            className="Controls-select"
            labelId="Controls-format-selector"
            id="Controls-format"
            value={props.format}
            label="Format"
            onChange={props.handleFormatChange}
          >
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="svg">SVG</MenuItem>
            <MenuItem value="jpeg">JPEG</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="Controls-form">
          <InputLabel id="Controls-background-selector">Background</InputLabel>
          <Select
            className="Controls-select"
            labelId="Controls-background-selector"
            id="Controls-background"
            value={props.bgColor}
            label="Background"
            onChange={props.handleBgColor}
          >
            {colorItems}
          </Select>
        </FormControl>
      </div>

      <CopyToClipboard
        text={
          props.qr ||
          `https://api.qrserver.com/v1/create-qr-code/
      ?size=500x500&bgcolor=2b7dfa&color=fff&format=png
      &qzone=10&data='https://github.com/kens-visuals'`
        }
      >
        <Button
          fullWidth
          className="Controls-btn"
          variant="outlined"
          endIcon={<InsertLinkIcon />}
          style={{
            color: `#${props.bgColor}`,
            backgroundColor: 'transparent',
            border: `1px solid #${props.bgColor}`,
            transition: 'all 0.3s',
            transitionDelay: '.16s',
          }}
        >
          Embed
        </Button>
      </CopyToClipboard>

      <Button
        fullWidth
        className="Controls-btn"
        variant="contained"
        endIcon={<DownloadIcon />}
        style={{
          color: `#${props.color}`,
          backgroundColor: `#${props.bgColor}`,
          transition: 'all 0.3s',
          transitionDelay: '.16s',
        }}
        onClick={props.saveQR}
      >
        Donwload
      </Button>
    </>
  );
}
