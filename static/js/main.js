$(".iconbtn").bind("click", function () {
    console.log("clicked")
})
$(".options").show()
$(".op_speed").hide()
$(".op_emp").hide()

// Emphasis smalltoolbar
$(".emph").on("click", function () {
    $(".op_emp").toggle(500)
});

// Speed smalltoolbar
$(".speed").on("click", function () {
    $(".op_speed").toggle(500)
});


// Clear Editor smalltoolbar
$(".clear").on("click", function () {
    $(".editor").empty()
});




var ssml = ssml || {};

// Functions for SSML 
ssml.actions = {
    markword: function (className) {
        console.log(className);
        if(className==="emphasis"){
            document.execCommand("insertHTML", false, "<span class='" + className + "'style='background-color:maroon;color:white;font-weight:bolder'  >" + document.getSelection() + "</span><br>");
        }
        else{
            document.execCommand("insertHTML", false, "<span class='" + className + "'  >" + document.getSelection() + "</span>");

        }
        console.log(document.getSelection());
    },



    insertDelay: function () {
        document.execCommand("insertHTML", false, "<i class='fa fa-clock-o' contenteditable='false' />");
    },

    type: function (emp) {
        ssml.actions.markword(emp);
    },

    undo: function () {
        document.execCommand("undo");
    },

    redo: function () {
        document.execCommand("redo");
    },



    convertToSsml: function () {

        // var html = $(".editor").html();
        var html = $(".editor").html()
        console.log(html)
        var $newContent = $("<p/>");

        /* Wrap text */
        $newContent.append(html);

        /* replace nbsp */
        $newContent.html(function (i, html) {
            return html.replace(/&nbsp;/g, ' ');
        });

        /* replace linebreaks */
        $newContent.find("p").each(function () {
            if ($.trim($(this).text()) == "") {
                $(this).remove();
            }
        });

        /* replace pause */
        // $newContent.find("br").replaceWith(function () {
        //     return '';
        // })
        $newContent.find("br").each(function () {
            // if ($.trim($(this).text()) == "") {
                $(this).remove();
            // }
        });

        /* replace Emphasis */
        $newContent.find(".emphasis").replaceWith(function () {
            return '<emphasis level="strong">' + this.innerHTML + "</emphasis>";
        })

        $newContent.find(".moderate").replaceWith(function () {
            return '<emphasis level="moderate">' + this.innerHTML + "</emphasis>";
        })
        $newContent.find(".reduced").replaceWith(function () {
            return '<emphasis level="reduced">' + this.innerHTML + "</emphasis>";
        })
        $newContent.find(".none").replaceWith(function () {
            return '<emphasis level="none">' + this.innerHTML + "</emphasis>";
        })


        $newContent.find(".cardinal").replaceWith(function () {
            return '<say-as interpret-as="cardinal">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".ordinal").replaceWith(function () {
            return '<say-as interpret-as="ordinal">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".characters").replaceWith(function () {
            return '<say-as interpret-as="characters">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".fraction").replaceWith(function () {
            return '<say-as interpret-as="fraction">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".expletive").replaceWith(function () {
            return '<say-as interpret-as="expletive">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".unit").replaceWith(function () {
            return '<say-as interpret-as="unit">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".spellout").replaceWith(function () {
            return '<say-as interpret-as="verbatim">' + this.innerHTML + "</say-as>";
        })

        $newContent.find(".date").replaceWith(function () {
            return '<say-as interpret-as="date" format="dmy" detail="2">' + this.innerHTML + "</say-as>";
        })


        $newContent.find(".time").replaceWith(function () {
            return '<say-as interpret-as="time" format="hms12">' + this.innerHTML + "</say-as>";
        })



        /* replace pause */
        $newContent.find(".fa-clock-o").replaceWith(function () {
            return `<break time="300ms"></break>`;;

        })



        /* replace pitch down */
        $newContent.find(".slower").replaceWith(function () {
            return '<prosody pitch="-3st">' + this.innerHTML + "</prosody>";
        })
        $newContent.find(".slow").replaceWith(function () {
            return '<prosody pitch="-1st">' + this.innerHTML + "</prosody>";
        })
        $newContent.find(".normal").replaceWith(function () {
            return '<prosody pitch="0st">' + this.innerHTML + "</prosody>";
        })

        /* replace pitch up */
        $newContent.find(".fast").replaceWith(function () {
            return '<prosody pitch="+1st">' + this.innerHTML + "</prosody>";
        })
        $newContent.find(".faster").replaceWith(function () {
            return '<prosody pitch="+3st">' + this.innerHTML + "</prosody>";
        })

        var final = $(".output").text("<speak>" + $newContent.html() + "</speak>");


        console.log(final["0"].innerText);



    }
}

ssml.listners = {
        actionbuttons: function () {
            $(".action-button").on("click", function (event) {
                event.preventDefault();
                var action = $(this).data("action");
                console.log(action);
                eval(action);
            });
        }
    },


    

    ssml.init = function () {



        this.listners.actionbuttons();
        document.execCommand("defaultParagraphSeparator", false, "p");


        function handlePaste(e) {
            var clipboardData, pastedData;

            // Stop data actually being pasted into div
            e.stopPropagation();
            e.preventDefault();

            // Get pasted data via clipboard API
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');

            // Do whatever with pasteddata
            // alert(pastedData);
            document.execCommand("insertHTML", false,pastedData);
        }

        document.querySelector("div[contenteditable]").addEventListener('paste', handlePaste);
    }



// Hover Menu Function -(selected text)

$(function () {
    var menu = $('.toolbar1');
    $(document.querySelector(".editor")).on('mouseup keyup selectionchange', function (evt) {

        var menu = $(".toolbar1");
        var selection = document.getSelection().toString();


        if (selection !== '') {
            console.log(document.getSelection().getRangeAt(0).getBoundingClientRect());

            var p = document.getSelection().getRangeAt(0).getBoundingClientRect();

            console.log(window.scrollX, window.scrollY)
            menu.css({
                display: 'block',
                // left:hTextRect.x>800?hTextRect.x-300:hTextRect.x+50,
                // top:window.scrollY>1000?window.scrollY+hTextRect.y+hTextRect.height:hTextRect.y+hTextRect.height+100,
                left: (p.left + (p.width / 2)) - (menu.width() / 2),
                top: (p.top - menu.height() + 50),
                opacity: 1
            })



        } else {
            //     console.log("no selection")
            //     document.addEventListener("click", function () {
            //         menu.toggle();
            //     })
            menu.hide();
        }



    });



    $(document.querySelector(".toolbar1")).on('click', function (evt) {
        $(".toolbar1").hide();
    })

    $(document.querySelector(".editor")).on('mousedown', function (evt) {
        var menu = $(".toolbar1");

        menu.hide();
    })



});




$(function () {
    "use strict";
    ssml.init();
});