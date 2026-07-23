import app from "./app.js";
import { env } from "./config/environment.config.js";

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
