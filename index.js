const apiKey = "ae98ey7bf5md8og3uan8qk3alpeqw1h5drbq43te25vgjs7t2w"
const createBtn = document.getElementById("createBtn")
const invitee1Field = document.getElementById("invitee1")
const invitee2Field = document.getElementById("invitee2")
const startDateField = document.getElementById("startDate")
const endDateField = document.getElementById("endDate")
const meetingTitleField = document.getElementById("meetingTitle")
const lastBookingField = document.getElementById("previous")

let lastBooking = localStorage.getItem("last_booking")

if(lastBooking){
    lastBookingField.innerHTML = "Last Booked Meeting: <a href="+lastBooking+" target='_blank'>"+lastBooking+"</a>"
}


function createMeeting(invitee1, invitee2, startDate, endDate, meetingTitle){
    let data = JSON.stringify({
        "title": meetingTitle,
        "created_by": {
            "email": "swiftmeetings@gmail.com"
        },
        "dates": [
            {
            "all_day": false,
            "date": startDate,
            "end_date": endDate
            }
        ],
        'places': [{"name": "Google Meet", "source": "Google Meet"}],
        "invitees": [{"email": invitee1}, {"email": invitee2}],
        "timezone": "Asia/Kolkata",
        "confirmed": {
                "flag": true
            }
    });

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
	    if (xhr.status >= 200 && xhr.status < 300) {
            meetingLink = JSON.parse(xhr.responseText).places[0].address
            localStorage.setItem("last_booking", meetingLink)
            lastBookingField.innerHTML = "Last Booked Meeting: <a href="+meetingLink+" target='_blank'>"+meetingLink+"</a>"
	    } else {
            alert("Error!")
	    }
    };
    xhr.open("POST", "https://api.vyte.in/v2/events");
    xhr.setRequestHeader("Authorization", apiKey);
    xhr.setRequestHeader("Access-Control-Allow", "");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

createBtn.addEventListener("click", function(){
    let invitee1 = invitee1Field.value
    let invitee2 = invitee2Field.value
    let startDate = startDateField.value + ":00+05:30"
    let endDate = endDateField.value + ":00+05:30"
    let meetingTitle = meetingTitleField.value

    if(invitee1=="" || invitee2=="" || startDate=="" || endDate=="" || meetingTitle==""){
        alert("Please fill out all details")
    }
    else{
        createMeeting(invitee1, invitee2, startDate, endDate, meetingTitle)
        invitee1Field.value=""
        invitee2Field.value=""
        startDateField.value=""
        endDateField.value=""
        meetingTitleField.value=""
    }
})

