var context_id = -1;

chrome.input.ime.onFocus.addListener(function(context) {
  context_id = context.contextID;
});

var spaced = false;
var handled = false;
var previousCzech = false;

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    console.log(keyData);
    handled = false;
    if (keyData.type == "keydown") {
      if (keyData.code == "Space") {
        spaced = true;
        handled = true;
        previousCzech = false;
      } else if (keyData.code == "Digit2") {
        writeCzech("ě", keyData.shiftKey);
      } else if (keyData.code == "Digit3") {
        writeCzech("š", keyData.shiftKey);
      } else if (keyData.code == "Digit4") {
        writeCzech("č", keyData.shiftKey);
      } else if (keyData.code == "Digit5") {
        writeCzech("ř", keyData.shiftKey);
      } else if (keyData.code == "Digit6") {
        writeCzech("ž", keyData.shiftKey);
      } else if (keyData.code == "Digit7") {
        writeCzech("ý", keyData.shiftKey);
      } else if (keyData.code == "Digit8") {
        writeCzech("á", keyData.shiftKey);
      } else if (keyData.code == "Digit9") {
        writeCzech("í", keyData.shiftKey);
      } else if (keyData.code == "Digit0") {
        writeCzech("é", keyData.shiftKey);
      } else if (keyData.code == "BracketLeft") {
        writeCzech("ú", keyData.shiftKey);
      } else if (keyData.code == "Semicolon") {
        writeCzech("ů", keyData.shiftKey);
      } else if (keyData.code == "KeyD") {
        writeCzech("ď", keyData.shiftKey);
      } else if (keyData.code == "KeyT") {
        writeCzech("ť", keyData.shiftKey);
      } else if (keyData.code == "KeyN") {
        writeCzech("ň", keyData.shiftKey);
      } else if (keyData.code == "KeyO") {
        writeCzech("ó", keyData.shiftKey);
      } else {
        previousCzech = false;
      }
    } else if (keyData.type == "keyup") {
      if (keyData.code == "Space") {
        spaced = false;
        if (!previousCzech) {
          write(" ");
        }
      }
    }
    return handled;
});

function writeCzech(output, shifted) {
  if (spaced) {
    if (shifted) {
      output = output.toUpperCase()
    }
    chrome.input.ime.commitText({"contextID": context_id, "text": output});
    handled = true;
    previousCzech = true;
  } else {
    handled = false;
  }
}

function write(output) {
  chrome.input.ime.commitText({"contextID": context_id, "text": output});
  handled = true;
  previousCzech = false;
}