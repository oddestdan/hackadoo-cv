const { Schema, model, Types } = require('mongoose');


const SkillSchema = new Schema({
  path: {type: String},
  childrenSkills: [{
    detailLevel: {type: Number},
    title: {type: String},
    resources: [{link: {type: String}}],
    subChildrenSkills: [{
      detailLevel: {type: Number},
      title: {type: String},
      resources: [{link: {type: String}}]
    }]
  }],
  nextId: {type: Types.ObjectId, default: null},
  detailLevel: {type: Number},
  title: {type: String},
  resourcesLinks: [{link: {type: String}}]
});


module.exports = model('Skill', SkillSchema);
