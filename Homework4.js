var main = function() {
    "use strict";
    window.console.log("hello");
    $.get("http://localhost:3000/actors", function(actors) {

        actors.forEach(function(value) {

            if (value.starred === true) {
                var $output = $("<div class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-avatar\">person</i><span>" + value.name + "</span></span><a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons\" id=\"" + value.id + "\">star</i></div>");
                //$output.hide();
                $(".demo-list-action.mdl-list").append($output);
                //$output.slideDown(2000);
            } else {
                var $output2 = $("<div class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-avatar\">person</i><span>" + value.name + "</span></span><a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons\" id=\"" + value.id + "\">star_border</i></div>");
                //$output2.hide();
                $(".demo-list-action.mdl-list").append($output2);
                //$output2.slideDown(2000);
            }
        });

    });
    //Action when clicking on the button - Post an actor entered from the text field with starred: false
    $("button").on("click", function(event) {

        var $new_actor = $("#actor_name").val();
        var count = 0;

        $.get("http://localhost:3000/actors", function(data) {
            count = Object.key(data).length;
        });

        var newID = count++;

        $.post("http://localhost:3000/actors", {
            "id": newID,
            "name": $new_actor,
            "starred": false
        }, function(actor) {});

    });

    $(document).on("click", ".mdl-list__item-secondary-action .material-icons", function() {
        window.console.log("here");

        var id = $(this).attr('id');
        var name = $(this).parent().prev().find("span").text();
        console.log(name);
        if ($(this).text() === "star") {
            $(this).text("star_border");
            $.ajax({
                url: "http://localhost:3000/actors/" + id,
                type: "PUT",
                data: {
                    "id": id,
                    "name": name,
                    "starred": false
                },
                success: function() {
                    console.log("good");
                }
            });


        } else {
            $(this).text("star");
            $.ajax({
                url: "http://localhost:3000/actors/" + id,
                type: "PUT",
                data: {
                    "id": id,
                    "name": name,
                    "starred": true
                },
                success: function() {
                    console.log("good");
                }
            });
        }
    });
};

$(document).ready(main);
