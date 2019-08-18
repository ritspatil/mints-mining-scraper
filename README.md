# Mint Scrapper

This script is injected to a webpage using requestly. When the url matches /transactions, this script will scrape all expenses on the page and push the data to fire store

### Deployment

To deploy the script run the following commands

```sh
$ npm build
$ firebase deploy
```

The deployed main.js file can be found here
`https://mint-mining.firebaseapp.com/main.js`

Once it is deployed you can paste the deployed main.js location in requestly
```
https://app.requestly.in/rules/
```
