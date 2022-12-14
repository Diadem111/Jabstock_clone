import React, {useState,useEffect} from "react";
import axios from "axios";
import "./Investment.css";
import Sidebar from "../Sidebar/Sidebar";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import {faExclamationCircle,faArrowRight} from '@fortawesome/free-solid-svg-icons';



export default function Investment () {
  const [product,setProduct] = useState([]);
  const dispatch = useDispatch(); 
  const [document,setDocument] = useState([]); 
  const navigate = useNavigate();
  let currentUser = useSelector((state) => state.users.currentuser);
  console.log(currentUser);
  let data = currentUser;


  const [error,setError] = useState(null);
  const [filter, setfilter] = useState(document);

const url = "http://localhost:4000/user/getdoc/";

      useEffect(() => {
        axios.get(url).then((res) => {
          console.log(res.data.user);
          if(res.data){
            setDocument(res.data?.user);
            console.log(document);
            let productArray = []
              res.data.forEach((doc)=>{
              productArray.push(doc);
            })
          }  
        }).catch((err) => {
          setError(err.message);
        })
      }, [])
      
    return (
        <>
        <main className="App4">
            <section className="AppGlass4">
                <Sidebar userData={data}/>
                <div className="list4">
                <div className="container-fluid  mt-5 pt-5 justify-content-center cont">
                  <h5>Stocks</h5>
        <Table responsive className="mt-3">
      <thead className="head ">
        <tr>
          <th>Stock   <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /> </th>
          <th>Price  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th>Market Cap  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th>30d  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th>1y  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th>Volume(24hrs)  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th>Available supply  <FontAwesomeIcon icon={faExclamationCircle} size="xs"  /></th>
          <th hidden> fgoo</th>
        </tr>
      </thead>
      <tbody>
      {document.map((person)=>{
    //  let dd =   person.img1[0].public_id;
    //  let dd =   person.img1.map(x => x[0].public_id);
              console.log(person._id);
              // console.log(person.cloudinary_id_img[0].secure_url);
             return (
              <tr>
              <td>
              <div className="div1"  key={person._id}>
                
                <figure className="figure"> <img src={person.cloudinary_id_img[0].secure_url} alt="na img " width="40px" height="40px" className="magic"/>
                   </figure>
                      <h6 className="hqq ">{person.name}</h6>
                      <p className="pqq">{person.location.substring(0,20)}...</p>
               </div>
    
                   </td>
              <td className="pt-4 fw-bold">#{person.price}</td>
              <td className="pt-4 fw-bold">#{person.market_price}</td>
              <td className="pt-4 fw-bold text-success">{person.days}%</td>
              <td className="pt-4 fw-bold text-success">{person.year}%</td>
              <td className="pt-4 fw-bold">#{person.volume}</td>
              <td className="pt-4 fw-bold">{person.available_supply}</td>
              <td>
                <button className="but1 mt-2" onClick={()=>{
                           navigate(`/Graph/${person._id}`)
                         }}>Invest</button>
              </td>
            </tr>
             )
              })}
    
    
        
      </tbody>
    </Table>
      <span className="d-flex mt-4 text-center justify-content-center ">
      <button className="btn fff">Load more</button>
      
        </span>
          </div>
           </div>
       </section>
        </main>
        </>
    )
}