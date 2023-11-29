const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

const filePath = 'Results.txt';  
const fileContent = fs.readFileSync(filePath, 'utf-8');

const companies = fileContent.split('\n\n');

let htmlContent = '<html><body>';

companies.forEach((companyInfo) => {
    const companyData = companyInfo.split('\n');
    const companyName = companyData[0];
    htmlContent += `<h2>${companyName}</h2><ul>`;
    
    for (let i = 1; i < companyData.length; i++) {
        const [attribute, link] = companyData[i].split(': ');
        htmlContent += `<li>${attribute}: <a href="${link}" target="_blank">${link}</a></li>`;
    }

    htmlContent += '</ul>';
});

htmlContent += '</body></html>';

app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
