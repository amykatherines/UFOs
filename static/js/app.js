// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

var dateInput = d3.select("#datetime");
var cityInput = d3.select("#city");
var stateInput = d3.select("#state");
var countryInput = d3.select("#country");
var shapeInput = d3.select("#shape");


// 3. Use this function to update the filters. 
// 4a. Save the element that was changed as a variable.
function updateFilters(filterChanged) {



    // D3 looks for the #datetime id in the HTML tags
    // By chaining .property("value"); to the d3.select function, D3 not will look for where our date value is and  
    // grab that information and hold it in the "date" variable.
    let date = d3.select("#datetime").property("value");

    // 4b. Save the value that was changed as a variable.
    let newValue = d3.event.target.value;

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = filterChanged;
    
     // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (newValue !== "") {
      filters[filterId] = newValue;
    }
    else {
      delete filters[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable(filters);
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable(filters) {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (const filterToApply in filters) {
      //filteredData = filteredData.filter(row => row.datetime === date);
      filteredData = filteredData.filter(row => row[filterToApply] === filters[filterToApply]);
    }    

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
    // 2. Attach an event to listen for changes to each filter
    dateInput.on("change", function(){updateFilters("datetime");}); 
    cityInput.on("change", function(){updateFilters("city");}); 
    stateInput.on("change", function(){updateFilters("state");}); 
    countryInput.on("change", function(){updateFilters("country");}); 
    shapeInput.on("change", function(){updateFilters("shape");}); 

  
  // Build the table when the page loads
  buildTable(tableData);
