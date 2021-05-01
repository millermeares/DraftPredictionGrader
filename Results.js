function PredictionSet(username, full_set) {
    let _initialized = false;
    let _grade = 0;
    let _set = full_set
    let _username = username;

    this.getGrade = function() {
        return _grade;
    }

    this.setGrade = function(grade) {
        _grade = grade;
    }

    this.getUsername = function() {
        return _username;
    }

    this.getSet = function() {
        if(!_initialized) {
            _set = _initSet(_set);
            _initialized = true;
        }
        return _set;
    }

    const _initSet = function(set) {
        let prediction_set = {}
        Object.entries(set).forEach(([key, value]) => {
            if(key === 'Timestamp' || key === 'Username') {
                return;
            }
            prediction_set[key] = value;
        });
        return prediction_set;
    }
    
}
module.exports = {PredictionSet};