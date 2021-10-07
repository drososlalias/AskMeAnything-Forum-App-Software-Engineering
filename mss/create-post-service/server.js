const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Define Routes

app.use('/', require('./routes/createpost'));

const PORT =  process.env.PORT || 4003;

app.listen(PORT, () => console.log(`Create-Post-service running on port ${PORT}`));
