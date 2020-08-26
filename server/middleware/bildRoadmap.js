const SkillFront = require('../api/models/SkillFront');
const SkillBack = require('../api/models/SkillBack');
const SkillDevops = require('../api/models/SkillDevops');

const findIds = (arr) => {
  let result = [];

  arr.forEach(i => {
    result.push(i.skillId);
  });

  return result;
};
const findCheckedIds = (arr) => {
  let result = [];

  arr.forEach(i => {
    if(i.checkAll){
      result.push(i.skillId);
    }
  });
  return result;
};

const findChildrenIds = (arr) => {
  let result = [];

  arr.forEach(i => {
    result = findIds(i.childrenSkills);
  });

  return result;
};

const getAllSkills = async (path) =>{
  let schema;
  switch(path){
    case 'Front-end':
      schema = SkillFront;
      break;
    case 'Back-end':
      schema = SkillBack;
      break;
    case 'DevOps':
      schema = SkillDevops;
      break;
    default:
      schema = SkillFront;
  }


  let allSkills = await schema.find({});
  return allSkills;

};

const getFilteredSkills = (skills, ids) =>{
  const filteredSkills = skills.filter((item) => {
     return !ids.includes(String(item._id))
  });
  return filteredSkills;
};

const filterChildrenSkills = async(skills, ids) =>{
  const resultSkills = skills;
  resultSkills.forEach(item => {
    let newChildren = item.childrenSkills.filter(element => {
      return !ids.includes(String(element._id))
    });

    item.childrenSkills = newChildren;
  });

  return resultSkills;
};



const bildRoadmap = async (path, cv) => {
  let checkedId = findCheckedIds(cv);
  let childrensId = findChildrenIds(cv);

  let allSkills = await getAllSkills(path);

  let filteredSkills = getFilteredSkills(allSkills, checkedId);
  let resultSkills = filterChildrenSkills(filteredSkills, childrensId);
  return  resultSkills;



};

module.exports = bildRoadmap;
