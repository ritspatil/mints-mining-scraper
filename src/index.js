const firebase = require("firebase");
const each = require('lodash/each');
const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const trimStart = require('lodash/trimStart');
const moment = require('moment');
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyDrweeydDLEhUkSXkBAYBuGqJaBDRDShoU",
    authDomain: "mint-mining.firebaseapp.com",
    projectId: "mint-mining",
});

var db = firebase.firestore();

var scrapeData = function () {
    const table = document.getElementById('transaction-list-body');
    each(table.rows, row => {
        const data = {};
        let fieldIsEmpty = false;
        each(row.cells, cell => {
            if (cell.className.indexOf('date') > -1) {
                data.date = cell.innerText;
                if (isEmpty(cell.innerText)) {
                    fieldIsEmpty = true;
                }
            }
            if (cell.className.indexOf('description') > -1) {
                data.desc = cell.innerText;
                if (isEmpty(cell.innerText)) {
                    fieldIsEmpty = true;
                }
            }
            if (cell.className.indexOf('cat') > -1) {
                data.category = cell.innerText;
                if (isEmpty(cell.innerText)) {
                    fieldIsEmpty = true;
                }
            }
            if (cell.className.indexOf('money') > -1) {
                data.amount = cell.innerText;
                if (isEmpty(cell.innerText)) {
                    fieldIsEmpty = true;
                }
            }
        });
        if (!fieldIsEmpty && get(data, 'amount.0') === "-") {
            const id = row.getAttribute('id');
            const date = moment(`${data.date} 2019`);
            const formattedAmount = parseFloat(trimStart(data.amount, '-$'));
            db.collection('expenses').doc(id).set(Object.assign({}, data, { date: date.toISOString(), amount: formattedAmount }))
                .then(function() {
                    console.log("Document successfully written! ", data);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    });
}

var waitForTransactions = setInterval(function() {
    var transactionListBody = document.getElementById('transaction-list-body');
    if (get(transactionListBody, 'rows', [].length)) {
        setTimeout(scrapeData, 10000);
        clearInterval(waitForTransactions);
    }
}, 2000);


