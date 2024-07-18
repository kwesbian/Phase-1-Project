const nutritionistForm = document.getElementById('nutritionist-form');
const adviceContainer = document.getElementById('advice-container');
const adviceElement = document.getElementById('advice');
const bmiContainer = document.getElementById('bmi-container');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBmiButton = document.getElementById('calculate-bmi');
const bmiResultElement = document.getElementById('bmi-result');
const popup = document.getElementById('popup');
const subscribeBtn = document.getElementById('subscribe-btn');
const declineBtn = document.getElementById('decline-btn');
const madEmoji = document.getElementById('mad-emoji');

// Show the popup when the webpage is opened
window.onload = function() {
  popup.style.display = 'block';
};

document.getElementById("subscribe-btn").addEventListener("click", function() {
  document.getElementById("popup-container").style.display = "block";
});

document.getElementById("popup-container").addEventListener("click", function(event) {
  if (event.target === this) {
    document.getElementById("popup-container").style.display = "none";
  }
});

// Handle the subscribe button click
subscribeBtn.addEventListener('click', function() {
  // Simulate a subscription request to the server
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      premium: true
    })
  })
  .then(response => response.json())
  .then((data) => {
    console.log('Subscription successful!');
    popup.style.display = 'none';
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// Handle the decline button click
declineBtn.addEventListener('click', function() {
  madEmoji.style.display = 'block';
      setTimeout(function() {
        madEmoji.style.display = 'none';
      }, 1000);
      popup.style.display = 'none';
      document.getElementById("subscribe-btn").addEventListener("click", function() {
        document.getElementById("popup-container").style.display = "block";
      });
    
      document.getElementById("popup-container").addEventListener("click", function(event) {
        if (event.target === this) {
          document.getElementById("popup-container").style.display = "none";
        }
      });
    
      document.getElementById("decline-btn").addEventListener("click", function() {
        // Play a sound effect when the Decline button is pressed
        var audio = new Audio('error_sound.mp3');
        audio.play();
        document.getElementById("popup-container").style.display = "none";
      });
});

nutritionistForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const goal = document.getElementById('goal').value;
  const diet = document.getElementById('diet').value;
  const allergies = document.getElementById('allergies').value;

  let advice = '';

  if (goal === 'weight_loss') {
    if (diet === 'vegan') {
      advice = 'As a vegan, focus on whole foods like fruits, vegetables, and whole grains. Avoid processed foods and added sugars.';
    } else if (diet === 'vegetarian') {
      advice = 'As a vegetarian, focus on whole foods like fruits, vegetables, and whole grains. Incorporate lean protein sources like legumes and nuts.';
    } else {
      advice = 'Focus on whole foods like fruits, vegetables, and whole grains. Incorporate lean protein sources like lean meats and fish.';
    }
  } else if (goal === 'muscle_gain') {
    if (diet === 'vegan') {
      advice = 'As a vegan, focus on plant-based protein sources like legumes, nuts, and seeds. Incorporate healthy fats like avocado and olive oil.';
    } else if (diet === 'vegetarian') {
      advice = 'As a vegetarian, focus on plant-based protein sources like legumes, nuts, and seeds. Incorporate healthy fats like avocado and olive oil.';
    } else {
      advice = 'Focus on lean protein sources like lean meats, fish, and eggs. Incorporate healthy fats like avocado and olive oil.';
    }
  } else if (goal === 'improve_energy') {
    if (diet === 'vegan') {
      advice = 'As a vegan, focus on iron-rich foods like beans, lentils, and dark leafy greens. Incorporate healthy fats like nuts and seeds.';
    } else if (diet === 'vegetarian') {
      advice = 'As a vegetarian, focus on iron-rich foods like beans, lentils, and dark leafy greens. Incorporate healthy fats like nuts and seeds.';
    } else {
      advice = 'Focus on iron-rich foods like red meat, poultry, and fish. Incorporate healthy fats like nuts and seeds.';
    }
  }

  if (allergies !== '') {
    advice += ` Also, be sure to avoid ${allergies} in your diet.`
  }

  adviceElement.textContent = advice;
  adviceContainer.style.display = 'block';
});

calculateBmiButton.addEventListener('click', () => {
  const weight = weightInput.value;
  const height = heightInput.value;

  if (weight && height) {
    const bmi = calculateBmi(weight, height);
    const bmiCategory = getBmiCategory(bmi);

    bmiResultElement.textContent = `Your BMI is ${bmi.toFixed(2)} (${bmiCategory})`;
  } else {
    bmiResultElement.textContent = 'Please enter both weight and height';
  }
});

function calculateBmi(weight, height) {
  return weight / (height ** 2);
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

