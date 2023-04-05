const db = require("../models");
const Quiz = db.quiz;

// Memproses jawaban dari satu quiz
exports.submitOne = async (req, res) => {

    // data yang didapatkan dari inputan oleh pengguna
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        });

        if (req.body.answer == quiz.key) {
            res.status(200).json({
                "message": "benar" , 
                "benar" : true
            })
        } else {
            res.status(200).json({
                "message": `jawaban benar adalah ${quiz.key}`,
                "benar" : false
            })
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Memproses jawaban lebih dari satu quiz dengan json array
exports.submitMany = async (req, res) => {
    // data yang didapatkan dari inputan oleh pengguna
    const jobsheet ={
        quizId: req.body.quizId,
        answer: req.body.answer,
    };
    
        try {
            let score = 0
            let totalSoal = jobsheet.quizId.length
            for (let i = 0; i < totalSoal ; i++) {
                const quiz = await Quiz.findOne({
                    limit: 1,
                    where: {
                        id: jobsheet.quizId[i]
                    },
                    order: [ [ 'id', 'DESC' ]],
                });
                if(quiz.key == jobsheet.answer[i]){
                    score = score + 25
                }
            }
            res.status(200).json({
                message: `${score} `
            })
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};