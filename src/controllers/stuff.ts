import Thing from '../models/thing.js';

export const createThing = (req: any, res: any, next: any) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;

  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
  });

  thing.save()
    .then(() => res.status(201).json({ message: 'Stuff created successfully!' }))
    .catch((error) => res.status(400).json({ error }));
};

export const getOneThing = (req: any, res: any, next: any) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

export const modifyThing = (req: any, res: any, next: any) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete thingObject._userId;
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (thing?.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.Id })
          .then(() => res.status(200).json({ message: 'Thing updated successfully!' }))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(404).json({ error }));
}

export const deleteThing = (req: any, res: any, next: any) => {
  Thing.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

export const getAllStuff = (req: any, res: any, next: any) => {
  Thing.find({
    userId: req.auth.userId
  }).then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};