function timeConverter(time) {
  let PM = time.match("PM") ? true : false;

  time = time.split(":");
  let min = time[1];

  if (PM) {
    let hour = 12 + parseInt(time[0], 10);
  } else {
    let hour = time[0];
  }
}

exports.timeConverter = timeConverter;
