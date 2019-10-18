$(document).ready(function() {
  let highlight = $(".yellow-block");
  let keyUpper = $("#keyboard-upper-container");
  let keyLower = $("#keyboard-lower-container");
  let feedback = $("#feedback");
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate"
  ];
  let sentenceNumber = 0;
  let sentence = sentences[sentenceNumber];
  let charNumber = 0;
  let letter = sentence.substring(charNumber, charNumber + 1);
  let nextLetter = $("#target-letter");
  let mistakes = 0; //set variable for mistaken keystrokes initialize to 0
  let time = new Date();
  let start = 0;
  let startTime = time.getMinutes();
  let totalWords = 54;

  //load page and hide upper case keyboard

  //  $("#keyboard-upper-container").css("display", "none"); // alternate
  $("#keyboard-upper-container").hide();

  // display first sentence from array on page
  $("<p></p>")
    .text(sentence)
    .appendTo("#sentence");
  nextLetter.text(letter);
  // $("<p></p>").text(letter).appendTo("#target-letter");

  // if Shift key is invoked and held, hide the lower-case keyboard and display upper-case
  //revert to lower-case when released
  $(document).keydown(function(e) {
    //if pressed key == shift
    if (e.which === 16) {
      //show uppercase keyboard
      $(keyUpper).css("display", "block");
      $(keyLower).css("display", "none");
      // keyup
      $(document).keyup(function(e2) {
        //if released key == shift
        if (e.which === 16) {
          //show lowercase keyboard
          $(keyUpper).css("display", "none");
          $(keyLower).css("display", "block");
        }
      });
    }
  });
  // highlight key pressed
  $(document).keypress(function(e) {
    let which_key = e.key.charCodeAt(0);
    // console.log(which_key + " - this");
    $("#" + which_key).addClass("highlight");
  });

  // remove highlight key released

  $(document).keyup(function() {
    $("span").removeClass("highlight");
    $("div").removeClass("highlight");
  });

  //listen for key press (on represents function (e) for every key press event)
  $(document).on("keypress", e => {
    let which_key = e.key.charCodeAt(0);
    console.log(which_key + " - that");
    //get current time to calculate words per minute later
    if (start == 0) {
      startTime;
    }
    highlight.css("left", "+=17.5px");

    console.log(letter);
    console.log(charNumber);
    // check to see if user has reached end of sentence (this occurs when the current sentence's index = the sentences length)
    // check to see if user is at the end of last sentence
    console.log("before");
    if (charNumber < sentence.length - 1) {
      console.log("after");
      // compare keystroke to current letter. If it is a match,
      if (which_key === letter.charCodeAt(0)) {
        charNumber++;
        letter = sentence.substring(charNumber, charNumber + 1);
        nextLetter.text(letter);
        console.log("in nested if");
        feedback.append("<span class = 'glyphicon glyphicon-ok'></span>");
      } else {
        // display Wrong (red X)
        console.log("wong loop");
        feedback.append("<span class = 'glyphicon glyphicon-remove'></span>");
        //and sum total mistakes
        mistakes += 1;
        console.log(mistakes);
        //select and display next desired character
      }
    }
    console.log("past nested loop");
    console.log(charNumber);
    console.log(sentence.length);

    if (charNumber  == sentence.length -1 ) {
      console.log("in 2nd major loop");
      $("#sentence").empty(); // empties once you're at the end
      sentenceNumber++; // increment sentence index
      console.log("sentenceNumber = " + sentenceNumber);
      sentence = sentences[sentenceNumber];
      console.log(sentence);
      sentence.append(sentence); /// when at the end, changes the sentence
      charNumber = 0; // reset the letter index
      if (sentenceNumber < sentences.length - 1) {
        letter = sentence.substring(charNumber, charNumber + 1);

        // nextLetter.text(letter);
      }
      nextLetter.text(letter);
      highlight.css({ left: 17 }); //resets the position of the highlightBlock
      feedback.empty(); //clears the feedback div
    }
    if (sentenceNumber > sentences.length - 1) {
      let stopTime = new Date();
      let finalTime= stopTime.getMinutes();

      //get elapsed minutes
      let totalTime = finalTime - startTime;
      let minutes = totalTime/6000;

      // totalWords / minutes - 2 * mistakes
      //WPM
      let speed = Math.round( (totalWords/minutes) - errors * 2);
      highlight.css("display", "none");
      nextLetter.text(sentence.text("Your done..... You typed: " + speed + " words per minute."));
    }
  });
});
