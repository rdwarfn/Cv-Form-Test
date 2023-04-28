const multer = require("multer");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

function useSwagger() {
  const swaggerOption = { explorer: false };
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '0.0.1',
    },
    host: 'localhost:3000',
    basePath: '/api', // Base path(optional)
    schemes: ['http']
  };
  const options = {
    swaggerDefinition,

    apis: ["./server/api/routes/*.js"]
  };
  const swaggerSpec = swaggerJsdoc(options);

  return { swaggerOption, swaggerSpec }
}

function useUpload(dest = "static/uploads") {
  const multerObj = multer({ dest });

  const uploadPath = path.join(__dirname, `/../${dest}`);

  return { multerObj, uploadPath }
}

function formatDate(
  date,
  option = {
    locales: "id",
    options: { day: '2-digit', month: '2-digit', year: 'numeric' }
  }
) {
  let f = new Intl.DateTimeFormat(option.locales, option.options);
  return f.format(date);
};

function replaceCtx(value, ctx = /\-/g, replacement = "/") {
  if(!value) return null;
  return value.replace(ctx, replacement);
}

function formatReplaceBase64img(data) {
  const ctxRemove = [/^data:image\/png;base64,/, /^data:image\/jpeg;base64,/, /^data:image\/jpg;base64,/];
  let base64img = data;
  for(let item of ctxRemove) {
    base64img = base64img.replace(item, "");
  }

  return base64img;
}

function genFilename() {
  const times = new Date().toISOString().replace(/[-:.]/g,"");
  const rand =("" + Math.random()).substring(2, 8);

  return times+rand;
}

function pickObj(obj, values) {
  if (!obj || !values) return;

  let picked = {};

  values.forEach(value => {
    picked[value] = obj[value];
  });

  return picked;
}

const mdOptions = {
  raw: true,
  plain: true,
  logging: console.log
}

const maxDateField =(new Date(Date.now() -(new Date()).getTimezoneOffset())).toISOString().substring(0, 10);

const initSkillChoices = [
  "Java", "JavaScript", "Python", "Git", "SQL",
  "C++", "TypeScript", "C#", "Docker", "PHP",
  "React", "MongoDB", "Toad", "HTML CSS3", "MS SQL Server"
];

const levelSkillColor = [
  {
    name: "Beginner",
    color: "blue-grey"
  },
  {
    name: "Intermediate",
    color: "green"
  },
  {
    name: "Skillful",
    color: "orange"
  },
  {
    name: "Experienced",
    color: "red"
  },
  {
    name: "Expert",
    color: "blue"
  }
];

module.exports = {
  useSwagger,
  useUpload,
  formatDate,
  replaceCtx,
  formatReplaceBase64img,
  genFilename,
  pickObj,
  mdOptions,
  maxDateField,
  initSkillChoices,
  levelSkillColor
}
