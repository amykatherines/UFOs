// import the data from data.js
const tableData = data;


// reference the html table using d3
// Declare a variable, tbody
// Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

// // Simple JavaScript console.log statement
// function printHello() {
//     console.log("Hello there!");
// }

function buildTable(data) {

    // First, clear out any existing data
    tbody.html("")

    // we have chained a for loop to our data. We also added an argument (dataRow) that will represent each row of the data as we iterate through the array.
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {

        // This single line of code is doing a lot. It tells JavaScript to find the <tbody> tag within the HTML and add a table row ("tr").
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        }
        );
    });

} 

function handleClick(inputChanged) {

    console.log("in function for " + inputChanged );
    // D3 looks a little different from what we're used to seeing, but that's because it's closely linked to HTML.
    // With d3.select("#datetime"), for example, we're telling D3 to look for the #datetime id in the HTML tags
    // By chaining .property("value"); to the d3.select function, we're telling D3 not only to look for where our 
    // date values are stored on the webpage, but to actually grab that information and hold it in the "date" variable.
    let date = d3.select("#datetime").property("value");

    //  tableData is the original data as imported from our data.js file
    // By setting the filteredData variable to our raw data, we're basically using it as a blank slate. 
    // The function we're working on right now will be run each time the filter button is clicked on the website. 
    // If no date has been entered as a filter, then all of the data will be returned instead.
    let filteredData = tableData;

    // JavaScript checks for a date. If one is present, it returns only the data with that date
    if (date) {
        
        // This line is what applies the filter to the table data. It's basically saying, 
        // "Show only the rows where the date is equal to the date filter we created above." 
        // The triple equal signs test for equality, meaning that the date in the table has to match our filter exactly.
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    //Rebuild the table with the filtered data
    buildTable(filteredData);

}


// Our selector string contains the id for another HTML tag. 
// (We'll assign a unique id to a button element in the HTML called "filter-btn".) 
// This time it'll be included in the button tags we create for our filter button. 
// By adding this, we're linking our code directly to the filter button. Also, by adding .on("click", handleClick);, 
// we're telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked.
d3.select("#datetime").on("change", function() {handleClick("test");});

// Build the table when the page loads
buildTable(tableData);