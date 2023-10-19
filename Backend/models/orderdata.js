module.exports = (sequelize,DataTypes)=>{
    const orderdata = sequelize.define("orderdata",
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

        orderid : 
        {
            type:DataTypes.STRING,
            allowNull: false },


    })

    return orderdata
}