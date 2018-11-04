const mysql = require("mysql");
const inquirer = require("inquirer");
const cliTable = require('cli-table');
const chalk = require('chalk');

const connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "Password",
    database: "bamazon_db"
 });
 
 connection.connect(err => {
    if (err) throw err;
    start();
 });

 function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        let productTable = new cliTable(
            {
                head: ["ITEM_ID", "PRODUCT", "DEPARTMENT", "PRICE", "STOCK"],
                colWidths: [12, 40, 20, 12, 12],
            });
        for (let i = 0; i < results.length; i++) {
            productTable.push(
                [results[i].ITEM_ID, results[i].PRODUCT_NAME, results[i].DEPARTMENT_NAME, parseFloat(results[i].PRICE).toFixed(2), results[i].STOCK_QUANTITY]
            );
        }
        console.log(chalk.blue(productTable.toString()));
           
        inquirer.prompt([
            {
                type: "number",
                name: "buyingWhat",
                message: "Which item would you like to buy? (enter ITEM_ID)"
            },
            {
                type: "number",
                name: "quantity",
                message: "How many do you want?"                
            }
        ]).then(choice => {
            let item = choice.buyingWhat;
            let quantity = choice.quantity;

            if (item > results.length){
                console.log(chalk.red.bold("Please enter a valid ITEM_ID"));
                start();
            }
            connection.query('SELECT * FROM products WHERE ITEM_ID=' + item, function (err, selected) {
                if (err) throw err;
                if (selected[0].STOCK_QUANTITY - quantity >= 0) {
                    console.log(chalk.bold.yellow.underline("Your total comes to: $" + (choice.quantity * selected[0].PRICE).toFixed(2)));
                    console.log(chalk.green("Purchase successful!"));

                    connection.query('UPDATE products SET STOCK_QUANTITY=? WHERE ITEM_ID=?', [selected[0].STOCK_QUANTITY - quantity, item],
                        function (err, stock) {
                            inquirer.prompt([
                                {
                                    name: "again",
                                    type: "confirm",
                                    message: "Are you finished shopping?"
                                }
                            ]).then(resp => {
                                if (resp.again === true) {
                                    console.log(chalk.green("Thank you!"));
                                    connection.end();
                                } else {
                                    start();
                                }
                            })
                        });
                } else {
                    console.log(chalk.bold.red("Cannot fill your full order,\nthere are only " + selected[0].STOCK_QUANTITY + " " + selected[0].PRODUCT_NAME + "'s available."));
                    start();
                }
            });
          });
    });
 }