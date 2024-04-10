const cars = require('./cars.json');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Update car
    if (req.method === 'PUT' && req.query.id) {
        const id = parseInt(req.query.id);
        const updatedCar = req.body;
        const index = cars.findIndex(car => car.id === id);
        cars[index] = updatedCar;
        context.res = {
            body: updatedCar
        };
    }

    // Add car
    else if (req.method === 'POST') {
        const newCar = req.body;
        cars.push(newCar);
        context.res = {
            body: newCar
        };
    }

    // Delete car
    else if (req.method === 'DELETE' && req.query.id) {
        const id = parseInt(req.query.id);
        const index = cars.findIndex(car => car.id === id);
        cars.splice(index, 1);
        context.res = {
            body: { message: `Car with id ${id} deleted` }
        };
    }

    // If no method matches, return a 400 Bad Request
    else {
        context.res = {
            status: 400,
            body: "Request method not supported."
        };
    }
};