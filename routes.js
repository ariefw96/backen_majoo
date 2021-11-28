const express = require('express');
const router = express.Router();
const fs = require('fs');
const location = (name = '') => name ? `api/v1/${name}` : 'api/v1';

fs.readdirSync(location())
.forEach(file => {
    const path = `/${location(file)}`;
    router.use(path, require(`.${path}`));
});

module.exports = router;