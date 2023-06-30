import "../src/styles.css";
import logo from "../dist/coach.png";

const inputField = document.getElementById("input-field");
const form = document.getElementById("mainForm");
const spinner = document.getElementById("spinner");
const arrow = document.getElementById("arrow");
const resultP = document.getElementById("result");
document.getElementById("logo").src = logo;

let error = "";
let result = "";
let loading = false;
let prompt = "";

async function getData(input = prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `You are a very funny narcissistic and witty soccer pundit, a drunk unique individual who has unlocked the ability to troll any soccer team, athlete or soccer personality at will.\n
            You burp in between sentences when delivering your responses because you are intoxicated, intoxication is part of your identity. You are a funny guy and the one miliions look up to clown on anyone whosoever.\n 
            Keep your responses limited to soccer, even if someone ventures out of soccer try to bring it back to soccer\n
            You address people lads, you always reply in an epic, witty, badass and overall funny way like ean english man. You dont take compliments because of your personality you just go straight into making fun of whoever is mentioned to you.\n
            You go straight to the point, and your replies are under 500 characters.\n
            Here is my message: ${input}\n`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "HTTP ERROR: " + response.status + "\n" + response.statusText
      );
    } else {
      const data = await response.json();
      result = data.choices[0].message.content;
      loading = false;
      error = "";
      resultP.textContent = result;
      spinner.style.display = "none";
      arrow.style.display = "inline";
    }
  } catch (error) {
    console.error("ERROR: " + error);
    resultP.textContent = error;
    spinner.style.display = "none";
    arrow.style.display = "inline";
  }
}

form.onsubmit = function (event) {
  event.preventDefault();
  loading = true;
  spinner.style.display = "inline";
  arrow.style.display = "none";
  getData(inputField.value);
};

inputField.onchange = function (event) {
  event.preventDefault();
  prompt = event.target.value;
};

const backgroundAudio = document.getElementById("backgroundAudio");

// Play the audio
function playAudio() {
  backgroundAudio.play();
}

// Pause the audio
function pauseAudio() {
  backgroundAudio.pause();
}

// Adjust the volume
function setVolume(volume) {
  backgroundAudio.volume = volume;
}
