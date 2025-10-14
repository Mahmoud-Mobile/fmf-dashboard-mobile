import React from "react";
import moment from "moment";
import { Colors } from "../../../Global/colors";

const PDFGenerator = {
  generateHTML: (filteredEvents, searchText, selectedDate) => {
    const currentDate = new Date().toLocaleDateString();
    const searchInfo = searchText ? `Search: "${searchText}"` : "";
    const dateInfo = selectedDate
      ? `From Date: ${selectedDate.toLocaleDateString()}`
      : "";
    const filterInfo = [searchInfo, dateInfo].filter(Boolean).join(" | ");

    const eventCardsHTML = filteredEvents
      .map((event) => {
        const formatDateRange = () => {
          if (event.startDate && event.endDate) {
            const startDate = moment(event.startDate);
            const endDate = moment(event.endDate);

            if (startDate.isSame(endDate, "day")) {
              return startDate.format("MMM D, YYYY h:mm A");
            } else {
              return `${startDate.format("MMM D")} - ${endDate.format(
                "MMM D, YYYY h:mm A"
              )}`;
            }
          }
          return "Date TBD";
        };

        return `
          <div class="event-card">
            <div class="event-card-content">
              <div class="event-header">
             <div class="icon-container">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="${
                   Colors.Primary
                 }" stroke-width="2" fill="none"/>
                 <line x1="16" y1="2" x2="16" y2="6" stroke="${
                   Colors.Primary
                 }" stroke-width="2" stroke-linecap="round"/>
                 <line x1="8" y1="2" x2="8" y2="6" stroke="${
                   Colors.Primary
                 }" stroke-width="2" stroke-linecap="round"/>
                 <line x1="3" y1="10" x2="21" y2="10" stroke="${
                   Colors.Primary
                 }" stroke-width="2" stroke-linecap="round"/>
               </svg>
             </div>
                <div class="event-info">
                  <div class="title-row">
                    <h3 class="event-title">${
                      event.title || event.name || "Untitled Event"
                    }</h3>
                    <div class="status-badge">
                      <span class="status-text">${
                        event.status || "Unknown"
                      }</span>
                    </div>
                  </div>
                  <p class="event-description">${
                    event.description || "No description available"
                  }</p>
                </div>
              </div>

              <div class="event-details">
                ${
                  event.location
                    ? `
                  <div class="detail-row">
                    <span class="detail-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="${Colors.Gray}" stroke-width="2" fill="none"/>
                        <circle cx="12" cy="10" r="3" stroke="${Colors.Gray}" stroke-width="2" fill="none"/>
                      </svg>
                    </span>
                    <span class="detail-text">${event.location}</span>
                  </div>
                `
                    : ""
                }
                
                <div class="detail-row">
                  <span class="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="${
                        Colors.Gray
                      }" stroke-width="2" fill="none"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="${
                        Colors.Gray
                      }" stroke-width="2" stroke-linecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="${
                        Colors.Gray
                      }" stroke-width="2" stroke-linecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="${
                        Colors.Gray
                      }" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                  <span class="detail-text">${formatDateRange()}</span>
                </div>
              </div>

              <div class="event-footer">
                <div class="footer-left">
                  ${
                    event.eventType
                      ? `
                    <div class="type-container">
                      <span class="type-label">Type:</span>
                      <span class="type-value">${event.eventType}</span>
                    </div>
                  `
                      : ""
                  }
                  ${
                    event.eventLevel
                      ? `
                    <div class="level-container">
                      <span class="level-label">Level:</span>
                      <span class="level-value">${event.eventLevel}</span>
                    </div>
                  `
                      : ""
                  }
                </div>

                <div class="footer-right">
                  <div class="active-indicator ${
                    event.isActive ? "active" : "inactive"
                  }">
                    <span class="active-text">${
                      event.isActive ? "Active" : "Inactive"
                    }</span>
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
          <title>FMF Events Report</title>
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
            
            .filter-info {
              background-color: rgba(0, 0, 0, 0.05);
              padding: 8px 12px;
              border-radius: 8px;
              margin: 8px 0;
              font-size: 12px;
              color: ${Colors.DarkGray};
            }
            
            .events-count {
              background-color: ${Colors.Primary};
              color: white;
              padding: 6px 12px;
              border-radius: 16px;
              font-size: 12px;
              font-weight: 600;
              display: inline-block;
              margin-top: 8px;
            }
            
            .events-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              max-width: 100%;
            }
            
            .event-card {
              background-color: ${Colors.White};
              border-radius: 16px;
              margin-right: 10px;
              margin-bottom: 16px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(0, 0, 0, 0.05);
              overflow: hidden;
            }
            
            .event-card-content {
              padding: 20px;
            }
            
            .event-header {
              display: flex;
              align-items: flex-start;
              margin-bottom: 16px;
            }
            
            .icon-container {
              background-color: rgba(0, 0, 0, 0.03);
              border-radius: 12px;
              padding: 12px;
              margin-right: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .calendar-icon {
              font-size: 24px;
              color: ${Colors.Primary};
            }
            
            .event-info {
              flex: 1;
            }
            
            .title-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 8px;
            }
            
            .event-title {
              font-size: 18px;
              font-weight: bold;
              color: ${Colors.Primary};
              line-height: 24px;
              flex: 1;
              margin-right: 12px;
              margin: 0;
            }
            
            .status-badge {
              padding: 4px 8px;
              border-radius: 12px;
              min-width: 60px;
              text-align: center;
              border: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .status-text {
              font-size: 10px;
              font-weight: 600;
              color: white;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .event-description {
              font-size: 14px;
              color: ${Colors.DarkGray};
              line-height: 20px;
              margin: 0;
            }
            
            .event-details {
              margin-bottom: 16px;
              gap: 8px;
            }

            .detail-row {
              display: flex;
              align-items: center;
              background-color: rgba(0, 0, 0, 0.02);
              padding: 8px 12px;
              border-radius: 8px;
              margin-bottom: 8px;
              border: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .detail-icon {
              margin-right: 8px;
              font-size: 16px;
              color: ${Colors.Gray};
            }
            
            .detail-text {
              font-size: 13px;
              font-weight: 500;
              color: ${Colors.Gray};
              flex: 1;
            }
            
            .event-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-top: 12px;
              border-top: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .footer-left {
              flex: 1;
              display: flex;
              gap: 16px;
            }
            
            .type-container, .level-container {
              display: flex;
              align-items: center;
            }

            .type-label, .level-label {
              font-size: 12px;
              font-weight: 500;
              color: ${Colors.Gray};
              margin-right: 4px;
            }

            .type-value, .level-value {
              font-size: 12px;
              font-weight: 600;
              color: ${Colors.Primary};
              text-transform: uppercase;
            }
            
            .footer-right {
              text-align: right;
            }
            
            .active-indicator {
              padding: 4px 8px;
              border-radius: 8px;
              min-width: 60px;
              text-align: center;
            }

            .active-text {
              font-size: 10px;
              font-weight: 600;
              color: white;
              text-transform: uppercase;
              letter-spacing: 0.5px;
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
              
              .event-card {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                page-break-inside: avoid;
              }
              
              .events-container {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>FMF Events Report</h1>
              <div class="subtitle">Generated on: ${currentDate}</div>
              <div class="header-info">
                ${
                  filterInfo
                    ? `<div class="filter-info">${filterInfo}</div>`
                    : ""
                }
                <div class="events-count">${filteredEvents.length} Event${
      filteredEvents.length !== 1 ? "s" : ""
    } Found</div>
              </div>
            </div>
            
            <div class="content">
              <div class="events-container">
                ${
                  filteredEvents.length > 0
                    ? eventCardsHTML
                    : `
                <div class="empty-state">
                  <div class="empty-icon">📅</div>
                  <h3 class="empty-title">No Events Found</h3>
                  <p class="empty-description">${
                    searchText
                      ? `No events match "${searchText}". Try a different search term.`
                      : "There are no events to display at the moment."
                  }</p>
                </div>
              `
                }
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  },
};

export default PDFGenerator;
