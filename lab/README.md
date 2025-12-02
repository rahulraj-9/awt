
<h1 align="center">Advance Web Tech Lab Report</h1>

<h3>Name:Rahul Raj
Sap Id:590018536
 Date: December 2, 2025 </h3>

<h2>
Experiment Index</h2>

1.  **Experiment 1:** Basic JQuery implementation
2.  **Experiment 2:** JQUERY CSS AND events methods
3.  **Experiment 3:** Angular js (table and sorting)
4.  **Experiment 4:** Angular JS Forms and Events
5.  **Experiment 5 & 6:** Node JS Basics
6.  **Experiment 7:** Cookie and Sessions in nodejs
7.  **Experiment 8 & 9:**  Todo App- Mongodb,Nodejs Express
8.  **Experiment 10:** D3JS Graphs and Charts


## Experiment 1

1. **Aim**  
   To create a webpage with interactive features using HTML, CSS, and jQuery, including disabling right-click, scrolling to the top, changing paragraph color on mouseover, and showing/hiding a message.

2. **Brief Description**  
   This experiment develops a webpage featuring a button to disable right-click, an image to scroll to the top, a paragraph that changes color on mouseover, and a button to toggle the visibility of a message, all styled with CSS and controlled using jQuery.

3. **Explanation**  
   I created an HTML structure with a button, an image, a paragraph, and another button for message control. CSS was used to center the content, style the button and image, and position elements. jQuery handles the right-click disable on button click, scrolls to the top when the image is clicked, changes the paragraph color on hover, and toggles the message visibility with button text updates.

4. **All the code**  

   **index.html**  
   ```html
   <!-- EXPERIMENT 1  -->
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <link rel="stylesheet" href="index.css">
   </head>
   <body>
      <button>DISABLE RIGHT CLICK
      </button>
      <img id="scrolltopimg" src="https://cdn-icons-png.flaticon.com/512/892/892692.png" alt="Scroll to Top">
      <p id="one">THIS PARAGRAPH WILL CHANGE IT'S COLOR ON MOUSEOVER</p>
      <h2 id="out">Button clicked</h2>
      <button id="sh">SHOW MESSAGE</button>
      <script src="index.js">
      </script>
   </body>
   </html>
   ```

   **index.css**  
   ```css
   body {
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100vh;
       background-color: black;
       height: 1000px;
       color: rgb(183, 0, 255)
   }
   button {
       height: 150px;
       width: 200px;
       color: red;
       font-weight: 900;
   }

   /* scroll image to get to top */
   img {
       position: fixed;
       bottom: 20px;
       right: 10px;
       height: 100px
   }

   /* Change color on mouseover */
   #one {
       position: absolute;
       top: 30px;
   }

   /* show/hide message on button click */
   #out {
       display: none;
       top: 80px;
       position: absolute;
       color: brown;
   }
   ```

   **index.js**  
   ```javascript
   //DISABLE RIGHT CLICK 
   $(function(){
       $("button").on('click',function(){
           $("body").on('contextmenu',function(z)
       {
           z.preventDefault()
       })

       })
   });
   //CLICK IMAGE TO SCROLL TO TOP
   $(function(){
       $("#scrolltopimg").on('click',function(){
       $("body ,html").animate({scrollTop:0},500);
    });
   });

   //CHANGE PARAGRAPH COLOR ON MOUSEOVER
   $("p").hover(function(){
       $("#one").css({"color":"red","cursor":"pointer"});
   },
   function(){
   $(this).css("color","")
   })
   //show/hide message on button click
   $("#sh").on('click',function()
   {
       if($("#out").is(':hidden'))
       {   $("#out").show();
           $("#sh").text("HIDE MESSAGE")
       }
       else{
           $("#out").hide();
           $("#sh").text("SHOW MESSAGE")
       }
   })
   ```

5. **Paste output**  
   <code>![Experiment 1 Code](./images/experiment_1.png)</code>

6. **What I learned**  
   I learned how to implement jQuery for event handling, DOM manipulation, and animations, along with CSS for layout and styling, to create an interactive webpage.

7. **Challenges Faced**  
   Ensuring the right-click disable triggered only after the button click and aligning the hover effect properly with CSS positioning were initial challenges.

## Experiment 2

