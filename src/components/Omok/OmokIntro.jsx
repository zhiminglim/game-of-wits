import React, { useEffect, useState } from "react";
import OmokInstruction from "./OmokInstruction";
import OmokContainer from "./OmokContainer";

function OmokIntro() {

  const [isLoading, setIsLoading] = useState(true);
  const [topSidsWp, setTopSidsWp] = useState();
  const [topStarsWp, setTopStarsWp] = useState();

  useEffect(() => {

    Promise.all([
      fetch(process.env.REACT_APP_API_SID_URL, {method: "GET"}),
      fetch(process.env.REACT_APP_API_STAR_URL, {method: "GET"}),
    ]).then(responses => {
      return Promise.all(responses.map(response => {
        return response.json();
      }));
    }).then(data => {
      // console.log("data from both fetch below: ");
      // console.log(data);
      // console.log(data[0]);
      // console.log(data[1]);
      
      // TODO: work out a way to show api fail responses
      if (data.length > 1) {
        setTopSidsWp(data[0]);
        setTopStarsWp(data[1]);
        setIsLoading(false);
      }
    }).catch(err => console.log(err));

  }, []);


  return (
    <div>
      <OmokInstruction />
      <OmokContainer 
        loader={isLoading}
        topSidsWp={topSidsWp}
        topStarsWp={topStarsWp}
      />
    </div>
  );
}

export default OmokIntro;