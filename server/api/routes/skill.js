const express = require('express');
const Router = express.Router;
const router = new Router;
const SkillFront = require('../models/SkillFront');
const SkillBack = require('../models/SkillBack');
const SkillDevops = require('../models/SkillDevops');

//------change nextId in prev skill in DB--------------------

const fillNextId = async (schema, id) => {
  await schema.findOneAndUpdate({nextId: null},
    {
      nextId: id
    },
    {new: true, useFindAndModify: false},
    function (err, result) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('Edit is successful');
        return true
      }
    });
};

//------get first skill---------------

router.get('/firstSkill/front', (req, res) => {
  SkillFront.findOne({})
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => {
      return res.status(404).json({status: err.name});
    });
});

router.get('/firstSkill/back', (req, res) => {
  SkillBack.findOne({})
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => {
      return res.status(404).json({status: err.name});
    });
});

router.get('/firstSkill/devops', (req, res) => {
  SkillDevops.findOne({})
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => {
      return res.status(404).json({status: err.name});
    });
});

router.get('/skill/front/:id', async (req, res) => {
  try {
    const {id} = req.params;

    SkillFront.findById(id)
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

//-----get skill be Id------

router.get('/skill/back/:id', async (req, res) => {
  try {
    const {id} = req.params;

    SkillBack.findById(id)
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

router.get('/skill/devops/:id', async (req, res) => {
  try {
    const {id} = req.params;

    SkillDevops.findById(id)
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

//------post skill--------------

router.post('/skill/front', async (req, res) => {
  try {
    const {path, childrenSkills, title, resourcesLinks } = req.body;


    let newSkill = await new SkillFront({
      path: path,
      childrenSkills: childrenSkills,
      detailLevel: 1,
      title: title,
      resourcesLinks: resourcesLinks
    });

    fillNextId(SkillFront,newSkill._id);

    await newSkill.save();

    res.status(200).json({skill: newSkill, message: 'New task created'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }

});

router.post('/skill/back', async (req, res) => {
  try {
    const {path, childrenSkills, title, resourcesLinks } = req.body;


    let newSkill = await new SkillBack({
      path: path,
      childrenSkills: childrenSkills,
      detailLevel: 1,
      title: title,
      resourcesLinks: resourcesLinks
    });

    fillNextId(SkillBack,newSkill._id);

    await newSkill.save();

    res.status(200).json({skill: newSkill, message: 'New task created'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }

});

router.post('/skill/devops', async (req, res) => {
  try {
    const {path, childrenSkills, title, resourcesLinks } = req.body;


    let newSkill = await new SkillDevops({
      path: path,
      childrenSkills: childrenSkills,
      detailLevel: 1,
      title: title,
      resourcesLinks: resourcesLinks
    });

    fillNextId(SkillDevops,newSkill._id);

    await newSkill.save();

    res.status(200).json({skill: newSkill, message: 'New task created'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }

});


//------- edit skill--------------------

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

//------- delete skill--------------------

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
