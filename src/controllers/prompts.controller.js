/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { Configuration, OpenAIApi } = require('openai');
const firebase = require('firebase-admin');
const httpStatus = require('http-status');

const { promptsDb } = require('../db');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const prompts = await promptsDb.get();
  if (!prompts || !prompts.docs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prompts not found');
  }
  const results = prompts.docs.map((p) => ({
    id: p.id,
    ...p.data(),
  }));
  res.send(results);
});

const getOne = catchAsync(async (req, res) => {
  const result = await promptsDb.where(firebase.firestore.FieldPath.documentId(), '==', req.params.promptId).get();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prompt not found');
  }
  res.send(result);
});

const search = catchAsync(async (req, res) => {
  const configuration = new Configuration({
    apiKey: req.get('apiKey'),
  });
  const openai = new OpenAIApi(configuration);

  try {
    let completion;
    if (req.body.model && req.body.model.includes('gpt-')) {
      completion = await openai.createChatCompletion({
        model: req.body.model,
        messages: [
          { role: 'assistant', content: req.body.prompt },
          { role: 'user', content: req.body.message },
        ],
        max_tokens: 200,
        temperature: req.body.temperature || 1,
      });
      res.send(completion.data.choices[0].message.content);
    } else {
      completion = await openai.createCompletion({
        model: req.body.model,
        prompt: req.body.message,
        max_tokens: 200,
        temperature: req.body.temperature || 1,
      });
      res.send(completion.data.choices[0].text);
    }
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    res.send(err);
  }
});

module.exports = {
  getAll,
  getOne,
  search,
};
