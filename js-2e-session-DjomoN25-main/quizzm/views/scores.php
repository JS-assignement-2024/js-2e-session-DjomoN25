<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meilleurs Scores</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"/>
    <script src="../js/scores.js" defer></script>
    <script src="../js/logout.js" defer></script>
</head>
<body class="scores-page">

<div class="w3-top">
            <div>
                <div>
                    <a href="exercises.php" class="w3-bar-item w3-button">Jouer</a>
                    <a href="scores.php" class="w3-bar-item w3-button">Meilleurs scores</a>
                    <a href="../index.html" id="logoutLink" class="w3-bar-item w3-button">Quitter</a>
                </div>
            </div>
        </div>

    <div class="table-wrapper">
    <table id="scoresTable">
        <thead>
            <tr>
                <th>Position</th>
                <th>Nom</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    </div>
</body>
</html>