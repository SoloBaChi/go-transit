import {React,useState} from 'react';
import homeImageBg from "../images/go-transit-home.png";
import { Link } from 'react-router-dom';
// import { book } from 'fontawesome';
 


function Home(props) {
   
   const [bookSeat,setBookSeat] = useState({
    travellingFrom:"",
    travellingTo:"",
    departureDate:"",
    arrivalDate:"",
    timeOfTravel:"",
    numberOfTickets:""
   });


   const [bookSummary,setBookSummary] = useState("");

   const handleChange = ev => {
   setBookSeat({
    ...bookSeat,[ev.target.name]:ev.target.value
   })
   }


   const handleSubmit = ev => {
   ev.preventDefault()
   const bookingDetails = {
    travellingFrom:bookSeat.travellingFrom,
    travellingTo:bookSeat.travellingTo,
    departureDate:bookSeat.departureDate,
    arrivalDate:bookSeat.arrivalDate,
    timeOfTravel:bookSeat.timeOfTravel,
    numberOfTickets:bookSeat.numberOfTickets
   }
   // console.log(bookingDetails)
    fetch("https://go-transit-user-api.onrender.com/booking-details/create",{
      method:'POST',
      headers:{
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
      },
      body:JSON.stringify(bookingDetails)
     })
     .then((res)=>{
      return res.json();
     })
     .then((data)=>{
      setBookSummary(data.message)
     })
     .catch(err=>{
      console.log("not sent",err)
     })
   }


    return (
       <div className='pd-x'>
        <div className='home-wrapper'>
        <div className='img-container'>
            <img className='img-content' src={homeImageBg} alt='transit bus'/>
        </div>
        <div className='absolute-container'>

        <form onSubmit = {handleSubmit}>
        <div className='form-header'>
         <p>Book a Seat </p>
        </div>
        <div className='form-body'>
        <div className='form-field'>
         <select id='travellingFrom' 
          value={bookSeat.travellingFrom} 
          onChange={handleChange}
          name = 'travellingFrom'
         >
            <option value="">travelling from </option>
            <option value="enugu">Enugu </option>
            <option value="lagos">Lagos </option>
            <option value = "ebonyi">Ebonyi </option>
            <option value = "delta">delta </option>
         </select>
         </div>
         <div className='form-field'>
         <select id='travellingTo'
         value={bookSeat.travellingTo} 
         onChange={handleChange}
         name = 'travellingTo'
         >
            <option value="">travelling to </option>
            <option value="ekiti">Ekiti </option>
            <option value="benue">Benue </option>
            <option value = "anambra">Anambra </option>
            <option value = "kogi">Kogi </option>
         </select>
         </div>

         <div className='form-field-2 form-field'>
         <label htmlFor='departureDate'>Departure Date</label>
         <input type='Date' 
          id='departureDate'
          value={bookSeat.departureDate} 
          onChange={handleChange}
          name = 'departureDate'
          placeholder='Departure Date'/>
         </div>

         <div className='form-field-2 form-field'>
         <label htmlFor='arrivalDate'>Arrival Date (optional)</label>
         <input type='Date' 
         value={bookSeat.arrivalDate} 
         onChange={handleChange}
         name = 'arrivalDate'
         placeholder='Departure Date'/>
         </div>

         <div className='form-field'>
         <select id='timeOfTravel'
         value={bookSeat.timeOfTravel} 
         onChange={handleChange}
         name = 'timeOfTravel'
         >
            <option value="">Time of  travel </option>
            <option value="morning">Morning </option>
            <option value="afternoon">Afternoon </option>
            <option value = "night">Night </option>
         </select>
         </div>

         <div className='form-field'>
         <select id='numberOfTickets'
         value={bookSeat.numberOfTickets} 
         onChange={handleChange}
         name = 'numberOfTickets'
         >
            <option value="">Number of Tickets </option>
            <option value="1"> 1 </option>
            <option value="3"> 3 </option>
            <option value = "7"> 7 </option>
         </select>
         </div>

         

        </div>
        <div className='form-footer'>
          {/* <Link className='link' to ="/signup">   */}
          <button 
          className='cta-btn
          type="submit"
          '>
            Proceed
         </button>
         {/* </Link> */}
            
        </div>
       </form>
       <p style ={{color:"green",paddingBottom:"2rem"}}> {bookSummary} !</p>

        </div>
       
       </div>
       </div> 
    );
}



export default Home;