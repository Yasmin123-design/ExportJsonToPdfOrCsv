import express from "express";
import exportRoutes from "./Routes/exportRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", exportRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
