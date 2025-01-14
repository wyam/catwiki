const express = require('express');
const catsRouter = express.Router();
const { query, validationResult } = require('express-validator');
const catsService = require('./catsService');

catsRouter.get('/filter',
    query('breed').optional().isAlpha().withMessage('Only letters is allowed'),
    async (req, res) => {
        const queryErrors = validationResult(req);
        if (!queryErrors.isEmpty()) {
            return res.status(400).json({ errors: queryErrors.array() });
        }
        const cats = await catsService.getCatsByBreed(req.query.breed);
        if (cats) {
            return res.json(cats);
        }
        return res.status(500).json({message: 'Internal error'});
    }
);

catsRouter.get('/breeds',
    async (req, res) => {
        const catsBreeds = await catsService.getBreeds();
        if (catsBreeds) {
            return res.json(catsBreeds);
        }
        return res.status(500).json({message: 'Internal error'});
    }
);

module.exports = catsRouter;
