function requestAPI(mod, bool, order)
{
    return new Promise((resolve, reject) => 
    {
        let init = {};
        let r = [];

        if(!bool)
        {
            init = {
                method : "GET",
                "headers" : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json; charset=UTF-8"
                },
                mode: "cors"
            };
        }
        else
        {
            init = {
                method : "POST",
                "headers" : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json; charset=UTF-8"
                },
                mode: "cors",
                body : JSON.stringify(order)
            }
        }

        fetch("http://localhost:3000/api/products/" + mod, init)
        .then(function(res)
        {
            if (res.ok)
            {
                return res.json();
            }
        })
        .then(function(value)
        {
            //POURQUOI CA MARCHE ?!?!?!??!?!?!?!?
            if(value.length > 1)
            {
                for(var i = 0 ; i < value.length; i++)
                {
                    r.push(value[i]);
                };
            }
            else
            {
                r.push(value);
            }
            console.log("R : " + r[0]);
            resolve(r); 
        })
        .catch(function(msg)
        {
            reject(new Error("Error: " + msg));
        })
    })
}
