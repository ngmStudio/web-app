const express = require("express");
const app = express();
const port = 5000;
const campaignRoutes = require('./routes/campaignRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notesRoutes = require('./routes/notesRoutes');
const shopRoutes = require('./routes/shopRoutes');
const taskRoutes = require('./routes/taskRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');
const userRoutes = require('./routes/userRoutes');

// Rutes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/objective', objectiveRoutes);
app.use('/api/user', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


