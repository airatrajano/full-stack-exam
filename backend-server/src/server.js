const express = require('express');
const Papa = require('papaparse');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

// import { ServiceClass } from './service.js';

const app = express();

app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'products.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read CSV file' });
    }

    const parsedData = Papa.parse(data, {
      header: true, 
      skipEmptyLines: true, 
    });

    res.json({products: parsedData.data});
  });
});

app.get('/api/product/:id', (req, res) => {

    const { id } = req.params;  // Get the 'id' from the URL

  // Path to the CSV file
  const filePath = path.join(__dirname, 'products.csv');

  // Read the CSV file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read CSV file' });
    }

    // Parse the CSV file using PapaParse
    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    });

    const row = parsedData.data.find(item => item.id === id);

    if (row) {
      return res.json(row);
    } else {
      return res.status(404).json({ error: `No product found with id ${id}` });
    }
  });
});

app.get('/api/product/:id', (req, res) => {

    const { id } = req.params; 

    const filePath = path.join(__dirname, 'products.csv');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to read CSV file' });
        }

        const parsedData = Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        });

        const row = parsedData.data.find(item => item.id === id);

        if (row) {
        return res.json(row);
        } else {
        return res.status(404).json({ error: `No product found with id ${id}` });
        }
    });
});

app.get('/api/product-types', (req, res) => {

  const filePath = path.join(__dirname, 'products.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read CSV file' });
    }

    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    });

    const types = parsedData.data
      .map(item => item.type) 
      .filter(Boolean);

    const uniqueTypes = [...new Set(types)];

    return res.json({ types: uniqueTypes });
  });
});

app.post('/api/product', (req, res) =>{
    const { type, name, id, price } = req.body;
    const newRow = `\n${type},${name},${id},${price}`;
    const filePath = path.join(__dirname, 'products.csv');
    fs.appendFile(filePath, newRow, (err) => {
        if (err) {
          console.error('Error writing to CSV:', err);
          return res.status(500).json({ error: 'Error adding row to CSV' });
        }
        res.status(200).json({ message: 'Row added successfully!' });
    });
});

app.delete('/api/product/:id', (req, res) =>{
    const { id } = req.params; 

    const filePath = path.join(__dirname, 'products.csv');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to read CSV file' });
        }

        const parsedData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
        });

        const filteredData = parsedData.data.filter(item => item.id !== id);

        if (filteredData.length === parsedData.data.length) {
            return res.status(404).json({ error: `Product with id ${id} not found` });
        }

        const updatedCSV = Papa.unparse({
        fields: Object.keys(filteredData[0]), // Ensure correct header order
        data: filteredData,
        });

        // Write the updated CSV data back to the file
        fs.writeFile(filePath, updatedCSV, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write updated CSV file' });
        }
        // Respond with success
        return res.json({ message: `Product with id ${id} deleted successfully` });
        });
    });
})


app.get('/', (req, res) =>{
    // const service = new ServiceClass();
    res.send('Hello!')
})


app.listen(8080, ()=>{
    console.log(`Server listing port 8080`);
});
