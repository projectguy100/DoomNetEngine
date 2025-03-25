import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from './gemini-api-banner.js';
import './style.css';

let API_KEY = 'AIzaSyDizEASDP5NrKmDOw37EquL8SG5d0QeMO0';

let output = document.querySelector('.output'); 
let form = document.querySelector('form');

let promptInput = document.querySelector('input[name="prompt"]');

form.onsubmit = async (ev) => {
  ev.preventDefault();
  
  if (!promptInput) {
    console.error("Prompt input element not found!");
    output.textContent = "Error: Prompt input element not found.";
    return;
  }

  output.textContent = "Generating...";

  try {
    let contents = [{
      parts: [{
        text: promptInput.value
      }]}];

    // Call the multimodal model, and get a stream of results
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream({ contents });

    // Read from the stream and interpret the output as markdown
    let buffer = [];
    let md = new MarkdownIt();
    for await (let response of result.stream) {
      buffer.push(response.text());
      output.innerHTML = md.render(buffer.join(''));
    }
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

// You can delete this once you've filled out an API key
maybeShowApiKeyBanner(API_KEY);
