module.exports = (sequelize,DataTypes)=>{
    const order_histories = sequelize.define("order_histories",
    {
        orderid: {
            type: DataTypes.UUID, // Set the data type to INTEGER
            allowNull: false,
             
           
          },

         orderdate :
          {
            type:DataTypes.DATE,
            allowNull: false },

        totalprice : 
        {
            type:DataTypes.FLOAT,
            allowNull: false },


    })

    return order_histories
}