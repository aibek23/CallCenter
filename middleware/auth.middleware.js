const jwt = require('jsonwebtoken');
const config = require('config');

const authenticateJWT = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Отсутствует авторизация' });
    }

    const token = authorizationHeader.substring(7); // Извлечь токен из заголовка
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();

  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = authenticateJWT;
