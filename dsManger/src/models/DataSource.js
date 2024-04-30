import {DataTypes} from 'sequelize'
import db from '../utils/db.js';

const DataSource = db.define('DataSource', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // 在这里定义模型属性
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(32),
        comment: '数据源类型'
    },
    username: {
        type: DataTypes.STRING,
        comment: '数据源用户名'
    },
    password: {
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.STRING,
        comment: '数据源logo'
    },
    port: {
        type: DataTypes.STRING
    },
    uri: {
        type: DataTypes.STRING
    },
    extend: {
        type: DataTypes.JSON
    }
}, {
    // 这是其他模型参数
    // 不要忘记启用时间戳！
  timestamps: true,
});

export default DataSource