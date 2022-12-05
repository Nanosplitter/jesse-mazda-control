const functions = require("firebase-functions");
const MyMazda = require("node-mymazda");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest(async (request, response) => {

    functions.logger.info(MyMazda, {structuredData: true});

    // Initialize API Client (MNAO = North America)
    let client = MyMazda("jesse.c.wilson@gamail.com", "2445Dli53mazda", "MNAO");

    // Get list of vehicles from the API (returns a list)
    let vehicles = await client.getVehicles();

    // Loop through the registered vehicles
    for (let vehicle of vehicles) {
        // Get vehicle ID (you will need this in order to perform any other actions with the vehicle)
        let vehicleId = vehicle.id;

        // Get and output vehicle status
        let status = await client.getVehicleStatus(vehicleId);
        functions.logger.info(status, {structuredData: true});

        // Start engine
        await client.startEngine(vehicleId);
    }

  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
