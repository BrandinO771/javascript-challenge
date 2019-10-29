
d3.selectAll("button").on("click", function()
  {
    // What will be logged out? What is `this` in this case?
    console.log(this);
    // Answer: It will console log the `button` element.
  });
// NOTE IT SEEMS THAT CLICK EVENTS PROCESS ONE TIME UPDATE THROUGH ALL CODE CHECKING 
// VARIABLE STATES - IF STMTS JUST HANGING OUT IN THE CODE BELOW WILL NOT RUN UNLESS IN 
// A FUNCTION

///--------------------------------------------------------------
///         CODE SECTIONS BELOW   
///--------------------------------------------------------------

///  (1)    VARIABLES     
///  (2)    CREATE UNIQUE SORTED LISTS FROM DATA
///  (3)    BUILD DROP DOWN LIST BUTTONS 
///  (4)    OUTPUT TABLE GENERATOR  
///  (5)    CLICK FILTER EVENTS  

///--------------------------------------------------------------
///         TO DO LIST   
///--------------------------------------------------------------  
// 1. CREATE BUTTON TO DISPLAY ENTIRE TABLE -DONE
// 2. CREATE DROP DOWN FOR SHAPE - DONE
// 3. ATTEMPT 2-3 MULTI-FILTER INTERGRATION WITH EXISTING -DONE
// multi filter is somewhat functional - the drop downs are not smart enough
  // so just hit the reset button at bottom to reset filters if they get messed up

//--------------------------------------------------------------
///  (1)       VARIABLES     
//--------------------------------------------------------------
var button = d3.select("#filter-by-date");
var tableData = data;
var tbody = d3.select("tbody");
var table = d3.select("table");

table.attr("class", "table table-striped");

var city_butt = d3.select("#city_drops");
var city_drop = d3.select("#city_drops");
var city_val = "";

var state_butt = d3.select("#state_drops");
var state_drop = d3.select("#state_drops");
var state_val = "";

var shape_val = "";
var shape_butt = d3.select("#shape_drops");
var shape_drop = d3.select("#shape_drops");

var date_val = "";

var all_butt = d3.select("#filter-all-data") ;// display all data button
var mult_f_on = d3.select("#multi-on");
var mult_f_off = d3.select("#multi-off");
var multi_fltr_options = ["city", "state", "date", "shape"];

var filter1 = d3.select("#filter1_drop");
var filter2 = d3.select("#filter2_drop");
var filter3 = d3.select("#filter3_drop");

var process_multi = d3.select("#filter-multi");
var reset_multi = d3.select('#reset-multi');

var filter1_val = []; // i used a local var instead
var filter2_val = [];
var filter3_val = [];

var filter2List = [];
var filter3List = [];
var multi_filter = false; 
var filter_array = [];
var full_filter = [];

var counter1 = 0 ;
var counter2 = 0 ;
var counter3 = 0 ;

// console.log( `multi_filter is :${multi_filter} `);
//--------------------------------------------------------------


//--------------------------------------------------------------
///  (2)    CREATE UNIQUE SORTED LISTS FROM DATA
//--------------------------------------------------------------


tbody.html("Click Filters and Buttons Left to  Display Data");



 function uniqueAndSort(arr1)
 {
    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === v) return true;
        }
        return false;
      };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);
          }
        }
        return arr;
      }

    var step2_ = arr1.unique(); // result = [1,3,4,2,8]
    step2_.sort(function(a, b){
        if (a < b) {return -1; }
        if (a > b) {return  1; }
        return 0;
     })
     return step2_
}


//--------------------------------------------------------------
///  (3)        BUILD DROP DOWN LIST BUTTONS : BELOW
//--------------------------------------------------------------

function make_city_dd()
    {
        var city = tableData.map(y => y.city)
        cities = uniqueAndSort(city)
        cities.map(( x ) =>
                {
                var drop_item = city_drop.append("option");
                drop_item.append("value").text(x);  
                }
            );
    }


function make_state_dd()
    {
        var state = tableData.map(y => y.state)
        states = uniqueAndSort(state)
        states.map(( x ) =>
                {
                var drop_item = state_drop.append("option");
                drop_item.append("value").text(x);  
                }
            );
    }

function make_shape_dd()
  {
        var shape = tableData.map(y => y.shape)
        shapes = uniqueAndSort(shape)
        shapes.map(( x ) =>
                {
                var drop_item = shape_drop.append("option");
                drop_item.append("value").text(x);  
                }
            );
  }

