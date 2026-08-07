import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import app from "./app.js";
import { env } from "./config/environment.config.js";
import { connectDB } from "./config/database.config.js";

await connectDB();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
