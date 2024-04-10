const cars = require('./cars.json'); // Make sure to have a 'cars.json' file

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    switch (req.method) {
        case 'GET':
            context.res = { body: cars };
            break;
        case 'POST':
            const newCar = req.body;
            cars.push(newCar);
            context.res = { body: newCar };
            break;
        case 'PUT':
            const id = parseInt(req.query.id);
            const updatedCar = req.body;
            const index = cars.findIndex(car => car.id === id);
            cars[index] = updatedCar;
            context.res = { body: updatedCar };
            break;
        case 'DELETE':
            const deleteId = parseInt(req.query.id);
            const deleteIndex = cars.findIndex(car => car.id === deleteId);
            cars.splice(deleteIndex, 1);
            context.res = { body: { message: `Car with id ${deleteId} deleted` } };
            break;
        default:
            context.res = {
                status: 400,
                body: "Request method not supported."
            };
            break;
    }
};
