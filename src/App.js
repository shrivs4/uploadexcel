import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [tableChecked,setTableChecked] = useState({
    json:false,
    table:false
  });

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
      <button>Upload File or Drag a drop</button>
    </header>
    <main>
      <div className='selection'>
      <input type='checkbox' value={'JSON'} name='data' onChange={isChecked} checked={tableChecked?.json}/><span>JSON</span>
      <input type="checkbox" value={'Table'} name ='data' onChange={isChecked} checked={tableChecked?.table}/><span>Table</span>
      </div>
      <main>
        {tableChecked?.json?
        <div>JSON DATA</div>
        : tableChecked?.table ?
        <div>Table</div>
        : <div>Please select one option</div>
      }
      </main>
    </main>
    </div>
  )
}

export default App
