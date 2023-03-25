import Vue from 'vue'

Vue.filter('printTime', function (value) {
  if (!value) return ''
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let date = new Date(value * 1000);
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  if (day < 10) day = "0" + day

  return day + ' ' + monthNames[month] + ' ' + year
})

Vue.filter('printTimeFull', function (value) {
  if (!value) return 'none'
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let date = new Date(value * 1000);
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  if (day < 10) day = "0" + day
  if (hour < 10) hour = "0" + hour
  if (minute < 10) minute = "0" + minute

  return day + ' ' + monthNames[month] + ' ' + year + ' ' + hour + ':' + minute
})
