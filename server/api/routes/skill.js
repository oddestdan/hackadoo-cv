const express = require('express');
const Router = express.Router;
const router = new Router;
const Skill = require('../models/Skill');

router.get('/firstSkill', (req, res) => {
  Skill.findOne({})
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => {
      return res.status(404).json({status: err.name});
    });
});

router.get('/skill/:id', async (req, res) => {
  try {
    const {id} = req.params;

    Skill.findById(id)
      .then((skill) => {
        res.status(200).json(skill);
      })
      .catch((err) => {
        return res.status(404).json({status: err.name});
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});

router.post('/skill', async (req, res) => {
  try {
    const {path, childrenSkills, title, resourcesLinks } = req.body;


    let newSkill = await new Skill({
      path: path,
      childrenSkills: childrenSkills,
      detailLevel: 1,
      title: title,
      resourcesLinks: resourcesLinks
    });


    await Skill.findOneAndUpdate({nextId: null},
      {
        nextId: newSkill._id
      },
      {new: true, useFindAndModify: false},
      function (err, result) {
        if (err) {
          console.log(err);
          // res.status(404).json({status: err.name});
        } else {
          console.log('Edit is successful')
          // res.status(200).json({skill: result, message: 'Edit is successful'});
        }
      });

    await newSkill.save();

    res.status(200).json({skill: newSkill, message: 'New task created'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }

});

router.put('/skill/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {path, childrenSkills, title, resourcesLinks } = req.body;

    await Skill.findByIdAndUpdate(id,
      {
        path: path,
        childrenSkills: childrenSkills,
        title: title,
        resourcesLinks: resourcesLinks
      },
      {new: true, useFindAndModify: false},
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(404).json({status: err.name});
        } else {
          res.status(200).json({skill: result, message: 'Edit is successful'});
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});

router.delete('/skill/:id', async (req, res) => {
  try {
    const {id} = req.params;

    await Skill.findByIdAndDelete(id,
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(404).json({status: err.name});
        } else {
          res.status(200).json({message: 'Skill deleted'});
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});


module.exports = router;
