import app from "./app.js";
import { env } from "./config/environment.config.js";
import { connectDB } from "./config/database.config.js";

await connectDB();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
