const fs = require("fs");
const csvParser = require("csv-parser");

var userMap = new Set(); // Use a Map to store user information

fs.createReadStream("./file.csv")
  .pipe(csvParser())
  .on("data", async (row) => {
    const { userId, timestamp, message } = row;

    // Store user information in the Map based on unique userId

    userMap.add({
      userId: userId,
      timestamps: timestamp,
      content: message,
    });
  })
  .on("end", () => {
    const userIdsArray = Array.from(userMap); // Convert Map values to an array

    // Convert the array to JSON format
    const jsonContent = JSON.stringify(userIdsArray, null, 2);

    // Write the JSON content to a file
    fs.writeFile("userIds.json", jsonContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("UserIds JSON file written successfully.");
      }
    });
  });
