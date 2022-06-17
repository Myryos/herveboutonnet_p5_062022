function requestAPI(mod, bool, order)
{
    let init = {};
    let r = [];
    let r1 = {};

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

    fetch("http://localhost:3000/api/products/" + mod, init).then(function(res)
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
    });
    return r;
}