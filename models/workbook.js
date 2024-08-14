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
        
    },
    dataId:{
        type: Schema.Types.ObjectId,
    },
    date:{
        type: Schema.Types.Date,
        default:Date.now(),
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
        
    },
    CM_First_Name:{
        type: String,
        
    },
    CM_Last_Name:{
        type: String,
        
    },
    CM_Phone:{
        type: Number,
        
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
        
    },
    age:{
        type: Number,
        
    },
    height:{
        type: Number,
        
    },
    weight:{
        type: Number,
        
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
        
    },
    city:{
        type: String,
        
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
        
    },
    comment:{
        type: String,
        
    },
    isDeleted: {
        type: Boolean,
        default: false // Set default to 0 (closed)
    },
    status: {
        type: Number,
        default: 1 // Set default to 1 (active)
    }
},{ timestamps: true })

module.exports = mongoose.model('Workbook', workbookSchema);