function make_1st_fltr()
    {
      console.log(" at beginning of func the counter is :", counter1)
  
              multi_fltr_options.map((x )=>
                  {
                  if (counter1 < 4)
                      {
                      var drop_item = filter1.append("option");   
                      drop_item.append("value").text(x);  
                      counter1 +=1 
                      }
                   }
                );
      console.log(" at end of func the counter is :", counter1)
    }

  function make_2nd_fltr()
    {
      filter2List.map((x )=>
        {
          if (counter2 < 3 )
              {
              var drop_item = filter2.append("option");
              drop_item.append("value").text(x);
              counter2 +=1
              }         
            }  
        );    
    }

  function make_3rd_fltr()
    {
      filter3List.map((x )=>
        {
          if ( counter3 < 2)
            {
            var drop_item = filter3.append("option");
            drop_item.append("value").text(x); 
            counter3 +=1; 
            }
        }
      );
    }
 

make_city_dd();    
make_state_dd();
make_shape_dd();

function reset_filter1()
  {
    filter1.html("");
    var drop_item1 = filter1.append("option");
    drop_item1.append("value").text("1st Filter Assign"); 
    counter1 = 0;
    make_1st_fltr();
  }

  function reset_filter2()
  {
    filter2.html("");
    counter2 = 0;
    var drop_item2 = filter2.append("option");
    drop_item2.append("value").text("2nd Filter Assign");  
  }

  function reset_filter3()
  {
    filter3.html("");
    counter3 = 0;
    var drop_item3 = filter3.append("option");
    drop_item3.append("value").text("3rd Filter Assign");  
  }

function reset_multi_filters()
    {
      tbody.html("");
      reset_filter2();
      reset_filter3();
      reset_filter1();

    }

//--------------------------------------------------------------
///         BUILD DROP DOWN LIST BUTTONS : ABOVE 
//--------------------------------------------------------------

//--------------------------------------------------------------
///    (4)       OUTPUT TABLE GENERATOR BELOW  
//--------------------------------------------------------------

 // loads full table on page load 
// on page load we can load whole table
function full_table()
{
    tableData.map(( x ) =>
        {
            var row = tbody.append("tr");
            row.append("td").text(x.datetime);
            row.append("td").text(x.city);  
            row.append("td").text(x.state); 
            row.append("td").text(x.country);  
            row.append("td").text(x.shape);  
            row.append("td").text(x.durationMinutes);  
            row.append("td").text(x.comments);  
        }
      );
 }   

 function criteria_table3(list)
 {
     tbody.html(""); // this will clear the table 
 
     list.map(( x ) =>
         {
             var row = tbody.append("tr");
             row.append("td").text(x.datetime);
             row.append("td").text(x.city);  
             row.append("td").text(x.state); 
             row.append("td").text(x.country);  
             row.append("td").text(x.shape);  
             row.append("td").text(x.durationMinutes);  
             row.append("td").text(x.comments);  
         }
     );
  } 

//--------------------------------------------------------------
///          OUTPUT TABLE GENERATOR ABOVE  
//--------------------------------------------------------------


//--------      ----------      ----------      ----------      


