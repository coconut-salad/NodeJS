const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const pathRoot = require('./utils/rootPath');

console.log(pathRoot);

const app = express();

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(3000);
