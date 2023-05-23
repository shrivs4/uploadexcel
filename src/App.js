import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useDropzone } from 'react-dropzone';
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid"


const App = () => {
  const [tableChecked,setTableChecked] = useState({
    json:false,
    table:false
  });

  const [jsonData, setJsonData] = useState(null);
  const [excelData,setExcelData] = useState(null);

  const onDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const result = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setJsonData(JSON.stringify(result, null, 2));
      setExcelData(result);
    };
    fileReader.readAsArrayBuffer(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const downloadJson = () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  const isChecked = (e)=>{
    let checkDetails = e?.target
    if(checkDetails?.value === 'JSON' && checkDetails?.checked === true){
      setTableChecked({json:true,table:false})
    }else if(checkDetails?.value === 'Table' && checkDetails?.checked === true){
      setTableChecked({json:false,table:true})
    }else{
      setTableChecked({json:false,table:false})
    }
  }

  return (
    <div className="container">
    <header>
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} /><span className='uploadButton'>Upload File or Drag a drop</span>
    </div>
    {jsonData && excelData &&
    <button className='downloadButton' onClick={downloadJson}>Download JSON</button>
    }
    </header>
    <main>
      <div className='selection'>
      <input type='checkbox' value={'JSON'} name='data' onChange={isChecked} checked={tableChecked?.json}/><span>JSON</span>
      <input type="checkbox" value={'Table'} name ='data' onChange={isChecked} checked={tableChecked?.table}/><span>Table</span>
      </div>
      <div className='header'>Data</div>
      <hr />
      <main>
        {tableChecked?.json?
        <pre>{jsonData}</pre>
        : tableChecked?.table ?
        excelData &&
        <Grid data={excelData}>
          {Object.keys(excelData[0]).map((field, index) => (
              <GridColumn key={index} field={field} title={field} />
            ))}
        </Grid>
        : <div>Please select one option</div>
      }
      </main>
    </main>
    </div>
  )
}

export default App
