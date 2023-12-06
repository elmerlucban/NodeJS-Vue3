exports.success = (data = [], message = "Success", type = "success", code = 200) => {
    return {
      "message": message,
      "code": code,
      "type": type,
      "data": data
    }
  }
  
  exports.data = (data = [], meta, message = "Success", type = "success", code = 200) => {
    return {
      "message": message,
      "code": code,
      "type": type,
      "data": data,
      "meta": meta
    }
  }
  
  exports.error = (message = "Error", type = "error", code = 422) => {
    return {
      "message": message,
      "code": code,
      "type": type
    }
  }
  