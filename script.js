function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const bar = document.getElementById('bar');
const percentage = document.getElementById('percentage');

const holidayDate = new Date(2026, 2, 27, 17, 15); // Note: Months in JavaScript are 0-indexed, so January is 0.
const begningDate = new Date(2025, 8, 1, 8, 0); 

// Calculer et mettre à jour la largeur de la barre
function updateBarWidth() {
  const currentTime = new Date();
  const timeRatio = (currentTime - begningDate) / (holidayDate - begningDate);
  
  // Mettre à jour la largeur de la barre
  bar.style.width = String((timeRatio.toFixed(3) * 100)) + '%';
}

// Afficher le texte du pourcentage après la fin de la transition
bar.addEventListener('transitionend', function() {
  percentage.style.opacity = 1; // Affiche le texte après la transition
  percentage.innerHTML = bar.style.width; // Met à jour le contenu du texte
});

// Fonction principale pour le compte à rebours
async function countdown() {
  while (true) {
      const currentTime = new Date();
      const timeDifference = holidayDate - currentTime;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML = (`Il reste ${days} jours, ${hours} heures, ${minutes} minutes, et ${seconds} secondes avant les prochaines vacances.`);
      
      await sleep(1000);
  }
}

// Exécuter après un léger délai pour permettre la transition
setTimeout(updateBarWidth, 100); // Délai de 100 ms pour laisser la page se charger

console.log(holidayDate.toLocaleString("fr-FR"));
document.getElementById("nextHoliday").innerHTML = holidayDate.toLocaleString("fr-FR");
countdown();
