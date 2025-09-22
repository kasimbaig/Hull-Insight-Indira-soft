import React from 'react';
import PartIUnderwaterHullSurvey from './PartIUnderwaterHullSurvey';
import PartIIUnderwaterHullSurvey from './PartIIUnderwaterHullSurvey';

const ParticularsUnderwaterHullSurveyByYard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Part I Component */}
        <PartIUnderwaterHullSurvey />
        
        {/* Part II Component */}
        <PartIIUnderwaterHullSurvey />
      </div>
    </div>
  );
};

export default ParticularsUnderwaterHullSurveyByYard;