1. **Aim**  
   To demonstrate the use of jQuery for manipulating CSS classes, retrieving element positions, and animating multiple CSS properties.

2. **Brief Description**  
   This experiment creates a webpage with three interactive sections: adding a CSS class to a paragraph, displaying an element's position, and animating a div with multiple CSS properties, all using jQuery and styled with CSS.

3. **Explanation**  
    I structured the HTML with three sections, each with a heading, an element to manipulate, and a button to trigger the action. CSS was used to style the elements and define the highlight and animation-complete classes. jQuery adds a class to a paragraph on button click, retrieves and displays an element's position on button click, and animates a div's properties on button click with a color change afterward.

4. **All the code**  

   **index.html**  
   ```html
   <!doctype html>
   <html>
   <head>
     <meta charset="utf-8">
     <title>Experiment 2 - jQuery CSS and Events</title>
     <link rel="stylesheet" href="style.css">
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   </head>
   <body>
     <div class="container">
       <h1>jQuery CSS & Events</h1>

       <section id="add-class">
         <h2>Add a class to an element</h2>
         <p id="para">This paragraph will change class when you click the button.</p>
         <button id="btn-add">Add .highlight</button>
       </section>

       <section id="position">
         <h2>Get element position</h2>
         <div id="pos-box">Position me</div>
         <button id="btn-pos">Show position</button>
         <p id="pos-output"></p>
       </section>

       <section id="animate">
         <h2>Animate multiple CSS properties</h2>
         <div id="anim-box">Animate me</div>
         <button id="btn-anim">Animate</button>
       </section>
     </div>

     <script src="app.js">
     </script>
   </body>
   </html>
   ```

   **style.css**  
   ```css
   body { font-family: Arial, sans-serif; padding: 20px; }
   .container { max-width: 800px; margin: auto; }
   #pos-box, #anim-box { border: 1px solid #333; padding: 10px; display:inline-block; margin:10px 0; }
   .highlight { background: #ffef9a; border-left: 4px solid #ffb347; padding: 6px; }
   .anim-done { color: #fff; background: #4caf50; }
   ```

   **app.js**  
   ```javascript
   $(document).ready(function() {
     // 1. Add class to an element
     $("#btn-add").click(function() {
       $("#para").addClass("highlight");
     });

     // 2. Access position of an element
     $("#btn-pos").click(function() {
       // position() gives position relative to offset parent
       const pos = $("#pos-box").position();
       // offset() gives document position
       const off = $("#pos-box").offset();
       $("#pos-output").text(`position: top=${pos.top}, left=${pos.left}  |  offset: top=${off.top.toFixed(1)}, left=${off.left.toFixed(1)}`);
     });

     // 3. Animate multiple CSS properties
     $("#btn-anim").click(function() {
       $("#anim-box").animate({
         paddingLeft: "40px",
         paddingRight: "40px",
         height: "80px"
       }, 700, function() {
         // after animation, change color via CSS class (color cannot be animated via jQuery animate without plugin)
         $(this).addClass("anim-done");
       });
     });
   });
   ```

5. **Paste output**  
   <p><strong>Output:</strong></p>
  <code >![Experiment 2 Code](./images/experiment_2.png)<code>
6. **What I learned**  
   I learned how to use jQuery to add CSS classes, retrieve element positions, and animate multiple properties, along with basic CSS styling for visual effects.

7. **Challenges Faced**  
   Understanding the difference between `position()` and `offset()` methods and ensuring the animation completed with the correct color change were initial hurdles.

## Experiment 3

1. **Aim**  
   To display a table using AngularJS with `ng-repeat`, sort table contents using the `orderBy` filter, and style rows differently for even and odd rows.

2. **Brief Description**  
   This experiment creates a webpage with two tables displaying student data, one with dynamic headers and rows using `ng-repeat`, and another sortable by name, age, or department with a reverse option, styled with alternating row colors using AngularJS.

3. **Explanation**  
    I set up an HTML structure with two tables and a dropdown for sorting. AngularJS was used to populate the tables with student data using `ng-repeat`, generate headers from the first row, and implement the `orderBy` filter with a checkbox for reverse sorting. CSS was applied to center the content and style the tables with different backgrounds for even and odd rows.

