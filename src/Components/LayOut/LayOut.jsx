import React from 'react'
import Header from '../../Components/Header/Header.jsx'

function LayOut({children}) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default LayOut
