const portfolioController = {};
const path = require('path');

portfolioController.getWheatherApp = (req, res) =>{
    const weather_path = path.join(__dirname, '/public', '/weather', '/index.html');
    //res.sendFile(weather_path);
    res.render(weather_path);
}

portfolioController.getChatRoom = (req, res) =>{
     res.sendFile(path.join(__dirname, '..', 'public', 'views', 'chat.html'));
}

portfolioController.getCV = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'cv', 'my_cv.pdf'));
}

module.exports = portfolioController;