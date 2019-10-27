const TimeAgo = Time => {

  let time = parseInt(Time)

  switch (typeof time) {
    case 'number':
      break
    case 'string':
      time = +new Date(time)
      break
    case 'object':
      if (time.constructor === Date) time = time.getTime()
      break
    default:
      time = +new Date()
  }

  let time_formats = [
    [60, 'sn', 1], // 60
    [120, '1dk', '1dk sonra'], // 60*2
    [3600, 'dk', 60], // 60*60, 60
    [7200, '1s', '1s sonra'], // 60*60*2
    [86400, 's', 3600], // 60*60*24, 60*60
    [172800, '1g', '1g sonra'], // 60*60*24*2
    [604800, 'g', 86400], // 60*60*24*7, 60*60*24
    [1209600, '1h', '1h sonra'], // 60*60*24*7*4*2
    [2419200, 'h', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, '1a', '1a sonra'], // 60*60*24*7*4*2
    [29030400, 'a', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, '1y', '1y sonra'], // 60*60*24*7*4*12*2
    [2903040000, 'y', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ]

  let
    seconds = (+new Date() - time) / 1000,
    token = 'önce',
    list_choice = 1

  if (seconds < 5) {
    return "Tam şu anda"
  }

  if (seconds < 0) {
    seconds = Math.abs(seconds)
    token = 'sonra'
    list_choice = 2
  }

  let i = 0, format
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice]
      else
        return Math.floor(seconds / format[2]) + '' + format[1] + ' ' + token
    }

  return time

}

module.exports = TimeAgo