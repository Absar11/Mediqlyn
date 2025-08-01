import React from 'react'
import Header from '../componants/Header'
import SpecialityMenu from '../componants/SpecialityMenu'
import Topdoctors from '../componants/Topdoctors'
import Banner from '../componants/Banner'

function Home() {
  return (
    <div>
       <Header/>
       <SpecialityMenu/>
       <Topdoctors/>
       <Banner/>
    </div>
  )
}

export default Home