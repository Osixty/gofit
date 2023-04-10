module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define('materi', {
        definisi: {
            type: Sequelize.STRING,
        },
        contoh: {
            type: Sequelize.STRING,
        }, 
        kategori: {
            type: Sequelize.STRING,
        },

    });
    return Materi;
}