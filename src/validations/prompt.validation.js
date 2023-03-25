const Joi = require('joi');

const getAll = {
  query: Joi.object().keys({
    act: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOne = {
  params: Joi.object().keys({
    promptId: Joi.string(),
  }),
};

const search = {
  headers: Joi.object().keys({
    apiKey: Joi.string(),
    model: Joi.string(),
  }),
  body: Joi.object().keys({
    model: Joi.string(),
    prompt: Joi.string(),
    message: Joi.string(),
    temperature: Joi.number().integer(),
  }),
};

module.exports = {
  getAll,
  getOne,
  search,
};
