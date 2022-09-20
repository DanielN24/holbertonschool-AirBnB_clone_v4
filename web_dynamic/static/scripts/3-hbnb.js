$('document').ready(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success') {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        }
    });

    let amenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));
    });
});

function getUsers() {
    return new Promise(resolve => {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/users',
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                resolve(data)
            }
        })
    })
}

async function asyncUser(){
    let users = await getUsers();
    return(users)
}

const places_search = `http://0.0.0.0:5001/api/v1/places_search/`
$.ajax({
    url: places_search,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
        let users = asyncUser()
        console.log(users)
        for (let i of data) {
            let places = [
                `<article>`,
                `<div class="title_box">`,
                `<h2>${ i.name }</h2>`,
                `<div class="price_by_night">${ i.price_by_night }</div>`,
                `</div>`,
                `<div class="information">`,
                `<div class="max_guest">${ i.max_guest } Guests</div>`,
                `<div class="number_rooms">${ i.number_rooms } Bedrooms</div>`,
                `<div class="number_bathrooms">${ i.number_bathrooms } Bathrooms</div>`,
                `</div>`,
                `<div class="user">`,
                `<b>Owner:</b> ${ i.user.first_name } ${ i.user.last_name }`,
                `</div>`,
                `<div class="description">`,
                `${ i.description | safe }`,
                `</div>`,
                ` </article>`];
            $('.places').append(places.join(''));
        }
    }
})
