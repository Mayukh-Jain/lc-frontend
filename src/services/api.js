import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jain-mayukh-lc-api.hf.space', // Matches your FastAPI port
});

export const checkServer = () => API.get('/');
export const predictDisease = (formData) => API.post('/predict-disease', formData);
export const predictYield = (data) => API.post('/predict-yield', data);
export const recommendCrop = (data) => API.post('/recommend-crop', data);
export const recommendFertilizer = (data) => API.post('/recommend-fertilizer', data);
export const chatWithBot = (message) => API.post('/chat', { message });

export default API;