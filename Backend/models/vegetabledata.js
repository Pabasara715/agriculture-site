module.exports = (sequelize,DataTypes)=>{
    const vegetabledata = sequelize.define("vegetabledata",
    {
        vegetype :
         {
         type:DataTypes.STRING,
         allowNull: false },

         qty :
          {
            type:DataTypes.INTEGER,
            allowNull: false },

        unitprice : 
        {
            type:DataTypes.FLOAT,
            allowNull: false },


    })

    return vegetabledata
}