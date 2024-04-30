import {DataTypes} from 'sequelize'
import db from '../utils/db.js';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // 在这里定义模型属性
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    // 不要忘记启用时间戳！
  timestamps: true,

});

export default User