//--------------------------------------------------------------
///     (5)     CLICK  FILTER EVENTS BELOW  
//--------------------------------------------------------------

 // ON BUTTON CLICK IF CORRECT CRITERIA MATCH 
 // CLEAR TABLE 
 // RUN FUNCTION TO APPEND TABLE WITH JUST MATCH FILTER DATA

      filter1.on("click", function() // GRAB VAL FROM FILTER LIST 1 // APPEND MASTER ARRAY // BUILD DROP DOWN LIST2
          {
            if ( filter1.property("value") != "1st Filter Assign"  ) 
                {
                var sel_val = filter1.property("value");  
                }
          //  console.log(`this is the first selected value ${sel_val}`);
          //  console.log(`this is filter2 list should be empty ${filter2List}`);
              if (sel_val != "" && sel_val != undefined)
              {
                filter_array[0] = sel_val;
                console.log(filter_array) ;
                console.log( " filter2List.length" , filter2List.length );
                multi_fltr_options.map(( x )=>
                      {
                        if ( x != sel_val  )
                            {
                            console.log(x);
                            filter2List.push(x) 
                            }
                      }
                  );
                  console.log( " filter2List.length" , filter2List.length );
                }   
            // console.log(`this is filter2 list should only have 3 elements ${filter2List}`);
            make_2nd_fltr();
           });

        filter2.on("click", function()  /// grab values from filter 2 //append master array // and filter drop list 3
            {
              if ( filter2.property("value") != "2nd Filter Assign"  ) 
                  {
                  var sel_val = filter2.property("value");  
                  }

              if (sel_val != "" && sel_val != undefined)
                  {
                    filter_array[1] = sel_val;
                    console.log(filter_array) ;
                    
                    filter2List.map(( x )=>
                          {
                            if ( x != sel_val )
                                {
                                console.log(x);
                                filter3List.push(x) 
                                }
                          }
                      );
                  } 
                make_3rd_fltr() 
                        // console.log(`this is filter2 list should only have 3 elements ${filter2List}`);
            });  

          filter3.on("click", function() // GRAB VAL FROM FILTER LIST 3 
            {
              if ( filter3.property("value") != "3rd Filter Assign"  ) 
                  {
                  var sel_val = filter3.property("value");  
                  }
              if (sel_val != "" && sel_val != undefined)
                  {
                    filter_array[2] = sel_val;
                    console.log(filter_array) ;
                  } 
            });  
   
    button.on("click", function() // DATE INPUT FIELD 
        {
        var inputElement = d3.select("#datetime");       // Select the input element and get the raw HTML node
        var inputValue  = inputElement.property("value"); // Get the value property of the input element
        date_val = inputValue ;
        console.log(inputValue);
        filtered_date   = tableData.filter(  data_items  => data_items.datetime === inputValue);
        if (multi_filter == false ) {   criteria_table3(filtered_date);  } else {  console.log("will not display table multifilter on"); }//multi_filter_array(filtered_date);
        });

    shape_butt.on("click", function() // SELECT SHAPE 
        {
         shape_val = shape_butt.property("value");
         filter_shape = tableData.filter(  data_items  => data_items.shape === shape_val);
        if (multi_filter == false ) {   criteria_table3(filter_shape);  } else {  console.log("will not display table multifilter on"); }//multi_filter_array(filter_city);
        });

    city_butt.on("click", function() // SELECT CITY 
        {
        city_val     = city_butt.property("value");
        console.log(city_val);
        filter_city    = tableData.filter(  data_items  => data_items.city === city_val);
        if (multi_filter == false ) {   criteria_table3(filter_city);  } else {  console.log("will not display table multifilter on"); }//multi_filter_array(filter_city);
        console.log("from city butt click  filter_city is :", filter_city);
        // filteredData    = tableData.filter(  data_items  => data_items.city === sel_val);
        // criteria_table3(filteredData );
        });


    state_butt.on("click", function()  // SELECT STATE 
        {
        state_val     = state_butt.property("value");
        // var sel_val2    = city_butt.property("value");
        // if( sel_val1 != "Select State" ) // IF YOU WANT TO MULTIFILTER THEN ONCE A BUTTON IS CLICK CHECK ALL BUTTON VALUES THEN RUN FILTER SEQUENCE THROUGH BUTTON VALS
        filtered_state  = tableData.filter(  data_items  => data_items.state === state_val);
        if (multi_filter == false ) {  criteria_table3(filtered_state); } else {console.log("will not display table multifilter on"); }// multi_filter_array(filtered_state); 
        });

    reset_multi.on("click", function()  // DISPLAY ALL DATA 
        {
          reset_multi_filters();
        });

    all_butt.on("click", function()  // DISPLAY ALL DATA 
        {
          full_table();
        });
    
    mult_f_off.on("click", function()  // TOGGLE MULTI-FILTER OFF
        {
        tbody.html("Click Filters and Buttons Left to  Display Data");
        multi_filter = false ;
        });

    mult_f_on.on("click", function()  // TOGGLE MULTI-FILTER ON
        {
        multi_filter = true ;
        tbody.html("Click the [ Process Multi-Filter Query Button]  to Display Data.  Click Multi-Filter-OFF to use individual filters");
        make_1st_fltr();
        console.log("we just clicked multi filter on and its values is ", multi_filter   );
        });

    process_multi.on("click", function()
        {
          multi_filt_func();
        });


    function multi_filt_func() // this is multi conditional  filtered table 
        {
          arr = filter_array ;
          console.log("the length of our array is", arr.length);
          console.log("this is the (filter array) called from multi_filt_func" ,filter_array);

          if ( arr[0] == "city" ) { filter1_val = tableData.filter(data_items => data_items.city    === city_val ); console.log("multi-func this called from filter_city line")     ; }
          if ( arr[0] == "state") { filter1_val = tableData.filter(data_items => data_items.state   === state_val); console.log("multi-func this called from filtered_state line")  ; }
          if ( arr[0] == "date" ) { filter1_val = tableData.filter(data_items => data_items.datetime=== date_val ); console.log("multi-func this called from filtered_date line")   ; }
          if ( arr[0] == "shape") { filter1_val = tableData.filter(data_items => data_items.shape   === shape_val); console.log("multi-func this called from filtered_shape line")  ; }
              full_filter = filter1_val;
              console.log("the full filter is from arr group ZERO " , full_filter);

          if ( arr.length >= 2)
              {
                if ( arr[1] == "city" ) { filter2_val = filter1_val.filter(data_items  => data_items.city     === city_val ); console.log("multi-func this called from filter_city line")     ; }
                if ( arr[1] == "state") { filter2_val = filter1_val.filter(data_items  => data_items.state    === state_val); console.log("multi-func this called from filtered_state line")  ; }
                if ( arr[1] == "date" ) { filter2_val = filter1_val.filter(data_items  => data_items.datetime === date_val ); console.log("multi-func this called from filtered_date line")   ; }
                if ( arr[1] == "shape") { filter2_val = filter1_val.filter(data_items  => data_items.shape    === shape_val); console.log("multi-func this called from filtered_shape line")  ; }
                full_filter = filter2_val; 
                console.log("the full filter is from arr group ONE " , full_filter);
              }

          if ( arr.length >= 3)
              {
                if ( arr[2] == "city" ) { filter3_val = filter2_val.filter(data_items  => data_items.city     === city_val ); console.log("multi-func this called from filter_city line")     ; }
                if ( arr[2] == "state") { filter3_val = filter2_val.filter(data_items  => data_items.state    === state_val); console.log("multi-func this called from filtered_state line")  ; }
                if ( arr[2] == "date" ) { filter3_val = filter2_val.filter(data_items  => data_items.datetime === date_val ); console.log("multi-func this called from filtered_date line")   ; }
                if ( arr[2] == "shape") { filter3_val = filter2_val.filter(data_items  => data_items.shape    === shape_val); console.log("multi-func this called from filtered_shape line")  ; }
                full_filter = filter3_val; 
                console.log("the full filter is from arr group TWO " , full_filter);
              }

          criteria_table3(full_filter);
        } 



