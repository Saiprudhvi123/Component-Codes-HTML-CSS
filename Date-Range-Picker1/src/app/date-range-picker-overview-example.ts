import { Component, ElementRef, AfterViewInit } from '@angular/core';
import flatpickr from 'flatpickr'; // Import flatpickr library
 
@Component({
  selector: 'date-range-picker-overview-example',
  templateUrl: 'date-range-picker-overview-example.html',
  styleUrls: ['date-range-picker-overview-example.css']
})
export class DateRangePickerOverviewExample implements AfterViewInit {
  constructor(private elRef: ElementRef) {}
 
  ngAfterViewInit() {
    flatpickr("#daterange", {
      mode: "range", // Enable range selection
      dateFormat: "Y-m-d", // Date format
      maxDate: "today", // Maximum selectable date
      onChange: (selectedDates: Date[], dateStr: string, instance: any) => {
        // Remove previous custom class before setting new one
        instance.remove("selected-range");
        // Set custom class for selected date range
        if (selectedDates.length == 2) {
          const startDate = selectedDates[0];
          const endDate = selectedDates[1];
          instance.set("selected-range", [startDate, endDate]);
        }
      },
      onReady: (selectedDates: Date[], dateStr: string, instance: any) => {
        const calendarContainer = instance.calendarContainer;
 
        // Apply green color to all UI elements except days
        const uiElements = calendarContainer.querySelectorAll('.flatpickr-dayContainer, .flatpickr-month, .flatpickr-weekdays');
        uiElements.forEach((element: any) => {
          element.style.color = '#00A77F'; // Green color
        });
 
        const applyBtn = document.createElement('button');
        applyBtn.textContent = 'Go Back';
        applyBtn.style.backgroundColor = '#FFFFFF'; // Change background color to white
        applyBtn.style.color = '#00A77F'; // Apply green color for text
        applyBtn.style.padding = '10px 20px'; // Apply padding
        applyBtn.style.border = '1px solid #000'; // Add a 1px solid black border
        applyBtn.style.borderRadius = '25px'; // Apply larger border radius for round shape
        applyBtn.style.cursor = 'pointer'; // Apply cursor style
        applyBtn.style.fontSize = '14px'; // Apply font size
        applyBtn.addEventListener('click', () => {
          instance.close(); // Close the calendar popup
          instance.clear(); // Clear selected dates
        });
 
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Apply';
        cancelBtn.style.backgroundColor = '#00A77F'; // Apply background color
        cancelBtn.style.color = '#fff'; // Apply text color
        cancelBtn.style.padding = '10px 20px'; // Apply padding
        cancelBtn.style.border = 'none'; // Remove border
        cancelBtn.style.borderRadius = '25px'; // Apply larger border radius for round shape
        cancelBtn.style.cursor = 'pointer'; // Apply cursor style
        cancelBtn.style.fontSize = '14px'; // Apply font size
        cancelBtn.addEventListener('click', () => {
          instance.close(); // Close the calendar popup
        });
 
        // Create container for buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flatpickr-buttons-container';
        buttonsContainer.style.display = 'flex'; // Apply flex display
        buttonsContainer.style.justifyContent = 'space-around'; // Apply space-around alignment
        buttonsContainer.style.margin = '10px auto'; // Apply margin
        buttonsContainer.appendChild(applyBtn);
        buttonsContainer.appendChild(cancelBtn);
        calendarContainer.appendChild(buttonsContainer);
      }
    });
  }
}