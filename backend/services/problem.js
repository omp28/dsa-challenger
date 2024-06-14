const fileupload = require('express-fileupload')
const path = require('path')
const csv = require('csv-parser');
const fs = require('fs');
const Problem = require('../models/Problems');
const express = require('express');
const rounter = express.Router();

//routes
    rounter.post('/', fileupload({createParentPath: true}), (req, res) => {
        if(!req.files) {
            return res.status(400).send('No files were uploaded')
        }
        const file = req.files
        const fileName = file.filekey.name
        if (file.filekey.mimetype !== 'text/csv') {
            return res.status(400).send('Only CSV files are allowed')
        }
        if (file.filekey.size > 5 * 1024 * 1024) {
            return res.status(400).send('File size exceeds the limit of 5MB')
        }
        const uploadPath = path.join(__dirname, '..', 'problems_data', fileName)
         req.files.filekey.mv(uploadPath, (err) => {
                    if(err) {
                        return res.status(500).send(err)
                    }
                    var problems = [];
                    fs.createReadStream(uploadPath)
                        .pipe(csv())
                        .on('data', (row) => {
                            // Create a new Problem instance with the data from the CSV row
                            const tagsArray = row.tags ? row.tags.replace(/'/g, '').replace(/[\[\]]/g, '').split(', ') : [];
                            const problem = new Problem({
                                // Map the CSV row data to the Problem schema fields
                                problem_id: row.problem_id,
                                platform: row.platform,
                                problem_name: row.problem_name,
                                problem_link: row.problem_link,
                                difficulty: row.difficulty,
                                tags: tagsArray,
                            });
                            problems.push(problem);
                        })
                        .on('end', () => {
                            // Save all the problems to MongoDB
                            Problem.insertMany(problems)
                                .then(() => {
                                    console.log('Problems saved successfully');
                                    res.json({
                                        message: 'Problems uploaded successfully',
                                    });
                                    problems = [];
                                    // Delete the uploaded file
                                    fs.unlink(uploadPath, (err) => {
                                        if (err) {
                                            console.error('Error deleting file:', err);
                                        } else {
                                            console.log('File deleted successfully');
                                        }
                                    });
                                })
                                .catch((error) => {
                                    console.error('Error saving problems:', error);
                                    res.status(500).send('Error saving problems');
                                });
                            console.log(problems)
                        });
                })
    });

module.exports = rounter;