function validation (data, schema) {
  const result = schema.validate(data)
  return result
}

module.exports = validation
