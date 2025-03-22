import React,{useState} from 'react'
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ArrowUp from '@mui/icons-material/KeyboardArrowUp';

export default function QuantityBox() {

const [inputvalue , setinputvalue] = useState(1);


  const plus = ()=>{
    setinputvalue(inputvalue+1);
  }
  
  const mins = ()=>{
    if(inputvalue !== 1){
      setinputvalue(inputvalue-1);
    }

  }
    
  return (
    <>  
        <div className="countSection">
            <input type="number" value={inputvalue} readOnly/>
            <span className='arrow up'onClick={plus}><ArrowUp/></span>
            <span className='arrow down' onClick={mins}><ArrowDown/></span>
        </div>
    
    </>
  )
}