// INTEGRATE MULTI FILTER 

// 1. EITHER CREATE ALL NEW DROP DOWN LISTS FOR MULTI FILTER 
// 2. OR - CREATE BOOLEAN GATE KEEPER BUTTON/VARIABLE = "MULTI_SORT == TRUE" TO SPECIFY IF AND WHEN THE TABLE WITH BE 
//     POPLUATED - INSERT MACH CODE BELOW:


// 3. WE NEED A PRIMARY FILTER , SECONDARY, AND THIRD 
//     - USER WOULD SELECT VALUES FROM 2-3 LISTS 
//      - THEN USER SPECIFIYS WHICH FILTER IS PRIMARY, SEC, THIRD...

// 4. BUTTONS :  1. CLEAR - RESET FILTER, 2.  "MULTI_SORT == TRUE", 3. HEIARCHY FILTER SPECIFIER , 4. Submit 

// 5. THE MULTI FILTER FUNCTION , WILL ALWAYS LOOK AT A ARRAY FOR VALUES, 
//       WE WILL SET THOSE VALUES IN INDEX 1-3 BASED ON USER CONFIG 
//          WE WILL USE SPLICE TO DO SO ref below 

//    - USING THE MULTIFILTER FUNC ALREADY ESTABLISHED 
//       - INSERT CONDITIONALS BASED ON HOW MANY FILTER USER SPECIFIY TO 
//           DETERMINE HOW MANY STEPS INVOLVED IN FILTER 

//         // splice example insert or replace values at index 5 with everything in parens skipping the second val of '0'
//           var months = ['Jan', 'March', 'April', 'June'];
//           months.splice(5, 0,7, 'jan', 'stud')
//           Array ["Jan", "March", "April", "June", 7, "jan", "stud"]

// 6 . display results on US map 





