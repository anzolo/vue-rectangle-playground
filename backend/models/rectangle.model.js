module.exports = function(mongoose){
    return [{
    x1: {type: Number, required: true},
    y1: {type: Number, required: true},
    x2: {type: Number, required: true},
    y2: {type: Number, required: true},
    color: {type: String}
}, {
    timestamps: true,
    createdby: true,
    updatedby: true
}]
};