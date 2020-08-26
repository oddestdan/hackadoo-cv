const { Schema, model, Types } = require('mongoose');


const SkillBackSchema = new Schema({
  path: {type: String, default: 'Back-end'},
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


module.exports = model('SkillBack', SkillBackSchema);