4. **All the code**  

   **index.html**  
   ```html
   <!DOCTYPE html>
   <html lang="en" ng-app="myapp">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <link rel="stylesheet" href="style.css">
       <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
   </head>
   <body ng-controller="mctrl">
       <p> 1. Display a table using AngularJS and `ng-repeat`.<br>
           2. Use `orderBy` filter to sort table contents.<br>
           3. Style rows differently for even and odd rows.</p>
           <br>
       <table ID="f" >
           <tr>
                <th ng-repeat="(key,value) in students[0]">{{key}}</th> 
                <!-- Prints the keys of data only once because it is bound to first row  -->
           </tr>
           <tr ng-repeat="student in students">
               <td ng-repeat="(key,value) in student">{{value}}</td>
           </tr>
       </table>
       <br>
       <section>
           Display contents with order by filter
           <label for="">Order BY:</label>
          <select name="" ng-model="sortkey" id="">
           <option value="name">Name</option>
           <option value="age">Age</option>
           <option value="dept">Dept</option>
          </select>
          <label for="">Reverse:
           <input type="checkbox" ng-model="reverse">
          </label>
       </section>
       <TABLE id="s">
           <tr><th>NAME</th>
           <TH>AGE</TH>
       <TH>DEPARTMENT</TH></tr>
       <tr ng-repeat="student in students|orderBy:sortkey:reverse">
           <!-- When the user choose sort by Name orderBy:sortkey changes to orderBy:Name and similarly so on
            and when  the value in checkbox is true then sorting is reversed-->
           <td>{{student.name}}</td>
           <td>{{student.age}}</td>
           <td>{{student.dept}}</td>
       </tr>
       </TABLE>
       <script src="app.js"></script>
   </body>
   </html>
   ```

   **style.css**  
   ```css
   /* Center content horizontally and stack vertically */
   body {
       display: flex;
       flex-direction: column;  /* stack tables one below the other */
       align-items: center;     /* center horizontally */
       margin: 0;
       padding: 20px;
       font-family: Arial, sans-serif;
   }

   /* General table styling */
   table {
       border-collapse: collapse;
       width: 300px;
       text-align: center;
       margin: 20px 0;          /* spacing between tables */
       box-shadow: 0 2px 6px rgba(0,0,0,0.2);
   }

   /* Borders */
   table, th, td {
       border: 2px solid black;
       padding: 8px;
   }

   /* Header row */
   th {
       background: #eee;
       font-weight: bold;
   }

   /* Odd-even row styling */
   tr.even { background: #f8f8f8; }
   tr.odd  { background: #191717; color: white; }

   /* Sections and paragraph layout */
   section, p {
       display: block;
       margin: 10px 0;
   }
   ```

   **app.js**  
   ```javascript
   var app =angular.module('myapp',[]);
   app.controller('mctrl',function($scope){
     $scope.students = [
         { name: 'Asha', age: 22, dept: 'CSE' },
         { name: 'Bikram', age: 24, dept: 'ECE' },
         { name: 'Charu', age: 21, dept: 'ME' },
         { name: 'Deep', age: 23, dept: 'CSE' },
         { name: 'Esha', age: 20, dept: 'EE' }
       ];
   })
   ```
   <p><strong>Output:</strong></p>
![Experiment 3 Code](./images/experiment_3.png)

1. **What I learned**  
   I learned how to use AngularJS for dynamic table rendering with `ng-repeat`, implement sorting with the `orderBy` filter, and apply CSS to differentiate even and odd rows.

2. **Challenges Faced**  
   Ensuring the table headers were generated correctly from the first row and debugging the reverse sorting logic with the checkbox were initial difficulties.

## Experiment 4

1. **Aim**  
   To create a bill payment record system and a user registration form with input validation using AngularJS.

2. **Brief Description**  
   This experiment includes a bill payment record system with add, edit, and delete functionalities, and a separate registration form with basic input validation, both implemented using AngularJS with minimal styling.

3. **Explanation**  
   I created two HTML files: one for a bill payment system with a form to add or update bills and a table to display them, and another for a registration form with name and age fields. AngularJS handles form submission, data storage in memory, editing, and deletion for bills, while the registration form includes validation for required fields and minimum length, with error messages displayed on touch or submission.

