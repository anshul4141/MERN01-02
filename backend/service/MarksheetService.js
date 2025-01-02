const Marksheet = require('../model/Marksheet');

const addMarksheet = (marksheetData) => {

    return Marksheet.findOne({ rollNo: marksheetData.rollNo })
        .then(existingRollNo => {
            if (existingRollNo) {

                return { error: 'rollNo already exist' }

            } else {

                const newMarksheet = new Marksheet(marksheetData);
                return newMarksheet.save()
                    .then(savedMarksheet => ({
                        marksheet: savedMarksheet,
                        message: 'Data added successfully'

                    }))
            }
        })
        .catch(error => { throw new Error(error.message); });
};

const updateMarksheet = (marksheetId, updateData) => {
    return Marksheet.findByIdAndUpdate(marksheetId, updateData, { new: true })
        .then(updatedMarksheet => {
            if (!updatedMarksheet) {

                throw new Error('Marksheet not found');

            } else {

                return updatedMarksheet;

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const deleteMarksheet = (marksheetId) => {
    return Marksheet.findByIdAndDelete(marksheetId)
        .then(deletedMarksheet => {
            if (!deletedMarksheet) {

                throw new Error('Marksheet not found');

            } else {

                return { message: 'Marksheet deleted successfully' };

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const getMarksheetById = (marksheetId) => {
    return Marksheet.findById(marksheetId)
        .then(marksheet => {
            if (!marksheet) {

                throw new Error('Marksheet not found');

            } else {

                return marksheet;

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const searchMarksheets = (query) => {
    return Marksheet.find(query).sort({ totalMarks: -1 })
        .then(marksheets => marksheets)
        .catch(error => { throw new Error(error.message); });
};

const getMeritList = (limit) => {
    return Marksheet.find({
        physics: { $gt: 60 },
        chemistry: { $gt: 60 },
        maths: { $gt: 60 }
    }).sort({ totalMarks: -1 }).limit(limit)
        .then(marksheets => {
            if (!marksheets) {
                throw new Error('Record not found');
            } else {
                return marksheets;
            }
        })
        .catch(error => { throw new Error(error.message); });
};

const findByRollNo = (rollNo) => {
    return Marksheet.findOne({ rollNo })
        .then(marksheet => {
            if (!marksheet) throw new Error('Marksheet not found');
            return marksheet;
        })
        .catch(error => { throw new Error(error.message); });
};

module.exports = {
    addMarksheet,
    updateMarksheet,
    deleteMarksheet,
    getMarksheetById,
    searchMarksheets,
    getMeritList,
    findByRollNo
};
