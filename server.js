require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/auth.routes.js")(app);
require("./app/routes/availability.routes.js")(app);
require("./app/routes/composer.routes.js")(app);
require("./app/routes/critique.routes.js")(app);
require("./app/routes/evaluation.routes.js")(app);
require("./app/routes/evaluationComment.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/eventTimeslot.routes.js")(app);
require("./app/routes/instrument.routes.js")(app);
require("./app/routes/repertoire.routes.js")(app);
require("./app/routes/semester.routes.js")(app);
require("./app/routes/song.routes.js")(app);
require("./app/routes/songTranslation.routes.js")(app);
require("./app/routes/studentInstrument.routes.js")(app);
require("./app/routes/studentTimeslot.routes.js")(app);
require("./app/routes/timeslotSong.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/userRole.routes.js")(app);
require("./app/routes/jurorTimeslot.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3027;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
