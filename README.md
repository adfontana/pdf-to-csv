# PDF to CSV

PDF to CSV is an Angular application that allows to open PDF files and convert the data of those files as CSV data, that could be processed and stored more easily.

This project was created as an example of how read pdf files and manipulate its data in an Angular application project.

## Dependecies
The data conversion is done by the package [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist), and the package [xlsx](https://www.npmjs.com/package/xlsx) is used to save the data as an Excel file.

For `pdfjs-dist` to work, i needed to add the lines below as an asset in the `angular.json` file 
<pre><code>{
    "glob": "pdf.worker.*",
    "input": "node_modules/pdfjs-dist/build/",
    "output": ""
}</code></pre>


## Installation

Clone the git repository, then install all the packages:

    git clone https://github.com/adfontana/pdf-to-csv.git
    npm install

## Usage
    Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

![](pdftocsv.gif)
