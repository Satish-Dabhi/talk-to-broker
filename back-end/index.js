const express = require("express"); 
const cors = require('cors');
const  employeesRoutes = require("./routes/employ");
const  propertyRoutes = require("./routes/property");

const app = express(); 
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3005; 

app.get("/", (req, res) => { 
    res.send("Working ...:)"); 
}); 

app.use("/employ",  employeesRoutes);
app.use("/property",  propertyRoutes);

app.listen(PORT, () => { 
    console.log(`Server running on ${PORT}`); 
});