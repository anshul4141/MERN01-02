const Student = require('../model/Student');

const addStudent = (studentData) => {

    const newStudent = new Student(studentData);

    return newStudent.save()
        .then(savedStudent => ({
            student: savedStudent,
            message: 'Student added successfully'
        }))
        .catch(error => { throw new Error(error.message); });
};

const updateStudent = (studentId, updateData) => {
    return Student.findByIdAndUpdate(studentId, updateData, { new: true })
        .then(updatedStudent => {
            if (!updatedStudent) {

                throw new Error('Student not found');

            } else {

                return updatedStudent;

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const deleteStudent = (studentId) => {
    return Student.findByIdAndDelete(studentId)
        .then(deletedStudent => {
            if (!deletedStudent) {

                throw new Error('Student not found');

            } else {

                return { message: 'Student deleted successfully' };

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const getStudentById = (studentId) => {
    return Student.findById(studentId)
        .then(student => {
            if (!student) {

                throw new Error('Student not found');

            } else {

                return student;

            }
        })
        .catch(error => { throw new Error(error.message); });
};

const searchStudents = (query) => {
    return Student.find(query)
        .then(students => {

            if (!students) {

                throw new Error('record not found');

            } else {

                return students;

            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
};

module.exports = {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    searchStudents
};
