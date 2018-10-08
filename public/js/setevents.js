
$(document).ready(function () {
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 20) {
            $(".navbar").addClass("compressed");
        } else {
            $(".navbar").removeClass("compressed");
        }
    });
});


// Get references to page elements
var $businessName = $("#businessName");
var $mon = $("#promoMonday");
var $tue = $("#promoTuesday");
var $wed = $("#promoWednesday");
var $thu = $("#promoThursday");
var $fri = $("#promoFriday");
var $sat = $("#promoSaturday");
var $sun = $("#promoSunday");

var $submitBtn = $("#submit");


// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function (deals) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "submitEvents2",
            data: JSON.stringify(deals)
        });
    },
    getExamples: function (deals) {
        return $.ajax({
            url: "updateEventsPage",
            type: "GET",
            data: JSON.stringify(deals)
        });
    },
    deleteExample: function (id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
    API.getExamples().then(function (data) {
        var $examples = data.map(function (example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();
    console.log("button pressed")

    var deals = {
        businessName: $businessName.html(),
        monday: $mon.val().trim(),
        tuesday: $tue.val().trim(),
        wednesday: $wed.val().trim(),
        thursday: $thu.val().trim(),
        friday: $fri.val().trim(),
        saturday: $sat.val().trim(),
        sunday: $sun.val().trim(),

    };

    // if (!(deals.text && deals.description)) {
    //   alert("You must enter an example text and description!");
    //   return;
    // }

    API.saveExample(deals).then(function () {
        console.log("getting info from db")
        API.getExamples(deals);
    });


};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
        refreshExamples();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);


