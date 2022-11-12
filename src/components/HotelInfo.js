import React, { useState, useEffect } from 'react';
//import amenityInfoList from './data/amenities.json';
//import arrivalInfoList from './data/arrival_info.json';
//import accessibilityList from './data/accessibilities.json';

const HotelInfo = () => {
  /* */
  const [arrivalInfoList, setArrivalInfoList] = useState([]);
  const [amenityInfoList, setAmenityInfoList] = useState([]);
  const [accessibilityList, setAccessibilityList] = useState([]);

  const loadArrivalInfo = async () => {
    const resp = await fetch("https://2cdhuanguh.execute-api.eu-west-2.amazonaws.com/Production/arrivalinfo");
    let jsonData = await resp.json();

    setArrivalInfoList(jsonData);
  }

  const loadAmenityInfo = async () => {
    const resp = await fetch("https://2cdhuanguh.execute-api.eu-west-2.amazonaws.com/Production/services");
    let jsonData = await resp.json();

    setAmenityInfoList(jsonData.map(item => item.name));
  }  

  const loadAccessibilityInfo = async () => {
    const resp = await fetch("https://2cdhuanguh.execute-api.eu-west-2.amazonaws.com/Production/accessibilities");
    let jsonData = await resp.json();

    setAccessibilityList(jsonData.map(item => item.name));
  }  

  useEffect(() => {
    Promise.all([
      loadArrivalInfo(),
      loadAmenityInfo(),
      loadAccessibilityInfo()
    ])
  }, []) 
  /* */  
  return (
    <div className="scene" id="hotelinfo">
      <article className="heading">
        <h1>Essential Info</h1>
      </article>
      <article id="usefulinfo">
        <section id="arrivalinfo">
          <h2>Arrival Information</h2>
          <ul>
            {
              arrivalInfoList.map((item) => (
                <li><strong>{item.name}:</strong> {item.info}</li>
              ))
            }
          </ul>
        </section>
        <section className="checklist" id="services">
          <h2>Services and Amenities</h2>
          <p>Our services and amenities are designed to make your travel easy, your stay comfortable, and your experience one-of-a-kind.</p>
          <ul>
            {
              amenityInfoList.map((item) => (
                <li>{item}</li>
              ))
            }
          </ul>
        </section>
        <section className="checklist" id="accessibility">
          <h2>Accessibility</h2>
          <p>We're committed to maintaining the same quality of service for every individual. We offer the following facilities for those with special needs:</p>
          <ul>
            {
              accessibilityList.map((item) => (
                <li>{item}</li>
              ))
            }
          </ul>
        </section>
      </article>
      <article id="greenprogram">
        <h2>Landon Green Program</h2>
        <p><strong>The Landon Hotel - London</strong> was recently renovated, and we considered the impact on the earth the entire way. From green building materials, to solar power, to energy-friendly lighting and appliances throughout the hotel - we’re saving energy in every socket, outlet, and switch. We’ve also initiated a recycling and composting program that reduces the load to local landfills, while providing valuable raw material for use in new products, or in the case of compost, for use in local gardens and landscapes.</p>
      </article>
    </div>
  )
}

export default HotelInfo;