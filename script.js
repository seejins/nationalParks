const apiKey="Gb74t1VxSFwUTaX6v4cjbf9Vp3dLJLIvsg4NDRvr";
const searchUrl="https://developer.nps.gov/api/v1/parks";

function displayResults(responseJson) {
    $("#results-list").empty();

    console.log(responseJson);
    for(let i=0; i<responseJson.data.length; i++) {
        $("#results-list").append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}"> ${responseJson.data[i].url}</a>
            </li>
            `
        )
    }
    $("#results").removeClass("hidden");

}


function getNationalParks(searchTerm, maxResults=10) {
    console.log("Formdata", searchTerm, maxResults);
    const params= {
        api_key: apiKey,
        stateCode: searchTerm,
        limit: maxResults,
    };

    let queryString = $.param(params);
    console.log(queryString);
    const url = searchUrl + "?" + queryString;

    fetch(url)
        .then(response=> {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(responseJson=>displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something failed: ${err.message}`);
        });
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchTerm=$("#search-term").val();
        let maxResults=$("#max-results").val();
        if(searchTerm != "") {
            getNationalParks(searchTerm, maxResults);
        } else {
            alert("Please enter a search term");
        }
    })

}


$(watchForm)