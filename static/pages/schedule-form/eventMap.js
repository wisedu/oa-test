
;(function (smile) {
  var eventMap = smile.eventMap
  eventMap['action_T_PXXX_XSJBXX_ADD'] = function (data) {
    return smile.post(WEBPACK_CONIFG_HOST + 'xsxxdbwh/T_PXXX_XSJBXX_ADD.do', data)
  }
})(window.smile = window.smile || { eventMap: {} })