const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function newAb2str(arrayBuffer){
  let unit8Arr = new Uint8Array(arrayBuffer);
  let encodedString = String.fromCharCode.apply(null, unit8Arr),
    decodedString = decodeURIComponent(escape((encodedString)));
  return decodedString;
}

module.exports = {
  formatTime: formatTime,
  newAb2str: newAb2str
}
