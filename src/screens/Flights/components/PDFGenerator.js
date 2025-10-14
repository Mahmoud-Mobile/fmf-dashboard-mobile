import React from "react";
import moment from "moment";
import { Colors } from "../../../Global/colors";

const PDFGenerator = {
  generateHTML: (
    filteredFlights,
    searchText,
    selectedDate,
    selectedCategory
  ) => {
    const currentDate = moment().format("MMM D, YYYY");
    const filterInfo = [
      searchText ? `Search: "${searchText}"` : "",
      selectedDate
        ? `From Date: ${moment(selectedDate).format("MMM D, YYYY")}`
        : "",
      selectedCategory ? `Category: ${selectedCategory.toUpperCase()}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const flightCardsHTML = filteredFlights
      .map((flight) => {
        return `
       <div class="flight-card">
         <div class="header-gradient">
           <div class="header-content">
             <div class="flight-info">
               <div class="airline-name">${
                 flight.arrivalAirlinesName || flight.returnAirlineName || "N/A"
               }</div>
               <div class="flight-number">${
                 flight.arrivalFlightNumber || flight.returnFlightNumber
               }</div>
             </div>
             <div class="status-container">
               <div class="status-badge">
                 <span class="status-text">${selectedCategory.toUpperCase()}</span>
               </div>
             </div>
           </div>
         </div>

         <div class="content">
           <div class="route-info">
             <div class="airport-info">
               <div class="airport-code">${
                 flight.arrivalAirportCode || flight.returnAirportCode
               }</div>
               <div class="airport-name">${
                 flight.arrivalAirport || flight.returnAirport
               }</div>
               <div class="city-country">${
                 flight.arrivalCity || flight.returnCity
               }, ${flight.arrivalCountry || flight.returnCountry}</div>
             </div>
           </div>

           <div class="time-info">
             ${
               flight.arrivalDate
                 ? `
               <div class="time-container">
                 <div class="time-label">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px;">
                     <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#667eea"/>
                   </svg>
                   Arrival
                 </div>
                 <div class="time-value">${moment(
                   new Date(flight.arrivalDate)
                 ).format("HH:mm")}</div>
                 <div class="date-value">${moment(
                   new Date(flight.arrivalDate)
                 ).format("MMM DD, YYYY")}</div>
               </div>
             `
                 : ""
             }

             ${
               flight.estimatedArrivalTime
                 ? `
               <div class="time-container">
                 <div class="time-label">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px;">
                     <circle cx="12" cy="12" r="10" stroke="#667eea" stroke-width="2" fill="none"/>
                     <polyline points="12,6 12,12 16,14" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   Estimated
                 </div>
                 <div class="time-value">${moment(
                   new Date(flight.estimatedArrivalTime)
                 ).format("HH:mm")}</div>
                 <div class="date-value">${moment(
                   new Date(flight.estimatedArrivalTime)
                 ).format("MMM DD, YYYY")}</div>
               </div>
             `
                 : ""
             }
           </div>

           <div class="additional-info">
             <div class="info-row">
               <span class="info-label">Flight Type:</span>
               <span class="info-value">${flight.flightType || "N/A"}</span>
             </div>
             <div class="info-row">
               <span class="info-label">Class:</span>
               <span class="info-value">${flight.flightClass || "N/A"}</span>
             </div>
           </div>

           <div class="user-info-section">
             <div class="user-info-title">Passenger Info</div>
             <div class="user-info-container">
               <div class="user-photo-container">
                 <div class="user-photo">👤</div>
               </div>
               <div class="user-details">
                 <div class="user-name">Mahmoud</div>
                 <div class="user-mobile">+96659116100</div>
               </div>
             </div>
           </div>
         </div>
       </div>
     `;
      })
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FMF Flights Report</title>
         <style>
           @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

           * {
             margin: 0;
             padding: 0;
             box-sizing: border-box;
           }

           body {
             font-family: 'Montserrat', sans-serif;
             background-color: #F8F9FA;
             padding: 10px;
             color: #333;
             line-height: 1.6;
           }

           .container {
             max-width: 800px;
             margin: 0 auto;
             background: white;
           }

           .header {
             text-align: center;
             margin-bottom: 20px;
             padding: 15px;
             background-color: ${Colors.White};
             border-radius: 16px;
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
           }

           .header h1 {
             color: ${Colors.Primary};
             font-size: 24px;
             font-weight: 700;
             margin: 0 0 8px 0;
           }

           .header .subtitle {
             color: ${Colors.Gray};
             font-size: 14px;
             margin: 5px 0;
           }

           .category-info {
             background-color: ${Colors.Primary};
             color: white;
             padding: 4px 12px;
             border-radius: 12px;
             font-size: 12px;
             font-weight: 600;
             display: inline-block;
             margin: 5px 0;
             text-transform: uppercase;
             letter-spacing: 0.5px;
           }

           .filter-info {
             background-color: rgba(0, 0, 0, 0.05);
             padding: 8px 12px;
             border-radius: 8px;
             margin: 8px 0;
             font-size: 12px;
             color: ${Colors.DarkGray};
           }

           .flights-count {
             background-color: ${Colors.Primary};
             color: white;
             padding: 6px 12px;
             border-radius: 16px;
             font-size: 12px;
             font-weight: 600;
             display: inline-block;
             margin-top: 8px;
           }

           .flights-container {
             display: grid;
             grid-template-columns: 1fr 1fr 1fr;
             gap: 8px;
             max-width: 100%;
           }

           .flight-card {
             background-color: ${Colors.White};
             border-radius: 12px;
             margin-bottom: 8px;
             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
             border: 1px solid rgba(0, 0, 0, 0.05);
             overflow: hidden;
           }

           .header-gradient {
             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
             padding: 8px;
           }

           .header-content {
             display: flex;
             flex-direction: row;
             justify-content: space-between;
             align-items: center;
           }

           .flight-info {
             flex: 1;
           }

           .airline-name {
             font-size: 12px;
             font-weight: 600;
             color: #FFFFFF;
             margin-bottom: 2px;
             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
           }

           .flight-number {
             font-size: 10px;
             font-weight: 400;
             color: rgba(255, 255, 255, 0.9);
           }

           .status-container {
             align-items: flex-end;
           }

           .status-badge {
             padding: 8px 14px;
             border-radius: 20px;
             background-color: rgba(255, 255, 255, 0.2);
             border: 1px solid rgba(255, 255, 255, 0.3);
           }

           .status-text {
             font-size: 11px;
             font-weight: 500;
             color: #FFFFFF;
             text-transform: uppercase;
             letter-spacing: 0.5px;
           }

           .content {
             padding: 20px;
             background-color: #FAFBFC;
             border-bottom-left-radius: 24px;
             border-bottom-right-radius: 24px;
           }

           .route-info {
             margin-bottom: 16px;
             display: flex;
             justify-content: space-between;
           }

           .airport-info {
             text-align: center;
             flex: 1;
           }

           .airport-code {
             font-size: 32px;
             font-weight: 700;
             color: ${Colors.Primary};
             margin-bottom: 8px;
             text-shadow: 0 2px 4px rgba(136, 12, 185, 0.3);
           }

           .airport-name {
             font-size: 15px;
             font-weight: 500;
             color: #2D3748;
             text-align: center;
             margin-bottom: 3px;
           }

           .city-country {
             font-size: 13px;
             font-weight: 400;
             color: #718096;
             text-align: center;
           }

           .time-info {
             display: flex;
             justify-content: space-around;
             margin-bottom: 20px;
             background-color: #FFFFFF;
             border-radius: 20px;
             padding: 20px;
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
             border: 1px solid rgba(136, 12, 185, 0.08);
           }

           .time-container {
             text-align: center;
             flex: 1;
           }

           .time-label {
             font-size: 12px;
             font-weight: 500;
             color: #667eea;
             margin-bottom: 6px;
             text-transform: uppercase;
             letter-spacing: 0.5px;
           }

           .time-value {
             font-size: 20px;
             font-weight: 700;
             color: #2D3748;
             margin-bottom: 3px;
           }

           .date-value {
             font-size: 12px;
             font-weight: 400;
             color: #718096;
           }

           .additional-info {
             display: flex;
             justify-content: space-between;
             background-color: #FFFFFF;
             border-radius: 12px;
             padding: 12px;
             box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
             margin-bottom: 12px;
             border: 1px solid rgba(0, 0, 0, 0.05);
           }

           .info-row {
             display: flex;
             align-items: center;
           }

           .info-label {
             font-size: 13px;
             font-weight: 500;
             color: #667eea;
             margin-right: 6px;
           }

           .info-value {
             font-size: 13px;
             font-weight: 400;
             color: #2D3748;
           }

           .user-info-section {
             margin-top: 16px;
             background-color: #FFFFFF;
             border-radius: 16px;
             padding: 16px;
             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
           }

           .user-info-title {
             font-size: 14px;
             font-weight: 600;
             color: #667eea;
             margin-bottom: 12px;
             text-align: center;
             text-transform: uppercase;
             letter-spacing: 0.5px;
           }

           .user-info-container {
             display: flex;
             align-items: center;
           }

           .user-photo-container {
             margin-right: 12px;
           }

           .user-photo {
             width: 50px;
             height: 50px;
             border-radius: 25px;
             border: 2px solid #667eea;
             background-color: #f3f4f6;
             display: flex;
             align-items: center;
             justify-content: center;
             font-size: 24px;
           }

           .user-details {
             flex: 1;
             text-align: right;
           }

           .user-name {
             font-size: 16px;
             font-weight: 600;
             color: #2D3748;
             margin-bottom: 4px;
           }

           .user-mobile {
             font-size: 14px;
             font-weight: 400;
             color: #718096;
           }

           .empty-state {
             text-align: center;
             padding: 60px 20px;
             background-color: ${Colors.White};
             border-radius: 16px;
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
           }

           .empty-icon {
             font-size: 48px;
             margin-bottom: 16px;
           }

           .empty-title {
             font-size: 20px;
             font-weight: 600;
             color: ${Colors.Gray};
             margin: 0 0 8px 0;
           }

           .empty-description {
             font-size: 14px;
             color: ${Colors.LightGray};
             margin: 0;
           }

           @media print {
             body {
               background: white !important;
               padding: 5px !important;
             }

             .container {
               box-shadow: none !important;
             }

             .header {
               box-shadow: none !important;
               border: 1px solid #ddd !important;
             }

             .flight-card {
               box-shadow: none !important;
               border: 1px solid #ddd !important;
               page-break-inside: avoid;
             }

             .flights-container {
               grid-template-columns: 1fr 1fr !important;
             }
           }
         </style>
      </head>
       <body>
         <div class="container">
           <div class="header">
             <h1>FMF Flights Report</h1>
             <div class="subtitle">Generated on: ${currentDate}</div>
             <div class="category-info">Category: ${selectedCategory.toUpperCase()}</div>
             ${filterInfo ? `<div class="filter-info">${filterInfo}</div>` : ""}
             <div class="flights-count">${
               filteredFlights.length
             } ${selectedCategory} Flight${
      filteredFlights.length !== 1 ? "s" : ""
    } Found</div>
           </div>
           
           <div class="flights-container">
             ${
               filteredFlights.length > 0
                 ? flightCardsHTML
                 : `
               <div class="empty-state">
                 <div class="empty-icon">✈️</div>
                 <div class="empty-title">No Flights Found</div>
                 <div class="empty-description">${
                   searchText
                     ? `No flights match "${searchText}". Try a different search term.`
                     : "There are no flights to display at the moment."
                 }</div>
               </div>
             `
             }
           </div>
         </div>
       </body>
      </html>
    `;
  },
};

export default PDFGenerator;
