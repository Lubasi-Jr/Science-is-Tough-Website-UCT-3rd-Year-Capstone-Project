import React from 'react';
 

function Home({setView}){

  return(
 /*Adapted and customised from Bootstrap*/
 <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#FFF5E1"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><h1>Science is Tough</h1></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="nav-link" href="#" onClick={()=>setView('home')}>Home</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#" onClick={()=>setView('favourites')}>Favourites</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={()=>setView('quizzes')}>Quizzes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={()=>setView('distract')}> Distract Me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={()=>setView('weekly')}> Weekly challenge</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn" type="submit">Search</button>
      </form>
    </div>
  </div>
 </nav>
 );
}
export default Home