const SkillFront = require('../api/models/SkillFront');
const SkillBack = require('../api/models/SkillBack');
const SkillDevops = require('../api/models/SkillDevops');

const findIds = (arr) => {
  let result = [];

  arr.forEach(i => {
    result.push(i._id);
  });

  return result;
};

const findChildrenIds = (arr) => {
  let result = [];

  arr.forEach(i => {
    let arr = findIds(i.childrenSkills);
    result.concat(arr);
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

  await schema.find({})
.then((all) => {
    console.log(all)
    // res.status(200).json(road);
  })
    .catch((err) => {
      console.log(err.name);
    });

};

const getFilteredSkills = (skills) =>{
  const filteredSkills = skills.filter((item) => {
    return !item.checkAll
  });
  // console.log('filteredSkills', filteredSkills);
  return filteredSkills;
};

const filterChildrenSkills = async(skills, ids) =>{
  const resultSkills = skills;
  resultSkills.forEach(item => {
    return item.childrenSkills.filter(element => {
      return !ids.includes(element._id)
    });
  });

  // console.log('resultSkills', resultSkills);
  return resultSkills;
};



const bildRoadmap = async (path, cv) => {
  let childrensId = findChildrenIds(cv);

  getAllSkills(path)
    .then((res) => {
      let allSkills = res;
      let filteredSkills = getFilteredSkills(allSkills);
      let resultSkills = filterChildrenSkills(filteredSkills, childrensId);
      return  resultSkills;
    })
    .catch((err) => {
      console.log(err.name);
    });

};

module.exports = bildRoadmap;
