console.log("this is postman js ");


//function to get dom element from string 
function getElementfromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// paramerter count
let addParamsCount = 0;
// initially hiding paramerters box
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

//if user clicks on params box then hide json box 
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener('click', () => {
    document.getElementById("requestJsonBox").style.display = 'none';
    document.getElementById("parametersBox").style.display = 'block';
})

//if the user clicks JSon then hide paarams box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    document.getElementById("requestJsonBox").style.display = 'block';
    document.getElementById("parametersBox").style.display = 'none';
})

// if the user clicks on + button then add more parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener('click', () => {
    let params = document.getElementById("params");
    let str = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameters</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Value">
                    </div>
                    <button  class="btn btn-primary deletParam">- </button>
                </div>`
    // convert the element string to dom node 
    let paramElement = getElementfromString(str);
    params.appendChild(paramElement);
    //add an  event listner to remove the parametre
    let deletParam = document.getElementsByClassName("deletParam");
    for (item of deletParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addParamsCount++;

});

//if thhe user clicks on submit button 

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    //show please wait in  responseText box
    document.getElementById('responseJsonText').value = "please wait ...Fetching data";

    //fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //if user has used params option 
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }

        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById("requestJsonText").value;
    }


    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);


    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
            // mode: 'no-cors',
        })
            .then(response => { return response.text(); })
            .then((text) => {
                console.log(text);
                document.getElementById('responseJsonText').value = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            // mode: 'no-cors',
            body: data,
            headers: {
                "Content-type": "applicatin/json; charset=UTF-8"
            }
        })
            .then(response => { return response.text(); })
            .then((text) => {
                console.log(text);
                document.getElementById('responseJsonText').value = text;
            });
    }

})