4. **All the code**  

   **bill_payment.html**  
   ```html
   <!DOCTYPE html>
   <html ng-app="billApp">
   <head>
     <title>Bill Payment Record</title>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
   </head>
   <body ng-controller="billController">

     <h2>Bill Payment Record</h2>

     <!-- Form for Adding/Updating Bills -->
     <form ng-submit="saveBill()">
       <label>Bill Name:</label>
       <input type="text" ng-model="newBill.name" placeholder="e.g. Electricity" required>
       <br><br>

       <label>Amount:</label>
       <input type="number" ng-model="newBill.amount" placeholder="e.g. 1200" required>
       <br><br>

       <label>Date:</label>
       <input type="date" ng-model="newBill.date" required>
       <br><br>

       <button type="submit">{{ editIndex === -1 ? "Add Bill" : "Update Bill" }}</button>
       <button type="button" ng-click="clearForm()">Clear</button>
     </form>

     <hr>

     <!-- Display Bills -->
     <h3>All Bills</h3>
     <table border="1" cellpadding="8">
       <tr>
         <th>#</th>
         <th>Bill Name</th>
         <th>Amount</th>
         <th>Date</th>
         <th>Actions</th>
       </tr>
       <tr ng-repeat="bill in bills track by $index">
         <td>{{$index + 1}}</td>
         <td>{{bill.name}}</td>
         <td>{{bill.amount}}</td>
         <td>{{bill.date | date : 'dd-MM-yyyy'}}</td>
         <td>
           <button ng-click="editBill($index)">Edit</button>
           <button ng-click="deleteBill($index)">Delete</button>
         </td>
       </tr>
     </table>

     <script>
       var app = angular.module("billApp", []);
       app.controller("billController", function($scope) {
         $scope.bills = []; // in-memory storage
         $scope.newBill = {};
         $scope.editIndex = -1;

         // Save (Add or Update)
         $scope.saveBill = function() {
           if ($scope.editIndex === -1) {
             // Add new bill
             $scope.bills.push({
               name: $scope.newBill.name,
               amount: $scope.newBill.amount,
               date: $scope.newBill.date
             });
           } else {
             // Update existing bill
             $scope.bills[$scope.editIndex] = angular.copy($scope.newBill);
             $scope.editIndex = -1;
           }
           $scope.newBill = {}; // clear form
         };

         // Edit a bill
         $scope.editBill = function(index) {
           $scope.newBill = angular.copy($scope.bills[index]);
           $scope.editIndex = index;
         };

         // Delete a bill
         $scope.deleteBill = function(index) {
           $scope.bills.splice(index, 1);
         };

         // Clear form
         $scope.clearForm = function() {
           $scope.newBill = {};
           $scope.editIndex = -1;
         };
       });
     </script>

   </body>
   </html>
   ```

   **registration.html**  
   ```html
   <!-- Create a user registration form and perform input validation using AngularJS. -->
   <!DOCTYPE html >
   <html lang="en" ng-app="app">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <link rel="stylesheet" href="style.css">
       <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
   </head>
   <body ng-controller="ctr">
     <h1>REGISTRATION PAGE</h1>
   <form name="reg" ng-submit="submitform()">
     <label >Enter your name:
       <input type="text" name="name" ng-model="name" required ng-minlength="3"></label>
     <div class="error"  ng-show="(reg.name.$touched || submitted) && reg.name.$error.required" >
       Name must be entered correctly</div>

       <br>
       <label for="age"> AGE:
         <input type="number" ng-model="age" name="age">
         <div id="ageerror" ng-show="(reg.age.$touched ||submitted) && re.age.$error.required">
           Age Must be a number
         </div>
       </label>
     <button type="submit" name="btn" >Submit</button>
   </form>
      <script>
   var app =angular.module('app',[]);
   var ctrl =app.controller('ctr',function($scope){
     $scope.submitted=false;
     $scope.submitform=function(){
       $scope.submitted=true

     }

   })

      </script>
   </body>
   </html>
   ```

   **style.css**  
   ```css
   body {
       min-height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
       background: #f0f0f0;
       flex-direction: column;
   }
   h1{display: block;text-align: center;}
   #hcontainer{text-align: center;top:20px}
   #reg {
       width: 400px;
       height: 700px;
       background-color: rgba(0,0,0,0.5); 
       border-radius: 10px;
       box-shadow: 0 4px 16px rgba(0,0,0,0.2);
       padding: 32px 24px;
       display: flex;
       flex-direction: column;
       justify-content: center;
   }
   ```

        <p><strong>Output:</strong></p>
