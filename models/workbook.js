const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const workbookSchema = new Schema({
    
    data: {
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    date:{
        type: Schema.Types.Date,
        default:Date.now(),
    },
    sourceId:{
        type: Schema.Types.ObjectId,
    },
    source:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    CM_First_Name:{
        type: String,
        required: true,
    },
    CM_Last_Name:{
        type: String,
        required: true,
    },
    CM_Phone:{
        type: Number,
        required: true,
    },
    alternative_Number:{
        type: Number
    },
    agent_name:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    language:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    disease:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    age:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    state:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    city:{
        type: String,
        required: true,
    },
    remark:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        required:true,
    },
    comment:{
        type: String,
        required: true,
    },
    isClosed: {
        type: Boolean,
        default: 0 // Set default to 0 (closed)
    },
    status: {
        type: Number,
        default: 1 // Set default to 1 (active)
    }
},{ timestamps: true })

module.exports = mongoose.model('Workbook', workbookSchema);
