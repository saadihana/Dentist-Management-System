// import imagePath from "../assets/logo.jpg"; 

// function Header(){

//     return(
//         <>
//         <header>
//             <img  className="header-img"src={imagePath} width="60" height="75"></img>
//             <h1 className="Title" style={{fontSize:"40px", marginTop:"20px", marginLeft:"20px"}}>Table Patients</h1>
            
//         </header>
//         <hr></hr>
//         </>       
//     );


// }
// export default Header

import imagePath from "../assets/logo.jpg";

function Header() {
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          padding: "10px 20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderBottom: "2px solid #ddd",
          height:"65px"
        }}
      >
        <img
          className="header-img"
          src={imagePath}
          width="60"
          height="75"
          alt="Logo"
          style={{
            borderRadius: "5px",
            marginRight: "20px",
          }}
        />
        <h1
          className="Title"
          style={{
            fontSize: "40px",
            margin: "0",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            color: "#0066ba"
          }}
        >
          Table Patients
        </h1>
      </header>
      <hr />
    </>
  );
}

export default Header;