![Experiment 4 Code](./images/experiment_4.1.png)

     <p><strong>Output:</strong></p>
![Experiment 4 Code](./images/experiment_4.2.png)


 **What I learned**  
   I learned how to use AngularJS for form handling, data management, and input validation, including dynamic table updates and error messaging.

1. **Challenges Faced**  
   Fixing the typo in the age validation condition (`re.age` to `reg.age`) and ensuring form clearing worked correctly after submission were initial issues.

## Experiment 5 & 6

1. **Aim**  
   To set up a Node.js server with endpoints for a Hello World message, string replacement, calculation, and array iteration.

2. **Brief Description**  
   This experiment creates a single Node.js server with multiple GET endpoints: a basic Hello World, a string replacement function, a calculator for basic operations, and an array iteration example using different loop types, all handled with Express.

3. **Explanation**  
    I set up an Express server and defined four endpoints. The root endpoint returns a simple message, the `/replace` endpoint replaces multiple consecutive 'a's with 'b' in a query string, the `/calculate` endpoint performs arithmetic operations based on query parameters, and the `/iterate` endpoint demonstrates array iteration using for loop, forEach, and for...of, logging results in JSON.

4. **All the code**  

   **index.js**  
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;
   // Hello World endpoint
   app.get('/', (req, res) => {
     res.send('Hello, World!');
   });
   // String replacement endpoint
   app.get('/replace', (req, res) => {
     const { text } = req.query;
     if (!text) {
       return res.status(400).json({ error: 'Text parameter is required' });
     }
    
     const regex = /a{2,}/g;
     const result = text.replace(regex, 'b');
     res.json({ original: text, replaced: result });
   });
   // Calculator endpoint
   app.get('/calculate', (req, res) => {
     const { operation, num1, num2 } = req.query;
     const n1 = parseFloat(num1);
     const n2 = parseFloat(num2);
    
     if (isNaN(n1) || isNaN(n2)) {
       return res.status(400).json({ error: 'Invalid numbers provided' });
     }
    
     let result;
     switch(operation) {
       case 'add':
         result = n1 + n2;
         break;
       case 'subtract':
         result = n1 - n2;
         break;
       case 'multiply':
         result = n1 * n2;
         break;
       case 'divide':
         result = n2 !== 0 ? n1 / n2 : 'Error: Division by zero';
         break;
       default:
         return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide' });
     }
    
     res.json({ operation, num1: n1, num2: n2, result });
   });
   // Array iteration endpoint
   app.get('/iterate', (req, res) => {
     const array = [10, 20, 30, 40, 50];
     const iterations = [];
    
     // Using for loop
     iterations.push("Using for loop:");
     for (let i = 0; i < array.length; i++) {
       iterations.push(`Index ${i}: ${array[i]}`);
     }
    
     // Using forEach
     iterations.push("Using forEach:");
     array.forEach((item, index) => {
       iterations.push(`Index ${index}: ${item}`);
     });
    
     // Using for...of
     iterations.push("Using for...of:");
     for (const item of array) {
       iterations.push(`Item: ${item}`);
     }
    
     res.json({ array, iterations });
   });
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
     console.log('Available endpoints:');
     console.log(' GET / - Hello World');
     console.log(' GET /replace?text=your_text - Replace multiple a\'s with b');
     console.log(' GET /calculate?operation=add&num1=5&num2=3 - Calculator');
     console.log(' GET /iterate - Array iteration examples');
   });
   ```

   <p><strong>Output:</strong></p>
![Experiment 5 & 6 Code](./images/exp5_hello.png)

< p><strong>Output:</strong></p>
  ![Experiment 5 & 6 Code](./images/exp5_cal.png)

    <p><strong>Output:</strong></p>
![Experiment 5 & 6 Code](./images/exp5_iterate.png)

<p><strong>Output:</strong></p>
![Experiment 5 & 6 Code](./images/exp5_replace.png)
   1. **What I learned**  
   I learned how to create a Node.js server with Express, handle multiple endpoints, perform string manipulation with regex, implement a calculator with switch cases, and demonstrate array iteration methods.

   2. **Challenges Faced**  
   Handling query parameter validation and ensuring the server logged endpoint details correctly were initial challenges.

## Experiment 7

1. **Aim**  
   To demonstrate cookie and session management in a Node.js application using Express.

2. **Brief Description**  
   This experiment sets up a Node.js server with endpoints to set, get, and delete cookies, and another to manage session views, using Express with cookie-parser and express-session.

3. **Explanation**  
    I created two Express applications: one for cookie management with endpoints to set, retrieve, and clear a cookie, and another for session management to track page visits with a destroy option. Both use middleware to handle cookies and sessions, with the session tracking incrementing views on each visit.

4. **All the code**  

   **package.json**  
   ```json
   {
     "name": "experiment_7",
     "version": "1.0.0",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "description": "",
     "dependencies": {
       "cookie-parser": "^1.4.7",
       "express": "^5.1.0",
       "express-session": "^1.18.2"
     }
   }
   ```

   **cookie_index.js**  
   ```javascript
   const express = require('express');
   const cookieParser = require('cookie-parser');

   const app = express();
   app.use(cookieParser());
   app.get('/', (req, res) => {
       res.send('hello')
   });
   app.get('/set-cookie', (req, res) => {
       res.cookie('username', 'John', { maxAge: 900000 });
       res.send('Cookie has been set');
   });

   app.get('/get-cookie', (req, res) => {
       const user = req.cookies['username'];
       res.send(`Cookie Retrieved: ${user}`);
   });

   app.get('/delete-cookie', (req, res) => {
       res.clearCookie('username');
       res.send('Cookie deleted');
   });

   app.listen(3000, () => {
       console.log('Server running on http://localhost:3000');
   });
   ```

   **session_index.js**  
   ```javascript
   const express = require('express');
   const session = require('express-session');

   const app = express();

   app.use(session({
       secret: 'mysecretkey',
       resave: false,
       saveUninitialized: true
   }));

   app.get('/', (req, res) => {
       if (req.session.views) {
           req.session.views++;
           res.send(`Welcome back! You visited ${req.session.views} times.`);
       } else {
           req.session.views = 1;
           res.send('Welcome to the session demo. Refresh to count visits.');
       }
   });

   app.get('/destroy', (req, res) => {
       req.session.destroy(err => {
           if (err) {
               return res.send('Error destroying session');
           }
           res.send('Session destroyed');
       });
   });

   app.listen(3000, () => {
       console.log('Server started on http://localhost:3000');
   });
   ```

        <p><strong>Output:</strong></p>
![Experiment 7 Code](./images/exp7_setccokie.png)

    <p><strong>Output:</strong></p>
![Experiment 7 Code](./images/exp7_getcookie.png)

    <p><strong>Output:</strong></p>
![Experiment 7 Code](./images/exp7_deletecookie.png)

    <p><strong>Output:</strong></p>
![Experiment 7 Code](./images/exp7_session1.png)

    <p><strong>Output:</strong></p>
![Experiment 7 Code](./images/exp7_session2.png)

5. **What I learned**  
   I learned how to manage cookies and sessions in Node.js using Express middleware, including setting, retrieving, and clearing cookies, and tracking session visits.

6. **Challenges Faced**  
   Resolving port conflicts between the cookie and session servers and ensuring session persistence across requests were initial difficulties.

 # Web Development Lab Record: Experiments 8, 9 & 10
 
 ---
 
 ## Experiment 8 & 9: Full-Stack Todo List Application
 
 ### 1. Aim
 To develop a full-stack Todo List application using **Node.js**, **Express**, and **MongoDB (Mongoose)**, featuring user authentication (Register/Login) and **CRUD** operations for tasks.
 
 ### 2. Brief Description
 This project integrates the frontend and backend. It uses MongoDB to store user credentials and tasks. The backend (Node/Express) exposes APIs for signing up, logging in, and managing todos. The frontend uses AJAX/Fetch API to interact with the backend, allowing users to maintain their own private todo lists.
 
 ### 3. Explanation
 I organized the project into **MVC architecture**. 
 * **Models:** The `models` folder contains Mongoose schemas for Users and Todos.
 * **Controller/Routes:** `server.js` handles the database connection and API routes.
 * **Views/Client:** The `public` folder contains the HTML views and client-side logic (`app.js`).
 
 When a user logs in, a session or token is used to identify them and fetch only their specific tasks from the MongoDB database.
 
 ### 4. Code Implementation
 
 **File: `models/todo.js`**
 ```javascript
 const mongoose = require('mongoose');
 
 const TodoSchema = new mongoose.Schema({
     task: { type: String, required: true },
     completed: { type: Boolean, default: false },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Link to user
 });
 
 module.exports = mongoose.model('Todo', TodoSchema);
 ```
 ***File: models/user.js***
 
 ``` javaScript
 
 const mongoose = require('mongoose');
 
 const UserSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true }
 });
 
 module.exports = mongoose.model('User', UserSchema);
 ```
 ***File: server.js***
 
 ``` javaScript
 
 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const path = require('path');
 const User = require('./models/user');
 const Todo = require('./models/todo');
 
 const app = express();
 
 app.use(bodyParser.json());
 app.use(express.static('public'));
 
 // Connect to MongoDB
 mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
     .then(() => console.log("MongoDB Connected"))
     .catch(err => console.log(err));
 
 // --- ROUTES ---
 
 // Register
 app.post('/api/register', async (req, res) => {
     const { username, password } = req.body;
     try {
         const user = new User({ username, password });
         await user.save();
         res.json({ success: true, message: "Registered successfully" });
     } catch (error) {
         res.status(400).json({ success: false, error: "Username already exists" });
     }
 });
 
 // Login (Simplified for demo)
 app.post('/api/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ username, password });
     if (user) {
         res.json({ success: true, userId: user._id });
     } else {
         res.status(401).json({ success: false, error: "Invalid credentials" });
     }
 });
 
 // Get Todos
 app.get('/api/todos/:userId', async (req, res) => {
     const todos = await Todo.find({ userId: req.params.userId });
     res.json(todos);
 });
 
 // Add Todo
 app.post('/api/todos', async (req, res) => {
     const { task, userId } = req.body;
     const todo = new Todo({ task, userId });
     await todo.save();
     res.json(todo);
 });
 
 // Delete Todo
 app.delete('/api/todos/:id', async (req, res) => {
     await Todo.findByIdAndDelete(req.params.id);
     res.json({ success: true });
 });
 
 app.listen(3000, () => console.log('Server running on port 3000'));
 ```
 ***File: public/app.js (Client-side Logic)***
 
 ```javaScript
 
 let currentUserId = localStorage.getItem('userId');
 
 // If on todolist page, load todos
 if (window.location.pathname.includes('todolist.html')) {
     if (!currentUserId) window.location.href = 'login.html';
     loadTodos();
 }
 
 // Login Logic
 $('#loginForm').on('submit', function(e) {
     e.preventDefault();
     const username = $('#username').val();
     const password = $('#password').val();
 
     $.ajax({
         url: '/api/login',
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({ username, password }),
         success: function(res) {
             localStorage.setItem('userId', res.userId);
             window.location.href = 'todolist.html';
         },
         error: function() { alert('Invalid Login'); }
     });
 });
 
 // Load Todos Function
 function loadTodos() {
     $.get(`/api/todos/${currentUserId}`, function(todos) {
         $('#list').empty();
         todos.forEach(todo => {
             $('#list').append(`
                 <li>${todo.task} <button onclick="deleteTodo('${todo._id}')">X</button></li>
             `);
         });
     });
 }
 
 // Add Todo Logic
 $('#addBtn').click(function() {
     const task = $('#taskInput').val();
     $.ajax({
         url: '/api/todos',
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({ task, userId: currentUserId }),
         success: function() {
             $('#taskInput').val('');
             loadTodos();
         }
     });
 });
 
 // Delete Todo Function
 window.deleteTodo = function(id) {
     $.ajax({
         url: `/api/todos/${id}`,
         method: 'DELETE',
         success: loadTodos
     });
 };
 ```
 5. ***Output Screenshots***
     <p><strong>Output:</strong></p>
 ![Experiment 8_9 Code](./images/exp9.1.png)
 
     <p><strong>Output:</strong></p>
 ![Experiment 8_9 Code](./images/exp9.2.png)
 
     <p><strong>Output:</strong></p>
 ![Experiment 8_9](./images/exp9.3.png)
 
     <p><strong>Output:</strong></p>
 ![Experiment 8_9](./images/exp9.3.png)
 
 6. ***Learning Outcomes & Challenges***
 What I Learned: I learned how to connect a Node.js application to a MongoDB database using Mongoose. I understood how to define schemas, create relationships between collections (Users and Todos), and handle asynchronous database operations using async/await.
 
 ***Challenges Faced:***
  Connecting the frontend AJAX calls to the correct backend API routes and handling CORS issues (though serving static files resolved this) were initial challenges. Managing the user session (storing the User ID) to ensure users only see their own todos was also a key learning point.
 
 
 #***Experiment 10: Data Visualization with D3.js***
 1. Aim
 To visualize data using the D3.js library by parsing a CSV file and creating a bar chart.
 
 2. Brief Description
 This experiment uses D3.js (Data-Driven Documents) to bind data from an external data.csv file to the DOM. I set up a simple Node.js server to serve the static files and used D3 methods to create SVG rectangles representing the data values.
 
 3. Explanation
 The setup includes a data.csv file containing categories and values. The script.js uses d3.csv() to load the data asynchronously. I defined a linear scale for the Y-axis (height of bars) and a band scale for the X-axis (categories). SVG elements were appended to the HTML body to render the visualization.
 
 4. Code Implementation
 
 ***File: public/data.csv***
 
 Code snippet
 ```csv
 Language,Users
 JavaScript,100
 Python,85
 Java,70
 C++,60
 Go,40
 ```
 ***File: public/index.html***
 
 ```html
 
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>D3.js Bar Chart</title>
     <script src="[https://d3js.org/d3.v7.min.js](https://d3js.org/d3.v7.min.js)"></script>
     <style>
         .bar { fill: steelblue; }
         .bar:hover { fill: orange; }
         svg { background-color: #f4f4f4; margin: 20px; }
         text { font-family: sans-serif; font-size: 12px; }
     </style>
 </head>
 <body>
     <h2 align="center">Programming Language Popularity (D3.js)</h2>
     <div id="chart"></div>
     <script src="script.js"></script>
 </body>
 </html>
 ```
 ***File: public/script.js***
 
 ```javaScript
 
 // Set dimensions
 const width = 500, height = 300, margin = 40;
 
 // Create SVG container
 const svg = d3.select("#chart")
     .append("svg")
     .attr("width", width)
     .attr("height", height);
 
 // Load data
 d3.csv("data.csv").then(data => {
 
     // Convert strings to numbers
     data.forEach(d => d.Users = +d.Users);
 
     // X Scale
     const x = d3.scaleBand()
         .domain(data.map(d => d.Language))
         .range([margin, width - margin])
         .padding(0.1);
 
     // Y Scale
     const y = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.Users)])
         .range([height - margin, margin]);
 
     // Draw Bars
     svg.selectAll(".bar")
         .data(data)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", d => x(d.Language))
         .attr("y", d => y(d.Users))
         .attr("width", x.bandwidth())
         .attr("height", d => height - margin - y(d.Users));
 
     // Add X Axis
     svg.append("g")
         .attr("transform", `translate(0,${height - margin})`)
         .call(d3.axisBottom(x));
 
     // Add Y Axis
     svg.append("g")
         .attr("transform", `translate(${margin},0)`)
         .call(d3.axisLeft(y));
 });
 ```
 ***File: server.js (Static Server)***
 
 ```javaScript
 
 const express = require('express');
 const app = express();
 const path = require('path');
 
 app.use(express.static('public'));
 
 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });
 
 app.listen(4000, () => {
     console.log('D3 Server running at http://localhost:4000');
 });
 ```
 5. Output Screenshot
 ![Experiment 10 Code](./images/exp10.png)
 
 
 6. Learning Outcomes & Challenges
 What I Learned: I learned how to use the D3.js library to manipulate the DOM based on data. I understood the concept of "Enter, Update, Exit" selections, how to create scaling functions (scaleLinear, scaleBand) to map data values to pixel coordinates, and how to render SVG shapes dynamically.
 
 Challenges Faced: The main challenge was understanding that d3.csv is asynchronous (Promise-based) and that the CSV data needs to be parsed (converting numeric strings to actual numbers using the + operator) before using it in calculations. Also, handling the coordinate system (where y=0 is at the top) required careful calculation for bar heights.
 