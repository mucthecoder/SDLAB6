const cars=require('./cars.json');
let next_ind=0;
for (let i=0;i<cars.length;i++){
    let c={
        make:cars[i].make,
        model:cars[i].model,
        year:cars[i].year,
        price:cars[i].price,
        id:i
    };
    next_ind++;
    cars[i]=c;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    if (req.body.key==="get"){
        context.res.json( {
            // status: 200, /* Defaults to 200 */
            body: "responseMessage",
            text:cars
        });
    }
    else if(req.body.key==="add"){
        let cari=req.body.one;
        let c={
            make:cari.make,
            model:cari.model,
            year:cari.year,
            price:cari.price,
            id:next_ind
        };
        next_ind++;
        cars.push(c);
        context.res.json( {
            // status: 200, /* Defaults to 200 */
            body: "all good",
        });
    }
    else if(req.body.key==="delete"){
        const index = cars.findIndex(car => car.id === req.body.one);
        cars.splice(index, 1);
        context.res.json( {
            // status: 200, /* Defaults to 200 */
            text: cars,
            what: "responseMessage"
        });
    }
}