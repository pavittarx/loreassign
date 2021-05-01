const Err = (statusCode, message) => {
  return {
    statusCode, 
    message
  }
}

const Success = (message) => {
  return {
    statusCode: 200,
    message
  }
}

module.exports = {
  Err, Success
}

