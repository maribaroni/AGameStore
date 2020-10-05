//---Global variable

var postcodeRegex = /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/;
var numberRegex = /^[0-9]+$/ // /^[1-9][0-9]*$/
var phoneRegex = /^[0-9]{3}\-?[0-9]{3}\-?[0-9]{4}$/
var message = '';

function formSubmit(){
   
    var errors='';
    
    //---Fetch values

    var name         = document.getElementById('name').value;
    var email        = document.getElementById('email').value;
    var phone        = document.getElementById('phone').value;
    var address      = document.getElementById('address').value;
    var city         = document.getElementById('city').value;
    var postcode     = document.getElementById('postcode').value;
    var province     = document.getElementById('province').value;
    var product1     = document.getElementById('product1').value;
    var product2     = document.getElementById('product2').value;
    var product3     = document.getElementById('product3').value;
    var deliveryTime = document.getElementById('deliveryTime').value;

    //---Sanitize

    name     = name.trim(); 
    email    = email.trim();
    phone    = phone.trim();
    address  = address.trim();
    postcode = postcode.trim(); 
    product1 = product1.trim();
    product2 = product2.trim();
    product3 = product3.trim();

    //---Validate
    
    //Name - Required
    if (name == ''){
        errors += `*Name is required <br>`;
    }
    //Email - Required
    if (email == ''){
        errors += `*Email is required <br>`;
    }
    //Phone - Required and regular expression
    if (phone == ''){
        errors += `*Phone is required <br>`;
    } else if (!phoneRegex.test(phone)){
       errors += `#Phone is not in correct format <br>`;
    }
    //Address - Required
    if (address == ''){
        errors += `*Address is required <br>`;
    }
    //City - Required
    if (city == ''){
        errors += `*City is required <br>`;
    }
    //Postcode - Required and regular expression
    if (postcode == ''){
        errors += `*Post code is required <br>`;
    } else if (!postcodeRegex.test(postcode)){
       errors += `#Postcode not in correct format <br>`;
    }
    //Province  - Required
    if (province == ''){
        errors += `*Province is required <br>`;
    }
    //Products - Regular expression and at least one product
    if (product1 != '' && !numberRegex.test(product1)){
        errors += `#Quantity of GTA V is not in correct format <br>`;
    }
    if (product2 != '' && !numberRegex.test(product2)){
        errors += `#Quantity of Uncharted 4 is not in correct format <br>`;
    }  
    if (product3 != '' && !numberRegex.test(product3)){
        errors += `#Quantity of Lego Deadpool is not in correct format <br>`;
    }
    if (product1 == "0" && product2 == "0" && product3 == "0"){
        errors += `#Choose at least one game.`;
    }
    if (product1 == "0" && product2 == '' && product3 == ''){
        errors += `#Choose at least one game.`;
    }
    if (product1 == '' && product2 == "0" && product3 == ''){
        errors += `#Choose at least one game.`;
    }
    if (product1 == '' && product2 == '' && product3 == "0"){
        errors += `#Choose at least one game.`;
    }
    if (product1 == '' && product2 == '' && product3 == ''){
        errors += `#Choose at least one game <br>`;
    }
    if (product1 == '' && product2 == "0" && product3 == "0"){
            errors += `#Choose at least one game.`;
    }
    if (product1 == "0" && product2 == '' && product3 == "0"){
                errors += `#Choose at least one game.`;
    }
    if (product1 == "0" && product2 == "0" && product3 == ''){
                    errors += `#Choose at least one game.`;
    }

    //---Check if any errors exist and show to the user

    if(errors){
        //Shows errors
        document.getElementById('errors').style.display = 'block';
        document.getElementById('errors').innerHTML = errors;
    }
    
    else{  

        document.getElementById('errors').innerHTML = '';

        //Preparing the calculations to invoice
        if (product1 != ''){
            product1 = parseInt(product1);
        }else {
            product1 = 0;
        }
        
        if (product2 != ''){
            product2 = parseInt(product2);
        }else {
            product2 = 0;
        }

        if (product3 != ''){
            product3 = parseInt(product3);
        }else {
            product3 = 0;
        }
        
        totalPayment = parseFloat( (product1 * 10) + (product2 * 20) + (product3 * 30) );

        switch(deliveryTime){
            case "1":
                deliveryCost = 30;
                break;
            case "2":
                deliveryCost = 25;
                break;
            case "3":
                deliveryCost = 20;
                break;
            case "4":    
                deliveryCost = 15;
                break;
            default:
                deliveryCost = 0;
        }
        subTotal = totalPayment + deliveryCost;

        switch (province){
            case "Alberta": 
            case "Northwest Territories": 
            case "Nunavut": 
            case "Yukon":
                taxPercent = 5;
                break;
            case "British Columbia":
                taxPercent = 12;
                break;
            case "Manitoba":
            case "Ontario":
                taxPercent = 13;
                break;
            case "New Brunswick":
            case "Newfoundland and Labrador": 
            case "Nova Scotia": 
            case "Prince Edward Island":
                taxPercent = 15;
                break;
            case "Quebec":
                taxPercent = 14.975;
                break;
            case "Saskatchewan":
                taxPercent = 11; 
                break;
        }
        tax = taxPercent * subTotal/100;
        totalAmount = subTotal + tax;

        //Preparing the invoice
        message += `
            <h2>Your invoice</h2>
            <div id="invoice">       
            <table>
            <tr><td align="left">Name</td>             <td align="center" width = "80px">:</td> <td align="right">${name}</td> </tr>     
            <tr><td align="left">Email</td>            <td align="center" width = "80px">:</td> <td align="right">${email}</td> </tr>
            <tr><td align="left">Phone</td>            <td align="center" width = "80px">:</td> <td align="right">${phone}</td> </tr>
            <tr><td align="left">Delivery Address</td> <td align="center" width = "80px">:</td> <td align = "start">${address} <br> ${city} <br> ${province}, ${postcode} </td></tr>`
        if (product1 != ''){
            message += `<tr><td align="left">${product1} GTA V @ $10.00 </td> <td align="center" width = "80px">:</td> <td align="right">$${(product1*10).toFixed(2)} </td></tr>`;
        }
        if (product2 != ''){
            message += `<tr><td align="left">${product2} Uncharted 4 @ $20.00</td> <td align="center" width = "80px">:</td> <td align="right">$${(product2*20).toFixed(2)} </td></tr>`;
        }
        if (product3 != ''){
            message += `<tr><td align="left">${product3} Lego Deadpool @ $30.00</td> <td align="center" width = "80px">:</td> <td align="right">$${(product3*30).toFixed(2)} </td></tr>`;
        }
        message += `<tr><td align="left">Shipping Charges</td> <td align="center" width = "80px">:</td> <td align="right">$${deliveryCost.toFixed(2)} </td></tr>
        <tr><td align="left">Sub Total</td> <td align="center" width = "80px">:</td> <td align="right">$${subTotal.toFixed(2)}</td></tr>
        <tr><td align="left">Taxes @ ${taxPercent}%</td> <td align="center" width = "80px">:</td> <td align="right">$${tax.toFixed(2)}</td></tr>
        <tr><td align="left">Total</td> <td align="center" width = "80px">:</td> <td align="right">$${totalAmount.toFixed(2)}</td></tr>
        </table>
        </div>
        `;

        document.getElementById('fillForm').innerHTML = message;

        //Shows the message
        document.getElementById('errors').style.display = 'block';
        document.getElementById('errors').innerHTML = `<h2 style="font-size: 30px; text-align: center; display: flex; justify-content: center;">Thank you for buying with us! <br> <br>Have a great day!<br><br> ;) </h2>`;
    }
    
    return false;
}