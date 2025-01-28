import jwt from 'jsonwebtoken';

const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error, message: 'Token invalide ou expiré' });
  }
};

export default auth;