module.exports = function(mongoose){
    return [{
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    color: {type: String}
}, {
    timestamps: true,
    createdby: true,
    updatedby: true
}]
};