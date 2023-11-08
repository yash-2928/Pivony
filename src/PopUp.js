import React, { useState, useEffect } from 'react';
import { database } from './Firebase';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import 'survey-core/defaultV2.min.css';

const PopupComponent = () => {
 const [waitTime, setWaitTime] = useState(1);
 const [showPopup, setShowPopup] = useState(false);

 useEffect(() => {
    const storedWaitTime = localStorage.getItem('waitTime');
    const storedShowPopup = localStorage.getItem('showPopup');

    if (storedWaitTime) {
      setWaitTime(parseInt(storedWaitTime, 10));
    }

    if (storedShowPopup) {
      setShowPopup(storedShowPopup === 'true');
    }
 }, []);

 useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, waitTime * 1000);
 }, [waitTime]);

 const handleAnswerSubmit = (answer) => {
    let { numeric, text } = answer
    console.log(numeric, text)
    database.collection("ratings").add({
      rating: numeric,
      comment: text
    });
 };

 const json = { 
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "rating",
          "name": "numeric",
          "title": "How likely are you to recommened Pivony to a colleague?",
          "description": "",
          "autoGenerate": false,
          "rateCount": 10,
          "rateValues": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        },
      ]
    },
    {
      "name": "page2",
      "elements": [
        {
          "type": "comment",
          "name": "text",
          "title": "if you could do anything - what could we do to wow you?",
          "description": "free text here",
          "maxLength": 300
        },
      ]
    }
  ],
  "showQuestionNumbers": "off"
}

const SurveyComponent = () =>  {
  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    handleAnswerSubmit(JSON.parse(JSON.stringify(sender.data, null, 3)))
  });
  return (<Survey model={survey} />);
}


 return (
    <div>
      {showPopup && (
        <SurveyComponent />
      )}
    </div>
 );
};

export default PopupComponent;