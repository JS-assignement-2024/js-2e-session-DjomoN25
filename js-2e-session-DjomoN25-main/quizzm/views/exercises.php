<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"/>
    <script src="../js/exercises.js" defer></script>
    <script src="../js/logout.js" defer></script>
</head>
<body class="exercise-page">

        <div class="w3-top">
            <div>
                <div>
                    <a href="exercises.php" class="w3-bar-item w3-button">Jouer</a>
                    <a href="scores.php" class="w3-bar-item w3-button">Meilleurs scores</a>
                    <a href="../index.html" id="logoutLink" class="w3-bar-item w3-button">Quitter</a>
                </div>
            </div>
        </div>
    
    <p id="user-welcome"></p>

     <div id="question-container">
        <h2 class="title-ex"></h2>
        <button id="btn-addition" onclick="selectOperation('addition')">+</button>
        <button id="btn-subtraction" onclick="selectOperation('subtraction')">-</button>
        <button id="btn-multiplication" onclick="selectOperation('multiplication')">x</button>
        <button id="btn-division" onclick="selectOperation('division')">/</button>
        <input type="number" id="num-exercises" placeholder="Nombre d'exercices">
        <button onclick="generateExercises()">Générer les exercices</button>
    </div>
    <div id="drag-drop-container">

    </div>

     <footer>
        <button id="submit-button" style="display: none;" onclick="submitAnswers()">Corrige tes calculs</button>
     </footer>
    
</body>
</html>