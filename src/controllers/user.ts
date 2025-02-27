import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = (req: any, res: any, next: any) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const login = (req: any, res: any, next: any) => {
  const incorrect = { message: 'Login ou mot de passe incorrect' };

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json(incorrect);
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json(incorrect);
          }

          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' }),
            message: 'Connexion réussie!',
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
};