import config from '../config/index.js'

const cookieResponse = (res, data) => {
  if (data.success) {
    return res.status(200).cookie('token', data.token, {
      httpOnly: true,
      secure: config.prod,
      sameSite: 'none',
      // expires: // Reto: Colocar fecha de expiración de 7 dias
      expires: new Date(new Date().setDate(new Date().getDate() + 7))
    }).json({
      success: data.success,
      data: data.data
    })
  }

  return res.status(400).json(data)
}

export default cookieResponse
